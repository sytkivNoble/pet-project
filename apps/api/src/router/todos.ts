import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { CreateTodoSchema, UpdateTodoSchema } from '@pet-project/database/src/types';
import { todoService } from '../services/todo';
import { TRPCError } from '@trpc/server';

export const todosRouter = router({
  getAll: publicProcedure.query(async () => {
    const result = await todoService.getAll();
    
    if (result.isErr()) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: result.error.message
      });
    }
    
    return result.value;
  }),

  create: publicProcedure
    .input(CreateTodoSchema)
    .mutation(async ({ input }) => {
      const result = await todoService.create(input);
      
      // custom error handling
      if (result.isErr()) {
        if (result.error.message === 'Bad Request') {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: result.error.message
          });
        }

        if (result.error.message === 'Unauthorized') {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: result.error.message
          });
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: result.error.message
        });
      }
      
      return result.value;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      data: UpdateTodoSchema,
    }))
    .mutation(async ({ input }) => {
      const result = await todoService.update(input.id, input.data);
      
      if (result.isErr()) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: result.error.message
        });
      }
      
      return result.value;
    }),

  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      const result = await todoService.delete(id);
      
      if (result.isErr()) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: result.error.message
        });
      }
      
      return result.value;
    }),
});