import React from "react";
import Todo from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onEdit, onDelete }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.content}
      <button onClick={() => onToggleComplete(todo.id)}>
        {todo.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => onEdit(todo.id, todo.content)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  )
};

export default TodoItem;