import { prisma } from '@pet-project/database';
import { ResultAsync, err, ok } from 'neverthrow'
import { CreateTodo, UpdateTodo } from '@pet-project/database/src/types';

export const todoService = {
  getAll: async () => {
    const todosArray = await ResultAsync.fromPromise(prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    }), () => new Error('Failed to fetch todos'));

    if (todosArray.isErr()) {
      // custom error
      return err(todosArray.error);
    }

    if (todosArray.value.length === 0) {
      return err(new Error('No todos found'));
    }

    return ok(todosArray.value);
  },

  create: async (input: CreateTodo) => {
    // custom error example
    if (input.title === 'error bad request') {
      return err(new Error('Bad Request'));
    }

    if (input.title === 'error unauthorized') {
      return err(new Error('Unauthorized'));
    }

    const todoObject = await ResultAsync.fromPromise(prisma.todo.create({
      data: input,
    }), () => new Error('Failed to create todo'));

    if (todoObject.isErr()) {
      // custom error 
      return err(todoObject.error);
    }

    return ok(todoObject.value);
  },

  update: async (id: string, data: UpdateTodo) => {
    const todoObject = await ResultAsync.fromPromise(prisma.todo.update({
      where: { id },
      data,
    }), () => new Error('Failed to update todo'));

    if (todoObject.isErr()) {
      // custom error
      return err(todoObject.error);
    }

    return ok(todoObject.value);
  },

  delete: async (id: string) => {
    const todoObject = await ResultAsync.fromPromise(prisma.todo.delete({
      where: { id },
    }), () => new Error('Failed to delete todo'));

    if (todoObject.isErr()) {
      // custom error
      return err(todoObject.error);
    }

    return ok({ success: true });
  },
};
