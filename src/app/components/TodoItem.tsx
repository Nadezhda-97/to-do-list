'use client'

import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import TodoItemEdit from "./TodoItemEdit";
import Todo from "../types/Todo";
import Translations from "../types/Translations";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  index: number;
  translations: Translations;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onUpdate,
  onDelete,
  index,
  translations
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const { t } = useTranslation();

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
    <li className="task-item-container">
      {isEditing ? (
        <div className={`edit-wrapper ${showEdit ? "fade-in" : "fade-out"}`}>
          <TodoItemEdit
            initialValue={todo.content}
            onSave={handleUpdate}
            onCancel={handleCancelEdit}
            isExiting={!showEdit}
            translations={translations}
          />
        </div>
      ) : (
        <div className="task-content-container">
          <div
            className={`task-content ${todo.completed ? "completed" : ""}`}
            style={{ cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
              aria-label={todo.completed ? t('markAsIncomplete') : t('markAsCompleted')}
            />
            <span>{index}. {todo.content}</span>
          </div>
          <div className="button-group">
            <button className="edit-button" onClick={handleStartEdit}>{t('edit')}</button>
            <button className="delete-button" onClick={() => onDelete(todo.id)}>{t('delete')}</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TodoItem;