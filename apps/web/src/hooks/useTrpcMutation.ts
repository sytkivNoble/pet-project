import { ResultAsync } from 'neverthrow';
import { TRPCClientError } from '@trpc/client';

export function useTrpcMutation<TInput, TOutput>(
  mutation: {
    mutateAsync: (input: TInput) => Promise<TOutput>;
  },
  options?: {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: Error) => void;
  }
) {
  const mutateWithResult = async (input: TInput) => {
    return ResultAsync.fromPromise(
      mutation.mutateAsync(input),
      (error) => {
        if (error instanceof TRPCClientError) {
          return new Error(error.message);
        }
        return error as Error;
      }
    )
      .map((data) => {
        options?.onSuccess?.(data);
        return data;
      })
      .mapErr((error) => {
        options?.onError?.(error);
        throw error;
      });
  };

  return { mutateWithResult };
}