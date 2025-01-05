import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      fetchMovies(searchTerm);
    }
  };

  const fetchMovies = (query) => {
    setLoading(true);
    fetch(`http://www.omdbapi.com/?s=${query}&apikey=c81e482b`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Search && Array.isArray(data.Search)) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
        console.log(data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); 
      });
  };
 

  return (
    <div>
      <div style={{display:"grid",placeItems: "center", alignItems:"center" }}>
        <h1>Search movie</h1>
        <form onSubmit={handleSearchSubmit} style={{padding:"20px"}}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // Update searchTerm state
            placeholder="Search for movies"
          />
          <button type="submit">Search</button>
        </form>
        {loading ? (
          <p>Loading movies...</p>
        ) : (
          <div style={{display:"grid",placeItems: "center", alignItems:"center" }}>
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <div key={index}>
                  <Link to={`/Details/${movie.imdbID}`}>
                    {movie.Title}
                  </Link>
                  <br/>
                  <img  src={movie.Poster} alt={movie.Title} width="100" />
                </div>
              ))
            ) : (
              <p>No movies found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
