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
    <div style={{ margin: 20, color: 'white', minHeight: '100vh', minWidth: 'auto', backgroundColor: 'black', overflow: 'auto' }}>
      <div style={{display:"grid",   placeItems: "center", alignItems:"center" }}>
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
          <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap:"40px",placeItems: "center", alignItems:"center" }}>
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <div key={index} >
                  <div style={{backgroundColor:"black", height: '100%' }}>
                  <Link to={`/Details/${movie.imdbID}`}>
                    <h2 style={{color:"white"}}>{movie.Title}</h2>
                  </Link>
                  <br/>
                  <img  src={movie.Poster} alt={movie.Title} width="200" />
                  </div>
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
