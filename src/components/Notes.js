import React from 'react';

function Notes(props) {
  //Iterate through note data and make li for each note
  let noteList = props.notes.map(note => {
    return <li key={note.id}>{note.text}</li>;
  });

  return (
    <div id="notes">
      <h3 className="header">NOTES</h3>
      <ul>{noteList}</ul>
    </div>
  );
}

export default Notes;
