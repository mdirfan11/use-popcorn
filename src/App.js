import { useEffect, useState } from "react";
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

const KEY = '35c36f25';

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);

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

  useEffect(function() {
    const controller = new AbortController();
    async function fetchMovies() {
      setError("");
      setIsLoading(true);
      try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal});

        if (!res.ok) {
          throw new Error();
        } 

        const data = await res.json();
        if (data.Response === 'False') {
          throw data.Error;
        }
        setMovies(data.Search);
        setError("");
      } catch (e) {
        if (e.name !== "AbortError")
          setError(e);
      } finally {
        setIsLoading(false);
      }
    
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return function() {
      controller.abort();
    };
  }, [query]);

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
