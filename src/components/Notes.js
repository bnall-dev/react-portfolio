import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Notes(props) {
  //Iterate through note data and make li for each note
  let noteList = props.notes.map(note => {
    return (
      <li key={note.id}>
        {note.text} <button onClick={() => props.remNote(note)}>X</button>
      </li>
    );
  });

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => props.addNote(data);
  console.log(errors);

  return (
    <div id="notes">
      <h3 className="header">NOTES</h3>
      <ul>{noteList}</ul>
      {console.log(noteList)}
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea name="text" ref={register} />

        <input type="submit" />
      </form>
    </div>
  );
}

export default Notes;
