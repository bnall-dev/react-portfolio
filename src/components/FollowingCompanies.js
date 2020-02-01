import React from 'react';

function FollowingCompanies({
  followingCompanies,
  companies,
  handleUnfollowCompany,
  handleFollowCompany,
}) {
  let rating;
  let followingCompaniesList;
  if (followingCompanies.length > 0) {
    followingCompaniesList = followingCompanies.map(function(
      followingCompany,
      i
    ) {
      followingCompanies.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      const company = companies.find(function(company) {
        return company.id === followingCompany.companyId;
      });
      const key = 'followingCompany' + i;

      const ratingArray = [];
      for (let i = 0; i < followingCompany.rating; i++) {
        ratingArray.push(i);
      }
      rating = ratingArray.map(function(each, i) {
        let key = 'star' + i;
        return (
          <img
            className="star"
            src="https://pngimage.net/wp-content/uploads/2018/06/gold-star-icon-png-3.png"
            alt="Rating Star"
            key={key}
          ></img>
        );
      });

      return (
        <div className="followingCompany" key={key}>
          <div className="rating">{rating}</div>
          <h4>{company.name}</h4>
          <h5>{company.catchPhrase}</h5>
          <h6>Located in {company.state}</h6>
          <h6>{company.phone}</h6>
          <button
            className="unfollowCompany"
            onClick={() => handleUnfollowCompany(followingCompany)}
          >
            Unfollow
          </button>
        </div>
      );
    });
  } else {
    followingCompaniesList = (
      <div className="placeholder">No Companies Followed</div>
    );
  }

  companies.sort((a, b) => (a.name > b.name ? 1 : -1));
  const companiesList = companies.map(function(company, i) {
    const key = 'company' + i;
    return <option key={key}>{company.name}</option>;
  });

  return (
    <div id="followingCompanies">
      <form id="followCompany" onSubmit={handleFollowCompany}>
        <h3>Following Companies</h3>
        <select id="selectCompany" defaultValue="Companies">
          <option disabled>Companies</option>
          {companiesList}
        </select>

        <input id="submitCompany" type="submit" value="Follow"></input>
      </form>
      <div id="followingCompaniesList">{followingCompaniesList}</div>
    </div>
  );
}

export default FollowingCompanies;
