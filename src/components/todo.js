import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './todo.module.css';

const Todo = ({ todo, reloadTodos }) => {
  const toggleCompleted = () => {
    axios
      .post('/api/toggle-completed', {
        id: todo._id,
        text: todo.text,
        completed: !todo.completed,
      })
      .then(reloadTodos);
  };

  const handleDelete = () => {
    axios
      .post('/api/delete-todo', {
        id: todo._id,
      })
      .then(reloadTodos);
  };
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={`todo-toggle-${todo._id}`} className={styles.label}>
        Mark Complete
      </label>
      <input
        name={`todo-toggle-${todo._id}`}
        id={`todo-toggle-${todo._id}`}
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
        className={styles.toggle}
      />
      <p className={`${styles.text} ${todo.completed && styles.completed}`}>
        {todo.text}
      </p>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor={`todo-delete-${todo._id}`} className={styles.label}>
        delete
      </label>
      <button type="button" onClick={handleDelete} className={styles.delete}>
        <span role="img" aria-label="delete" title="delete this todo">
          ❌
        </span>
      </button>
    </>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  reloadTodos: PropTypes.func.isRequired,
};

export default Todo;
