import React, { Component } from "react";
import Like from "./common/like";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  handleDelete = (movie) => {
    // a new movies array should be created everytime except the movie we passed here
    const removies = this.state.movies.filter((rm) => rm._id !== movie._id);
    this.setState({ movies: removies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies]; //cloning all the objects
    const index = movies.indexOf(movie); //finding the index of the object
    movies[index] = { ...movies[index] }; // cloning the movie in that index
    movies[index].liked = !movies[index].liked; // Updating : like become unliked vice versa
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) return <p>There are no movies in the database</p>;
    return (
      <React.Fragment>
        <p>There are {count} movies in the database</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    // the anonymous function is used to pass argument (movie)
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
