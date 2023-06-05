import React from 'react'
import { RegistrationForm } from '../Components/RegistrationForm'
import { AddStudent } from '../api';
import { StudentList } from '../Components/StudentList';

export const RegristrationView = () => {
  return (
    <>
    <h1> Register a new Student</h1>
    <RegistrationForm onSave = { async (data) => {
        await AddStudent(data).then((response) => {
            if (response && response === 200) {
                alert("Student added successfully");
              } else {
                alert("Error: Unable to add student");
              }
            });
        }} />
    </>
  )
}