import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Vacations from './components/Vacations';
import Notes from './components/Notes';
import FollowingCompanies from './components/FollowingCompanies';
import Home from './components/Home';
import './App.css';
import axios from 'axios';
import { getHash } from './utils';
import qs from 'qs';

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

//FETCHES NOTES BASED ON USER
const fetchNotes = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  const notes = (await axios.get(`${API}/users/${userId}/notes`)).data;
  return notes;
};

//FETCHES FOLLOWING COMPANIES BASED ON USER
const fetchFollowingCompanies = async () => {
  const storage = window.localStorage;
  const userId = storage.getItem('userId');
  const followingCompanies = (
    await axios.get(`${API}/users/${userId}/followingCompanies`)
  ).data;

  return followingCompanies;
};

//FETCHES ALL COMPANIES
const fetchCompanies = async () => {
  const companies = (await axios.get(`${API}/companies`)).data;
  return companies;
};

function App() {
  //USER, VACATIONS, NOTES, FOLLOWING COMPANIES, & COMPANIES STATES
  const [user, setUser] = useState({});
  const [vacations, setVacations] = useState([]);
  const [notes, setNotes] = useState([]);
  const [followingCompanies, setFollowingCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);

  //ROUTING/PARAMS STATE
  const [params, setParams] = useState(qs.parse(getHash()));

  //ASSIGNS USER TO STATE AND CREATES HASHCHANGE LISTENER
  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setParams(qs.parse(getHash()));
    });
    setParams(qs.parse(getHash()));
    fetchUser().then(data => setUser(data));
  }, []);

  //ASSIGNS VACATIONS, NOTES, & FOLLOWING COMPANIES LIST TO STATE
  useEffect(() => {
    fetchVacations().then(data => setVacations(data));
    fetchNotes().then(data => setNotes(data));
    fetchFollowingCompanies().then(data => setFollowingCompanies(data));
  }, [user]);

  //ASSIGNS COMPANIES TO STATE
  useEffect(() => {
    fetchCompanies().then(data => setCompanies(data));
  }, []);

  //ON CLICK RANDOMLY CHANGES USER
  const handleChangeUser = async e => {
    const storage = window.localStorage;
    const user = (await axios.get(`${API}/users/random`)).data;
    storage.setItem('userId', user.id);
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

  //FOLLOWS COMPANY USING FORM SELECTION
  const createCompany = async company => {
    const response = await axios.post(
      `${API}/users/${user.id}/followingCompanies/`,
      company
    );
    setFollowingCompanies([...followingCompanies, response.data]);
  };

  const handleFollowCompany = async e => {
    e.preventDefault();
    const selectedCompany = companies.find(function(company) {
      return company.name === e.target.elements[0].value;
    });

    await createCompany({
      rating: selectedCompany.rating,
      companyId: selectedCompany.id,
    });
  };

  //UNFOLLOWS FOLLOWING COMPANY
  const handleUnfollowCompany = async followingCompanyToDestroy => {
    await axios.delete(
      `${API}/users/${user.id}/followingCompanies/${followingCompanyToDestroy.id}`
    );
    setFollowingCompanies(
      followingCompanies.filter(
        followingCompany => followingCompany.id !== followingCompanyToDestroy.id
      )
    );
  };

  return (
    <div id="app">
      <Header user={user} handleChangeUser={handleChangeUser} />
      {params.view === undefined && (
        <Home
          vacations={vacations}
          notes={notes}
          followingCompanies={followingCompanies}
        />
      )}
      {params.view === 'vacations' && (
        <Vacations
          user={user}
          vacations={vacations}
          handleRemoveVacation={handleRemoveVacation}
          handleSubmitVacation={handleSubmitVacation}
        />
      )}
      {params.view === 'followingCompanies' && (
        <FollowingCompanies
          followingCompanies={followingCompanies}
          companies={companies}
          handleFollowCompany={handleFollowCompany}
          handleUnfollowCompany={handleUnfollowCompany}
        />
      )}
      {params.view === 'notes' && <Notes user={user} notes={notes} />}
    </div>
  );
}

export default App;
