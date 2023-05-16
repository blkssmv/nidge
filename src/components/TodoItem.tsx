import React from 'react';
import { Todo } from './TodoList';

interface Props {
  todo: Todo;
  selectedTodoId: number | null;
  editingTodoId: number | null;
  editingTodoTitle: string;
  viewTodo: (id: number) => void;
  closeView: () => void;
  deleteTodo: (id: number) => void;
  completeTodo: (id: number, completed: boolean) => void;
  editTodo: (id: number, title: string) => void;
  updateTodo: () => void;
  cancelEdit: () => void;
  setEditingTodoTitle: (title: string) => void;
}

const TodoItem: React.FC<Props> = ({
  todo,
  selectedTodoId,
  editingTodoId,
  editingTodoTitle,
  viewTodo,
  closeView,
  deleteTodo,
  completeTodo,
  editTodo,
  updateTodo,
  cancelEdit,
  setEditingTodoTitle,
}) => {
  return (
    <li>
      {selectedTodoId === todo.id ? (
        <div className="view">
          <h2>Название: {todo.title}</h2>
          <h3>ID: {todo.id}</h3>
          <p>Выполнено: {todo.completed ? 'Yes' : 'No'}</p>
          <button onClick={closeView}>Закрыть</button>
        </div>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo(todo.id, todo.completed)}
          />
          {editingTodoId === todo.id ? (
            <div className="editing">
              <input
                type="text"
                value={editingTodoTitle}
                onChange={(e) => setEditingTodoTitle(e.target.value)}
              />
              <button onClick={updateTodo}>Сохранить</button>
              <button onClick={cancelEdit}>Отмена</button>
            </div>
          ) : (
            <>
              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </span>
              <button onClick={() => editTodo(todo.id, todo.title)}>
                Редактировать
              </button>
              <button onClick={() => viewTodo(todo.id)}>Просмотр</button>
              <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
            </>
          )}
        </div>
      )}
    </li>
  );
};

export default TodoItem;
