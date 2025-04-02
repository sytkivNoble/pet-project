import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const CreateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export const UpdateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  completed: z.boolean().optional(),
});

export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodo = z.infer<typeof CreateTodoSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>; 