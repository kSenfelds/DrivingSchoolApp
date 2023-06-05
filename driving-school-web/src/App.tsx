import React from 'react';
import './App.scss';
import {Route, Routes} from 'react-router-dom';
import { RegristrationView } from './Views/RegristrationView';
import { NavBar } from './Components/NavBar';
import { StudentsView } from './Views/StudentsView';


function App() {
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={<RegristrationView />} />
      <Route path="/students" element={<StudentsView />} />
    </Routes>
    </>
  );
}

export default App;
