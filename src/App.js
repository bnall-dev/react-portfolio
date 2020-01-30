import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Vacations from "./components/Vacations";
import Notes from "./components/Notes";
import Home from "./components/Home";
import "./App.css";
import axios from "axios";
import { getHash } from "./utils";
import qs from "qs";

const API = "https://acme-users-api-rev.herokuapp.com/api";

//FETCHES RANDOM USER ON LOAD
const fetchUser = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem("userId");
  if (userId) {
    try {
      return (await axios.get(`${API}/users/detail/${userId}`)).data;
    } catch (ex) {
      storage.removeItem("userId");
      return fetchUser();
    }
  }
  const user = (await axios.get(`${API}/users/random`)).data;
  storage.setItem("userId", user.id);
  return user;
};

//FETCHES VACATION LIST BASED ON USER
const fetchVacations = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem("userId");
  const vacations = (await axios.get(`${API}/users/${userId}/vacations`)).data;
  return vacations;
};

//FETCHES NOTES BASED ON USER
const fetchNotes = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem("userId");
  const notes = (await axios.get(`${API}/users/${userId}/notes`)).data;
  return notes;
};

function App() {
  //USER, VACATION, AND NOTES STATES
  const [user, setUser] = useState({});
  const [vacations, setVacations] = useState([]);
  const [notes, setNotes] = useState([]);
  //ROUTING/PARAMS STATE
  const [params, setParams] = useState(qs.parse(getHash()));

  //ASSIGNS USER TO STATE AND CREATES HASHCHANGE LISTNER
  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setParams(qs.parse(getHash()));
    });
    setParams(qs.parse(getHash()));
    fetchUser().then(data => setUser(data));
  }, []);

  //ASSIGNS NOTES AND VACATION LIST TO STATE
  useEffect(() => {
    fetchVacations().then(data => setVacations(data));
    fetchNotes().then(data => setNotes(data));
  }, [user]);

  //ON CLICK RANDOMLY CHANGES USER
  const handleChangeUser = async e => {
    const storage = window.localStorage;
    const user = (await axios.get(`${API}/users/random`)).data;
    storage.setItem("userId", user.id);
    setUser(user);
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
      endDate: e.target.elements[1].value
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
      {params.view === undefined && <Home />}
      {params.view === "vacations" && (
        <Vacations
          user={user}
          vacations={vacations}
          handleRemoveVacation={handleRemoveVacation}
          handleSubmitVacation={handleSubmitVacation}
        />
      )}
      {params.view === "notes" && <Notes user={user} notes={notes} />}
    </div>
  );
}

export default App;
