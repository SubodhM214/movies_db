// const Movies = ({ movies }) => {
//   return (
//     <table>
//       <tbody>
//         <tr>
//           <th>Title</th>
//           <th>Director</th>
//           <th>Release year</th>
//         </tr>
//         {movies.map((movie) => (
//           <tr key={movie.id}>
//             <td>{movie.title}</td>
//             <td>{movie.director}</td>
//             <td>{movie.release_year}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Movies;

import { useState, useEffect } from "react";
import axios from "axios";

const Movies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5000/movieapi/movies");
        setMovies(res.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hello</h1>

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
