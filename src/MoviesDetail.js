import { useEffect, useState } from "react";
import StarRating from './StarRating';
import Loading from "./Loading";

const KEY = '35c36f25';

function MovieDetail({ selectedMovieId, onCloseMovieDetail, onAddWatched, watched }) {

    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');

    const isWatched = watched.map(movie => movie.imdbID).includes(selectedMovieId);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedMovieId)?.userRating;

    const{Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
        Writer: writer,
     } = movie;

     function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedMovieId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(" ").at(0)),
            userRating,
        };
        onAddWatched(newWatchedMovie);
        onCloseMovieDetail();
     }

    useEffect(function() {
        setIsLoading(true);
        async function getMovieDetails() {
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }
        getMovieDetails();
    }, [selectedMovieId]);

    useEffect(function() {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return function() {
            document.title = "usePopcorn";
        };
    }, [title]);

    useEffect( function() {
        function callBack(e) {
            if (e.code === "Escape") {
                onCloseMovieDetail();
            }
        }

        document.addEventListener("keydown", callBack);

        return function() {
            document.removeEventListener("keydown", callBack);
        };
    }, [onCloseMovieDetail]);

    return (
        <div className="details">
            {isLoading ? <Loading /> : <>
            <header>
            <button className="btn-back" onClick={onCloseMovieDetail}>&larr;</button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
                <h2>{title}</h2>
                <p>{released} &bull; {runtime}</p>
                <p>{genre}</p>
                <p>
                    <span>⭐</span>{imdbRating} IMDb Rating
                </p>
            </div>
            </header>
            <section>
                <div className="rating">
                    {!isWatched ? 
                    <>
                        <StarRating maxRating={10} color={"yellow"} size={24} onSetRating={setUserRating} />
                        {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                    </>
                    :
                    <p>You already rated this movie with {watchedUserRating} <span>⭐</span></p>
                    }
                </div>
                <p><em>{plot}</em></p>
                <p>Starring : {actors}</p>
                <p>Director : {director}</p>
                <p>Writers : {writer}</p>
            </section>
            </>}
        </div>
    );
}

export default MovieDetail;