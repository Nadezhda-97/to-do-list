'use client'

import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import Todo from "../types/Todo";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');

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
    if (inputValue.trim() === '' || inputValue.length < 3) {
      setError('Текст задачи должен содержать минимум 3 символа');
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
    <div>
      <h1>To Do List</h1>
      <input 
        type="text"
        placeholder="Add task description"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleAdd}>Add Task</button>
      <ol>
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