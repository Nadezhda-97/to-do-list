'use client'

import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { validateTask } from "../utils/validation";
import Translations from "../types/Translations";

interface TodoItemEditProps {
  initialValue: string;
  onSave: (content: string) => void;
  onCancel: () => void;
  isExiting?: boolean;
  //t: (key: string) => string;
  translations: Translations;
}

const MAX_LENGTH = 300;

const TodoItemEdit: React.FC<TodoItemEditProps> = ({ initialValue, onSave, onCancel, isExiting, translations }) => {
  const [editValue, setEditValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  const handleSave = () => {
    const validationError = validateTask(editValue, MAX_LENGTH, translations);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    onSave(editValue);
  };

  return (
    <div className={`edit-container ${isExiting ? 'exit' : ''}`}>
      <input
        type="text"
        className="todo-edit-input"
        placeholder={t('placeholder')}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        autoFocus
      />
      {error && <p className="error-message">{error}</p>}
      <div className="button-group">
        <button className="save-button" onClick={handleSave}>{t('save')}</button>
        <button className="cancel-button" onClick={onCancel}>{t('cancel')}</button>
      </div>
    </div>
  );
};

export default TodoItemEdit;