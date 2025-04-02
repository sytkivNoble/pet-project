import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import type { Todo } from '@pet-project/database/src/types';
import { useTrpcMutation } from '@/hooks/useTrpcMutation';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, completed: boolean) => void;
}

export default function TodoItem({ todo, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [error, setError] = useState<string | null>(null);

  const updateTodoMutation = trpc.todos.update.useMutation();
  const { mutateWithResult: updateWithResult } = useTrpcMutation(updateTodoMutation, {
    onSuccess: () => {
      if (isEditing) {
        setIsEditing(false);
      }
      setError(null);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const deleteTodoMutation = trpc.todos.delete.useMutation();
  const { mutateWithResult: deleteWithResult } = useTrpcMutation(deleteTodoMutation, {
    onSuccess: () => {
      onDelete(todo.id);
      setError(null);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const handleToggle = async () => {
    updateWithResult({
      id: todo.id,
      data: { completed: !todo.completed },
    });
    onUpdate(todo.id, todo.title, !todo.completed);
  };

  const handleDelete = async () => {
    deleteWithResult(todo.id);
  };

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    updateWithResult({
      id: todo.id,
      data: { title },
    });
    onUpdate(todo.id, title, todo.completed);
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5 rounded border-gray-300"
      />
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-2 py-1 border rounded"
        />
      ) : (
        <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.title}
        </span>
      )}
      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={handleDelete}
          className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    </div>
  );
} 