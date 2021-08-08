import React, { Component } from "react";
import MoviesTable from "../components/moviesTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
  };

  componentDidMount() {
    //
    const genres = [{ name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = (movie) => {
    // a new movies array should be created everytime except the movie we passed here
    const remainingMovies = this.state.movies.filter(
      (m) => m._id !== movie._id
    );
    this.setState({ movies: remainingMovies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies]; //cloning all the objects
    const index = movies.indexOf(movie); //finding the index of the object
    movies[index] = { ...movies[index] }; // cloning the movie in that index
    movies[index].liked = !movies[index].liked; // Updating : like become unliked vice versa
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 }); // currentPage is given otherwise we would
  }; //empty page when page is selected at some other page

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database</p>;

    // when we select a Genre  then selectedGenre becomes truthy and
    //    filter applied and shows only the movies in that Genre

    // after adding ALL GENRE option we should add && selectedGenre._id because all genre has only names not id
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    // paginate function is applied according to the filtered
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>There are {filtered.length} movies in the database</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
          />
          <Pagination
            // initially  itemsCount={count} and now have show count of filtered movies
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
