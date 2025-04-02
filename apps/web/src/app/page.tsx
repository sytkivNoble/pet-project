'use client';

import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import TodoItem from '@/components/TodoItem';
import { useTrpcMutation } from '@/hooks/useTrpcMutation';

export default function Home() {
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const { data: todos = [], error: queryError } = trpc.todos.getAll.useQuery();
  console.log('queryError = ', queryError)

  // Handle query error
  if (queryError) {
    setError(queryError.message);
  }

  const createTodoMutation = trpc.todos.create.useMutation();
  const { mutateWithResult } = useTrpcMutation(createTodoMutation, {
    onSuccess: () => {
      setNewTodo('');
      setError(null);
      utils.todos.getAll.invalidate();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    await mutateWithResult({ title: newTodo });
  };

  const handleDeleteTodo = (id: string) => {
    utils.todos.getAll.setData(undefined, (old) => 
      old?.filter((todo) => todo.id !== id)
    );
  };

  const handleUpdateTodo = (id: string, title: string, completed: boolean) => {
    utils.todos.getAll.setData(undefined, (old) =>
      old?.map((todo) =>
        todo.id === id ? { ...todo, title, completed } : todo
      )
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleAddTodo} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onUpdate={handleUpdateTodo}
            />
          ))}
        </div>
      </div>
    </main>
  );
}