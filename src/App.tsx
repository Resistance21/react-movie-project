import { useState } from "react";

const tempMovieData: Array<moviesType> = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData: Array<moviesType> = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

type moviesType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  runtime?: number;
  imdbRating?: number;
  userRating?: number;
};

const average = (arr: Array<number>) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const NavBar = ({ children }: { children: React.ReactNode }) => {
  return <nav className="nav-bar">{children}</nav>;
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

const MovieCount = ({ movies }: { movies: Array<moviesType> }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className="main">{children}</main>;
};

const MovieListBox = ({ children }: { children: React.ReactNode }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && <>{children}</>}
    </div>
  );
};

const MovieWatchedListBox = ({ children }: { children: React.ReactNode }) => {
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && <>{children}</>}
    </div>
  );
};

const MovieList = ({ movies }: { movies: Array<moviesType> }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MovieListItem movie={movie} />
      ))}
    </ul>
  );
};

const MovieListItem = ({ movie }: { movie: moviesType }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const MovieWatchSummary = ({ watched }: { watched: Array<moviesType> }) => {
  const avgImdbRating = average(
    watched.map((movie) => (movie.imdbRating ? movie.imdbRating : 0))
  );
  const avgUserRating = average(
    watched.map((movie) => (movie.userRating ? movie.userRating : 0))
  );
  const avgRuntime = average(
    watched.map((movie) => (movie.runtime ? movie.runtime : 0))
  );
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [movies, setMovies] = useState<Array<moviesType>>(tempMovieData);
  const [watched, setWatched] = useState<Array<moviesType>>(tempWatchedData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <MovieCount movies={movies} />
      </NavBar>

      <Main>
        <MovieListBox>
          <MovieList movies={movies} />
        </MovieListBox>

        <MovieWatchedListBox>
          <MovieWatchSummary watched={watched} />
          <MovieList movies={watched} />
        </MovieWatchedListBox>
      </Main>
    </>
  );
}
