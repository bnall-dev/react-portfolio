import React from 'react';
import moment from 'moment';

function Vacations({
  user,
  vacations,
  handleRemoveVacation,
  handleSubmitVacation,
}) {
  const vacationList = vacations.map(function(vacation, i) {
    const key = 'vacation' + i;
    const x = moment(vacation.startDate);
    const y = moment(vacation.endDate);
    const duration = moment.duration(y.diff(x));
    const days = duration.asDays();
    return (
      <div className="vacation" key={key}>
        <h5>
          Start Date :{' '}
          {moment(vacation.startDate)
            .add(1, 'day')
            .format('dddd MM/DD/YYYY ')}
        </h5>
        <h5>
          End Date :{' '}
          {moment(vacation.endDate)
            .add(1, 'day')
            .format('dddd MM/DD/YYYY')}
        </h5>
        <h5>{days} Days</h5>
        <button
          className="removeVacation"
          onClick={() => handleRemoveVacation(vacation)}
        >
          X
        </button>
      </div>
    );
  });

  return (
    <div id="vacations">
      <form id="createVacation" onSubmit={handleSubmitVacation}>
        <h3>Vacations</h3>
        <input id="startDate" type="date"></input>
        <input id="endDate" type="date"></input>
        <input id="submitVacation" type="submit" value="Create"></input>
      </form>
      <div id="vacationList">{vacationList}</div>
    </div>
  );
}

export default Vacations;
