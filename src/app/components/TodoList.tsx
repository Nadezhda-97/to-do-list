'use client'

import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import Todo from "../types/Todo";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);
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

  const handleEdit = (id: number, content: string) => {
    setEditId(id);
    setInputValue(content);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  //??
  const handleUpdate = () => {
    if (editId === null) return;
    if (inputValue.trim() === '' || inputValue.length < 3) {
      setError('Текст задачи должен содержать минимум 3 символа.');
      return;
    }

    setError('');

    setTodos(todos.map(todo =>
      todo.id === editId ? { ...todo, content: inputValue } : todo
    ));
    setInputValue('');
    setEditId(null);
  };

  return (
    <div>
      <h1>To Do List</h1>
      <input 
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {editId ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleAdd}>Add</button>
      )}
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;