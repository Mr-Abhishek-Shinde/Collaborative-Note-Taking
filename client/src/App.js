import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import About from "./pages/About"
import NotesHome from "./pages/NotesHome";


function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        {/* <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/authentication" element={<Navigate to="/dashboard" />} />
          <Route exact path="/notes/" element={ <NotesHome /> } />
          <Route exact path="/notes/note/:noteId" element={ <Notes /> } />
          <Route exact path="/dashboard" element={ <Navigate to="/" />} />
          <Route exact path="/about" element={<About />}/>
        </Routes> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/authentication" element={user ? <Navigate to="/dashboard" />: <Authentication />} />
          <Route exact path="/notes/" element={user ? <NotesHome /> : <Navigate to="/" />} />
          <Route exact path="/notes/note/:noteId" element={user ? <Notes /> : <Navigate to="/" />} />
          <Route exact path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
          <Route exact path="/about" element={<About />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
