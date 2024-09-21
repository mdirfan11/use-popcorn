import { useState, useEffect } from "react";

const KEY = '35c36f25';

function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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

    return {movies, isLoading, error}
}

export default useMovies;