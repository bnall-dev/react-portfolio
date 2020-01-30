import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Vacations from './components/Vacations';
import './App.css';
import axios from 'axios';

const API = 'https://acme-users-api-rev.herokuapp.com/api';

//FETCHES RANDOM USER ON LOAD
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

//FETCHES VACATION LIST BASED ON USER
const fetchVacations = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  const vacations = (await axios.get(`${API}/users/${userId}/vacations`)).data;
  return vacations;
};

function App() {
  //USER AND VACATION LIST STATES
  const [user, setUser] = useState({});
  const [vacations, setVacations] = useState([]);

  //ASSIGNS USER AND VACATION LIST TO STATE
  useEffect(() => {
    fetchUser().then(data => setUser(data));
    fetchVacations().then(data => setVacations(data));
  }, [user]);

  //ON CLICK RANDOMLY CHANGES USER
  const handleChangeUser = async e => {
    const storage = window.localStorage;

    const user = (await axios.get(`${API}/users/random`)).data;
    storage.setItem('userId', user.id);
  };

  //ADDS VACATION TO LIST USING FORM DATA
  const createVacation = async vacation => {
    const response = await axios.post(
      `${API}/users/${user.id}/vacations`,
      vacation
    );
    setVacations([...vacations, response.data]);
  };

  const handleSubmitVacation = async e => {
    e.preventDefault();

    await createVacation({
      startDate: e.target.elements[0].value,
      endDate: e.target.elements[1].value,
    });
  };

  //REMOVES VACATION FROM LIST
  const handleRemoveVacation = async vacationToDestroy => {
    await axios.delete(
      `${API}/users/${user.id}/vacations/${vacationToDestroy.id}`
    );
    setVacations(
      vacations.filter(vacation => vacation.id !== vacationToDestroy.id)
    );
  };

  return (
    <div id="app">
      <Header user={user} handleChangeUser={handleChangeUser} />
      <Vacations
        user={user}
        vacations={vacations}
        handleRemoveVacation={handleRemoveVacation}
        handleSubmitVacation={handleSubmitVacation}
      />
    </div>
  );
}

export default App;
