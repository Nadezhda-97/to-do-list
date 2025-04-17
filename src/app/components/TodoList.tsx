'use client'

import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
//import i18n from '../../i18n/client'; // клиентский экземпляр

import TodoItem from "./TodoItem";
import CharacterCounter from "./CharacterCounter";
import LanguageSwitcher from "./LanguageSwitcher";
import { validateTask } from "../utils/validation";
import { generateId } from "../utils/generateId";
import { useLanguageReady } from "@/hooks/useLanguageReady";
import Todo from "../types/Todo";
import Translations from "../types/Translations";

interface TodoListProps {
  locale: string;
  translations: Translations;
}

const TodoList: React.FC<TodoListProps> = ({ locale, translations }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isClient, setIsClient] = useState(false); // 👈 трекер загрузки на клиенте
  //const [isLanguageReady, setIsLanguageReady] = useState(false);
  const { t } = useTranslation();

  const MAX_LENGTH = 300;

  // 1. Отметим, что компонент работает на клиенте
  useEffect(() => {
    setIsClient(true);
  }, []);

  /* useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [locale]); */

  // 2. Загружаем todo из localStorage только на клиенте
  useEffect(() => {
    if (isClient) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }
  }, [isClient]);

  /* useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); */

  // 3. Сохраняем todo в localStorage при изменении
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isClient]);

  /* useEffect(() => {
    // Регистрируем переводы, если их ещё нет
    if (!i18n.hasResourceBundle(locale, 'translation')) {
      i18n.addResourceBundle(locale, 'translation', translations, true, true);
    }

    // Меняем язык (если текущий другой)
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale).then(() => {
        setIsLanguageReady(true);
      });
    } else {
      setIsLanguageReady(true);
    }
  }, [locale, translations]);

  // 👇 не рендерим, пока язык не установлен
  if (!isLanguageReady) return null; */

  const isLanguageReady = useLanguageReady(locale, translations);

  if (!isLanguageReady) return null;

  const handleAdd = () => {
    const validationError = validateTask(inputValue, MAX_LENGTH, translations);
    if (validationError) {
      setError(validationError);
      return;
    }   

    setError('');

    const newTodo: Todo = {
      id: generateId(),
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
            translations={translations}
          />
        ))}
      </ol>
    </div>
  );
};

export default TodoList;