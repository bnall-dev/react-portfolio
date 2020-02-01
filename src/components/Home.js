import React from 'react';

function Home({ vacations, notes, followingCompanies }) {
  return (
    <div id="home">
      <a className="homeItem" href="#view=vacations">
        <h3>Vacations</h3>
        <h6>You have {vacations.length} Vacations</h6>
      </a>
      <a className="homeItem" href="#view=notes">
        <h3>Notes</h3>
        <h6>You have {notes.length} Notes</h6>
      </a>
      <a className="homeItem" href="#view=followingCompanies">
        <h3>Following Companies</h3>
        <h6>You are following {followingCompanies.length} Companies</h6>
      </a>
    </div>
  );
}

export default Home;
