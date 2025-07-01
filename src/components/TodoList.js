import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList({ user }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [dueDate, setDueDate] = useState('');

  const API_URL = 'http://localhost:5000/api/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL, { headers: { email: user.email } });
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (input.trim()) {
      const res = await axios.post(API_URL, {
        text: input,
        dueDate,
        email: user.email
      });
      setTodos([...todos, res.data]);
      setInput('');
      setDueDate('');
    }
  };

  const toggleDone = async (id) => {
    const todo = todos.find(t => t._id === id);
    const res = await axios.put(`${API_URL}/${id}`, { done: !todo.done });
    setTodos(todos.map(t => t._id === id ? res.data : t));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add a task" />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      {todos.map(todo => (
        <div key={todo._id} className="todo-item">
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo._id)} />
            {' '}{todo.text} (Due: {todo.dueDate?.split('T')[0]})
          </span>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;