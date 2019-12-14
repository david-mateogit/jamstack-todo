import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './form.module.css';

const Form = ({ reloadTodos }) => {
  const [text, setText] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    if (text.trim() === '') return;
    await axios.post('/api/create-todo', { text });
    setText('');
    reloadTodos();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="todo">
        Add a Todo
        <input
          name="todo"
          type="text"
          className={styles.input}
          value={text}
          onChange={event => setText(event.target.value)}
          autoComplete="off"
        />
      </label>
      <button type="button" className={styles.button}>
        Save Todo
      </button>
    </form>
  );
};

Form.propTypes = {
  reloadTodos: PropTypes.func.isRequired,
};
export default Form;
