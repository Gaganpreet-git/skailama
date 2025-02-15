import "./App.css";
import HomePage from "./pages/Home/HomePage";
import { useState } from "react";
import ProjectDetails from "./pages/Home/ProjectDetails/ProjectDetails";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import PodcastDetails from "./pages/PodCastDetails/PodcastDetails";
import Register from "./pages/Home/Register/Register";

function App() {
  const [name, setName] = useState("");
  
  return (
    <div className="App">
      <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/project/:id" element={<ProjectDetails />} />
    <Route path="/podcast/:id" element={<PodcastDetails />} />
  </Routes>;

    
    </div>
  );
}

export default App;
