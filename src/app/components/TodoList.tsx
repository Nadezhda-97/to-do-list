'use client'

import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

import TodoItem from "./TodoItem";
import CharacterCounter from "./CharacterCounter";
import LanguageSwitcher from "./LanguageSwitcher";
import { validateTask } from "../utils/validation";
import Todo from "../types/Todo";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { t } = useTranslation();

  const MAX_LENGTH = 300;

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    const validationError = validateTask(inputValue, MAX_LENGTH);
    if (validationError) {
      setError(validationError);
      return;
    }   

    setError('');

    const newTodo: Todo = {
      id: Date.now(),
      content: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleUpdate = (id: number, content: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, content } : todo
    ));
  };

  return (
    <div className="todo-container">
      <div className="header">
        <h1 className="title">{t('title')}</h1>
        <LanguageSwitcher />
      </div>
      <div className="input-container">
        <input 
          type="text"
          className="task-input"
          placeholder={t('placeholder')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          maxLength={MAX_LENGTH}
          autoFocus
        />
        <div className="input-bottom">
          <CharacterCounter value={inputValue} maxLength={MAX_LENGTH} />
          <button className="add-button" onClick={handleAdd}>{t('addTask')}</button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
      <ol className="task-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            index={index + 1}
          />
        ))}
      </ol>
    </div>
  );
};

export default TodoList;