import React from 'react';
import { Todo } from './TodoList';

interface Props {
  todo: Todo;
  closeView: () => void;
}

const TodoView: React.FC<Props> = ({ todo, closeView }) => {
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>Выполнено: {todo.completed ? 'Yes' : 'No'}</p>
      <button onClick={closeView}>Закрыть</button>
    </div>
  );
};

export default TodoView;