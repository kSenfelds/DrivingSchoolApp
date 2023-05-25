import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { RegistrationForm } from './Components/RegistrationForm';
import { StudentList } from './Components/StudentList';

function App() {
  return (
    <>
      <RegistrationForm/>
      <StudentList/>
    </>
  );
}

export default App;
