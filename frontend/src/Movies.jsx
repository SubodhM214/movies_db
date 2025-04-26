import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirect

const Movies = ({ setIsAuthenticated }) => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/movieapi/movies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert("Session expired. Please log in again.");
          handleLogout();
        }
      }
    };
    fetchAllMovies();
  }, []);

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/movieapi/movies/search",
          {
            params: { q: query },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching searched movies:", error);
      }
    };

    if (query.trim().length > 0) {
      fetchSearchedMovies();
    }
  }, [query]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Movies</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <input
        type="text"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        placeholder="Search by title, director, year, genre..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
      />

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Director</th>
            <th className="border p-2">Release Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-100">
              <td className="border p-2">{movie.title}</td>
              <td className="border p-2">{movie.director}</td>
              <td className="border p-2">{movie.release_year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Movies;
