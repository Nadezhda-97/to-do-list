import React, { useState } from "react";
import TodoItemEdit from "./TodoItemEdit";
import Todo from "../types/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  index: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onUpdate, onDelete, index }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleUpdate = (content: string) => {
    onUpdate(todo.id,content);
    setIsEditing(false);
  };

  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {isEditing ? (
        <TodoItemEdit
          initialValue={todo.content}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div>
          <span>{index}. {todo.content}</span>
          <button onClick={() => onToggleComplete(todo.id)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </div>
      )}
    </li>
  )
};

export default TodoItem;