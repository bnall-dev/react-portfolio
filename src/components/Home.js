import React from "react";

function Home(props) {
  return (
    <div id="home">
      <div className="link">
        <a href="#view=vacations">Vacation</a>
      </div>
      <br></br>
      <div className="link">
        <a href="#view=notes">Notes</a>
      </div>
    </div>
  );
}

export default Home;
