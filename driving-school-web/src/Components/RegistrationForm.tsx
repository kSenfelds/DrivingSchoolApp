import React, { useEffect, useRef, useState } from "react";
import "../Styles/RegistrationForm.scss";
import { AddStudent } from "../api";
import { Student } from "../Types/student";

export const RegistrationForm = () => {
  const [form, setForm] = useState({
    name: {
        value: "",
        error: "",
        },
    lastName: {
        value: "",
        error: "",
        },
        yearOfBirth: {
        value: "",
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

  const changeInput = (value: string, key: string) => {
    setForm({
      ...form,
      [key]: {
        ...form[key as keyof typeof form],
        value,
      },
    });
  };

  const isEmpty = (value: string) => {
    return value === "";
  };

  const isValidEmail = (value: string) => {
    return value.includes("@");
  };

  const haAtleast8characters = (value: string) => {
    return value.length >= 8;
  };
  const isNumber = (value: string) => {
    return /^\d+$/g.test(value);
    };

  return (
    <form
      noValidate
      className="registration-form"
      onSubmit={(e) => {
        e.preventDefault();
        // start validate
        const email = form.email.value;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const yearOfBirth = form.yearOfBirth.value;
        const phoneNumber = form.phoneNumber.value;
        const address = form.address.value;
        const city = form.city.value;
        const trainingCategory = form.trainingCategory.value;

        let emailError = "";
        let nameError = "";
        let lastNameError = "";
        let yearOfBirthError = "";
        let phoneNumberError = "";
        let addressError = "";
        let cityError = "";
        let trainingCategoryError = "";

        emailError = isEmpty(email) ? "Email is required" : "";

        if (!emailError) {
          emailError = isValidEmail(email)
            ? ""
            : "Email is should include @ sing";
        }

        if (!emailError) {
          const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            email
          );

          emailError = isValid ? "" : "Email is not valid";
        }

        nameError = isEmpty(name) ? "Name is required" : "";
        lastNameError = isEmpty(lastName) ? "Last name is required" : "";
        yearOfBirthError = isEmpty(yearOfBirth) ? "Year of birth is required" : "";
        if (!yearOfBirthError) {
            yearOfBirthError = isNumber(yearOfBirth)? "" : "Year of birth should have only numbers";
        }
        phoneNumberError = isEmpty(phoneNumber) ? "Phone number is required" : "";
        if (!phoneNumberError) {
            phoneNumberError = isNumber(phoneNumber)? "" : "Phone number should have only numbers";
        }
        if (!phoneNumberError) {
            phoneNumberError = haAtleast8characters(phoneNumber)? "" : "Phone number should have atleast 8 characters";
        }

        addressError = isEmpty(address) ? "Address is required" : "";
        cityError = isEmpty(city) ? "City is required" : "";
        trainingCategoryError = isEmpty(trainingCategory) ? "Training category is required" : "";

        setForm({
          ...form,
          email: {
            ...form.email,
            error: emailError,
          },
            name: {
                ...form.name,
                error: nameError,
            },
            lastName: {
                ...form.lastName,
                error: lastNameError,
            },
            yearOfBirth: {
                ...form.yearOfBirth,
                error: yearOfBirthError,
            },
            phoneNumber: {
                ...form.phoneNumber,
                error: phoneNumberError,
            },
            address: {
                ...form.address,
                error: addressError,
            },
            city: {
                ...form.city,
                error: cityError,
            },
            trainingCategory: {
                ...form.trainingCategory,
                error: trainingCategoryError,
            },
        });

        if (!emailError && !nameError && !lastNameError && !yearOfBirthError && !phoneNumberError && !addressError && !cityError && !trainingCategoryError) {
          alert("Form is valid");
          const student: Student = {
            email,
            name,
            lastName,
            yearOfBirth : parseInt(yearOfBirth),
            phoneNumber,
            address,
            city,
            trainingCategory,
            dateOfRegistration: new Date(),
            };
            AddStudent(student);
          }
        return;
      }}
    >
      <div className="mb-3">
        <div>Email address</div>
        <label htmlFor="floatingInput">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            value={form.email.value}
            onChange={(e) => {
              changeInput(e.target.value, "email");
            }}
            placeholder="name@example.com"
          />
        </label>
        {form.email.error && <div className="error">{form.email.error}</div>}
      </div>
      <div className="mb-3">
        <div>Name</div>
        <label htmlFor="name">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            value={form.name.value}
            onChange={(e) => {
              changeInput(e.target.value, "name");
            }}
          />
        </label>
        {form.name.error && <div className="error">{form.name.error}</div>}
      </div>
        <div className="mb-3">
            <div>Last name</div>
            <label htmlFor="lastName">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={form.lastName.value}
                    onChange={(e) => {
                        changeInput(e.target.value, "lastName");
                    }}
                />
            </label>
            {form.lastName.error && <div className="error">{form.lastName.error}</div>}
        </div>
        <div className="mb-3">
            <div>Year of birth</div>
            <label htmlFor="yearOfBirth">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={form.yearOfBirth.value}
                    onChange={(e) => {
                        changeInput(e.target.value, "yearOfBirth");
                    }}
                />
            </label>
            {form.yearOfBirth.error && <div className="error">{form.yearOfBirth.error}</div>}
        </div>
        <div className="mb-3">
            <div>Phone number</div>
            <label htmlFor="phoneNumber">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={form.phoneNumber.value}
                    onChange={(e) => {
                        changeInput(e.target.value, "phoneNumber");
                    }}
                />
            </label>
            {form.phoneNumber.error && <div className="error">{form.phoneNumber.error}</div>}
        </div>
        <div className="mb-3">
            <div>Address</div>
            <label htmlFor="address">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={form.address.value}
                    onChange={(e) => {
                        changeInput(e.target.value, "address");
                    }}
                />
            </label>
            {form.address.error && <div className="error">{form.address.error}</div>}
        </div>
        <div className="mb-3">
            <div>City</div>
            <label htmlFor="city">
                <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    value={form.city.value}
                    onChange={(e) => {
                        changeInput(e.target.value, "city");
                    }}
                />
            </label>
            {form.city.error && <div className="error">{form.city.error}</div>}
        </div>
        <div className="mb-3">
            <div>Training category</div>
            <select  id="training-category" onChange={
                    (e) => {
                        
                        changeInput(e.target.value, 'trainingCategory');
                    }
                }>
                    <option value= "">Select training category</option>
                    <option value= "A">A</option>
                    <option value= "A1">A1</option>
                    <option value= "B">B</option>
                    <option value= "BE">BE</option>
                    <option value= "C">C</option>
                    <option value= "CE">CE</option>
                    <option value= "D">D</option>
                    <option value= "M">M</option>
                </select>
            {form.trainingCategory.error && <div className="error">{form.trainingCategory.error}</div>}
        </div>

      <div className='button-wrapper'>
        <button type="submit" >
          Save
        </button>
      </div>
    </form>
  );
};