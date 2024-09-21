import { useState } from "react";
import NavBar from "./NavBar"
import Main from "./Main";
import NumResult from "./NumResult";
import Box from "./Box";
import MoviesList from "./MoviesList";
import WatchedSummery from "./WatchedSummery";
import WatchedMovieList from "./WatchedMovieList";
import Loading from "./Loading";
import Error from "./Error";
import MovieDetail from "./MoviesDetail";
import useMovies from "./useMovies";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const {movies, isLoading, error} = useMovies(query);

  function handleMovieSelect(id) {
    setSelectedMovieId(id);
  }

  function onCloseMovieDetail() {
    setSelectedMovieId(null);
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeletWatched(movieId) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== movieId))
  }

  return (
    <>
      <NavBar query={query} setQuery={setQuery}>
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loading /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loading />}
          {!isLoading && !error && <MoviesList movies={movies} handleMovieSelect={handleMovieSelect} />}
          {error && <Error message={error} />}
        </Box>
        <Box>
        { selectedMovieId ? 
          <MovieDetail 
          selectedMovieId={selectedMovieId} 
          onCloseMovieDetail={onCloseMovieDetail}
          onAddWatched={handleAddWatched}
          watched={watched}
          />
        : <>
          <WatchedSummery watched={watched} />
          <WatchedMovieList watched={watched} onDeleteWatched={handleDeletWatched} />
          </>
        }
        </Box>
      </Main>

    </>
  );
}
