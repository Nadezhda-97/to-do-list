'use client'

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

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onUpdate,
  onDelete,index
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const handleStartEdit = () => {
    setIsEditing(true);
    setShowEdit(true);
  };
  
  const handleCancelEdit = () => {
    setShowEdit(false);
    setTimeout(() => setIsEditing(false), 300);
  };

  const handleUpdate = (content: string) => {
    onUpdate(todo.id, content);
    setShowEdit(false);
    setTimeout(() => setIsEditing(false), 300);
  };

  return (
    <li>
      {isEditing ? (
        <div className={`edit-wrapper ${showEdit ? "fade-in" : "fade-out"}`}>
          <TodoItemEdit
            initialValue={todo.content}
            onSave={handleUpdate}
            onCancel={handleCancelEdit} /* onCancel={() => setIsEditing(false)} */
            isExiting={!showEdit}
          />
        </div>
      ) : (
        <div className="task-content-container"> {/* ??? стили */}
          <div
            className={`task-content ${todo.completed ? "completed" : ""}`}
            onClick={() => onToggleComplete(todo.id)}
            style={{ cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
            />
            <span>{index}. {todo.content}</span>
          </div>
          <div className="button-group">
            <button className="edit-button" onClick={handleStartEdit}>Edit</button> {/* onClick={() => setIsEditing(true)} */}
            <button className="delete-button" onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </div>
      )}
    </li>
  )
};

export default TodoItem;