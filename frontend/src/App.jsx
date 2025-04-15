import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Movies from "./Movies.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import "./app.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/movies"
          element={isAuthenticated ? <Movies /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
