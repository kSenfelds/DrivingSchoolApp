import React, { useState } from 'react';
import '../Styles/RegistrationForm.scss';
import {Student} from '../Types/student';
import { AddStudent } from '../api';

export const RegistrationForm = () => {
    const [student, setStudent] = useState<Student>();
    const [form, setForm] = useState({
        firstName: {
            value: '',
            error: ''
        },
        lastName: {
            value: '',
            error: ''
        },
        yearOfBirth: {
            value: 0,
            error: ''
        },
        phoneNumber: {
            value: '',
            error: ''
        },
        email: {
            value: '',
            error: ''
        },
        address: {
            value: '',
            error: ''
        },
        city: {
            value: '',
            error: ''
        },
        trainingCategory: {
            value: '',
            error: ''
        },
    });

    const changeInput = (value: string|number, key: string) => {
        setForm({
            ...form,
            [key]: {
                ...form[key as keyof typeof form],
                value
            }
        });
    }
    const handleSubmit = () => {
        console.log(form);
    }
  
  return (
    <>
        <form className = "registration-form" onSubmit={(e) => {
            e.preventDefault();
            const student: Student = {
                name: form.firstName.value,
                lastName: form.lastName.value,
                yearOfBirth: form.yearOfBirth.value,
                phoneNumber: form.phoneNumber.value,
                email: form.email.value,
                address: form.address.value,
                city: form.city.value,
                trainingCategory: form.trainingCategory.value,
                dateOfRegistration: new Date()
            }
            setStudent(student);
            console.log(student);
        }}>
            <label htmlFor="firstName">First Name</label>
                <input type="text" value={form.firstName.value} onChange={(e) => {
                    e.preventDefault();
                    changeInput(e.currentTarget.value, 'firstName');
                    console.log(form.firstName.value);
                }} />
            <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" value={form.lastName.value} onChange={(e) => {
                    
                    changeInput(e.target.value, 'lastName');
                }} />
            <label htmlFor="yearOfBirth">Year of Birth</label>
                <input type="number" name="yearOfBirth" value={form.yearOfBirth.value} onChange={(e) => {
                    
                    changeInput(e.target.value, 'yearOfBirth');
                }} />
            <label htmlFor="email">Email</label>
                <input type="email" name="email" value={form.email.value} onChange={(e) => {
                   
                    changeInput(e.target.value, 'email');
                }} />
            <label htmlFor="phoneNumber">PhoneNumber</label>
                <input type="text" name="phonenumber" value={form.phoneNumber.value} onChange={(e) => {
                    
                    changeInput(e.target.value, 'phoneNumber');
                }} />
            <label htmlFor="address">Address</label>
                <input type="text" name="address" value={form.address.value} onChange={(e) => {
                    
                    changeInput(e.target.value, 'address');
                }} />
            <label htmlFor="city">City</label>
                <input type="text" name="city" value={form.city.value} onChange={(e) => {
                    
                    changeInput(e.target.value, 'city');
                }} />
            <label htmlFor="trainingCategory">Training Category</label>
                <select  id="training-category" onChange={
                    (e) => {
                        
                        changeInput(e.target.value, 'trainingCategory');
                    }
                }>
                    <option value= "A">A</option>
                    <option value= "A1">A1</option>
                    <option value= "B">B</option>
                    <option value= "BE">BE</option>
                    <option value= "C">C</option>
                    <option value= "CE">CE</option>
                    <option value= "D">D</option>
                    <option value= "M">M</option>
                </select>
            <button type="submit">Submit</button>

                
        </form>
    </>
  )
}