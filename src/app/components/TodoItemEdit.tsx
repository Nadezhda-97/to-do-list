'use client'

import React, { useState } from "react";

interface TodoItemEditProps {
  initialValue: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

const TodoItemEdit: React.FC<TodoItemEditProps> = ({ initialValue, onSave, onCancel }) => {
  const [editValue, setEditValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');

  const handleSave = () => {
    if (editValue.trim() === '' || editValue.length < 3) {
      setError('Текст задачи должен содержать минимум 3 символа');
      return;
    }

    setError('');
    onSave(editValue);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new task description"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        autoFocus
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  )
};

export default TodoItemEdit;