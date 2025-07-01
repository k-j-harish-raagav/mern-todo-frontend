import React, { useState } from 'react';
import TodoList from './components/TodoList';
import Auth from './components/Auth';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
    <h1>Todo App with Auth & Due Dates</h1>
    {user ? (
      <>
        <button onClick={() => setUser(null)} style={{ float: 'right' }}>Logout</button>
        <TodoList user={user} />
      </>
    ) : (
      <Auth setUser={setUser} />
    )}
  </div>
  );
}

export default App;