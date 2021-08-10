import React from "react";

const MovieForm = ({ match, history }) => {
  // match,params and history are getting from chrome browser React dev tools
  return (
    <div>
      <h1>Movie form - {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
