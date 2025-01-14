import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Details() {
  const { imdbID } = useParams();  // Extract imdbID from the URL
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(imdbID)

  useEffect(() => {
    const fetchMovieDetails = () => {
      setLoading(true);
      fetch(`http://www.omdbapi.com/?apikey=c81e482b&i=${imdbID}`)  // Use imdbID from URL
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
    <div style={{color:"white", display:"grid", textAlign:"center", alignItems:"center", gap:"2px", padding:"2px", margin:"2px"}}>
      <h1>Movie Title:{movieDetails.Title}</h1>
      <p>Year:{movieDetails.Year}, Rated:{movieDetails.Rated}</p>
      <p>Runtime:{movieDetails.Runtime}</p>
      <p>Genre:{movieDetails.Genre}</p>
      <p>Director:{movieDetails.Director}</p>
      <p>Writer:{movieDetails.Writer}</p>
      <p>Plot:{movieDetails.Plot}</p>
      <p>Language:{movieDetails.Language}</p>
      <p>Country:{movieDetails.Country}</p>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><img src={movieDetails.Poster} alt={movieDetails.Title} width="200" /></div>
      
    </div>
  );
}

export default Details;
