import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const { imdbID } = useParams();  // Extract imdbID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = () => {
      setLoading(true);
      fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=c81e482b`)
        .then((response) => response.json())
        .then((data) => {
          setMovieDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching movie details:", error);
          setLoading(false);
        });
    };

    fetchMovieDetails();
  }, [imdbID]);  // Re-run the fetch if imdbID changes

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (!movieDetails) {
    return <p>Movie not found.</p>;
  }

  return (
    <div>
      <h1>{movieDetails.Title}</h1>
      <p>{movieDetails.Year}</p>
      <p>{movieDetails.Plot}</p>
      <img src={movieDetails.Poster} alt={movieDetails.Title} width="200" />
    </div>
  );
}

export default Details;
