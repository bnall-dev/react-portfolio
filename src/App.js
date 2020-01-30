import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import './App.css';
import axios from 'axios';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

const fetchUser = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  if (userId) {
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    } catch (ex) {
      storage.removeItem('userId');
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem('userId', user.id);
  return user;
};

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser().then(data => setUser(data));
  }, [user]);

  const handleChangeUser = async e => {
    const storage = window.localStorage;

    const user = (await axios.get(`${API}/users/random`)).data;
    storage.setItem('userId', user.id);
  };

  return (
    <div id="app">
      <Header user={user} handleChangeUser={handleChangeUser} />
    </div>
  );
}

export default App;
