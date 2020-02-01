import React from 'react';

function Home({ vacations, notes }) {
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
        Following Companies
        <h6>You are following Companies</h6>
      </a>
    </div>
  );
}

export default Home;
