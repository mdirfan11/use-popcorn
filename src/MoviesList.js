import Movie from "./Movie";

function MoviesList({ movies, handleMovieSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} handleMovieSelect={handleMovieSelect}/>
      ))}
    </ul>
  );
}

export default MoviesList;