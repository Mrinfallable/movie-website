import Search from "./components/Search.jsx";
import { useState, useEffect } from "react";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); 
  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, options);
      const data = await response.json();
      console.log(data);
      console.log(API_KEY);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please tryy again sometime");
    }
    }
  useEffect(() => {
    fetchMovies();
  }, []);
  
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner"/>
          <h1>
             Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <section className="all-movies">
            <h2>All Movies</h2>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </section>

        </header>
      </div>
    </main>
  )
}

export default App