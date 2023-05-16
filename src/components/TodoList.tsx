import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import './TodoList.css';

enum Sort {
  Default = 'Default',
  TitleAscending = 'TitleAscending',
  TitleDescending = 'TitleDescending',
  Completed = 'Completed',
  Incomplete = 'Incomplete',
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoListTest: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<Sort>(Sort.Default);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoTitle, setEditingTodoTitle] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get<Todo[]>(
        'https://jsonplaceholder.typicode.com/todos'
      );
      setTodos(response.data.slice(0, 15));
    } catch (error) {
      alert(error);
    }
  };

  const viewTodo = (id: number) => {
    setSelectedTodoId(id);
  };

  const closeView = () => {
    setSelectedTodoId(null);
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      alert(error);
    }
  };

  const completeTodo = async (id: number, completed: boolean) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        completed: !completed,
      });
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      alert(error);
    }
  };

  const editTodo = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditingTodoTitle(title);
  };

  const updateTodo = async () => {
    if (editingTodoTitle.trim() === '') return;

    try {
      const updatedTodo: Todo = {
        id: editingTodoId!,
        title: editingTodoTitle,
        completed:
          todos.find((todo) => todo.id === editingTodoId)?.completed || false,
      };

      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${editingTodoId}`,
        updatedTodo
      );
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editingTodoId) {
          return updatedTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
      cancelEdit();
    } catch (error) {
      alert(error);
    }
  };

  const cancelEdit = () => {
    setEditingTodoId(null);
    setEditingTodoTitle('');
  };

  const sortTodos = () => {
    switch (sort) {
      case Sort.TitleAscending:
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      case Sort.TitleDescending:
        return [...todos].sort((a, b) => b.title.localeCompare(a.title));
      case Sort.Completed:
        return todos.filter((todo) => todo.completed);
      case Sort.Incomplete:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = sortTodos().filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-list">
      <div>
        <label>
          Сортировка/Фильтрация:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            <option value={Sort.Default}>По умолчанию</option>
            <option value={Sort.TitleAscending}>По названию (A-Z)</option>
            <option value={Sort.TitleDescending}>По названию (Z-A)</option>
            <option value={Sort.Completed}>Выполнено</option>
            <option value={Sort.Incomplete}>В процессе</option>
          </select>
        </label>
      </div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск..."
        />
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            selectedTodoId={selectedTodoId}
            editingTodoId={editingTodoId}
            editingTodoTitle={editingTodoTitle}
            viewTodo={viewTodo}
            closeView={closeView}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            editTodo={editTodo}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            setEditingTodoTitle={setEditingTodoTitle}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoListTest;
