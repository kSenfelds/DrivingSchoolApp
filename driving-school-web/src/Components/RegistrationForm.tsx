import {useForm, SubmitHandler} from 'react-hook-form';
import "../Styles/RegistrationForm.scss";
import { AddStudent } from '../api';

type Inputs = {
  name: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  trainingCategory: string,
  city: string,
  address: string,
  yearOfBirth: number,
  dateOfRegistration: Date,
};

export const RegistrationForm = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {data.dateOfRegistration = new Date(); console.log(data); AddStudent(data)}

  return (
    <form className = "form-group" onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input {...register("name", {required: "Name is required", maxLength: 80})}/>
      {errors.name && <p role="alert">{errors.name?.message}</p>}
      <label>Last Name</label>
      <input {...register("lastName", {required: "Last Name is required", maxLength: 100})} />
      {errors.lastName && <p role="alert">{errors.lastName?.message}</p>}
      <label>Email</label>
      <input {...register("email", {required: "Incorrect email", pattern: /^\S+@\S+$/i})} />
      {errors.email && <p role="alert">{errors.email?.message}</p>}
      <label>Phone Number</label>
      <input {...register("phoneNumber", {required: "Incorrect phone number", pattern: /^\d+$/g, minLength: 6, maxLength: 12})} />
      {errors.phoneNumber && <p role="alert">{errors.phoneNumber?.message}</p>}
      <label>Training Category</label>
      <select {...register("trainingCategory", {required: true})}>
        <option value="A">A</option>
        <option value="A1">A1</option>
        <option value="B">B</option>
        <option value="BE">BE</option>
        <option value="C">C</option>
        <option value="CE">CE</option>
        <option value="D">D</option>
        <option value="M">M</option>
      </select>
      <label>City</label>
      <input {...register("city", {required: "City is required"})} />
      {errors.city && <p role="alert">{errors.city?.message}</p>}
      <label>Address</label>
      <input {...register("address", {required: "Adress is required"})} />
      {errors.address && <p role="alert">{errors.address?.message}</p>}
      <label>Year of Birth</label>
      <input {...register("yearOfBirth", {required: "Incorrect yearOfBirth", pattern: /^\d+$/g, minLength: 4, maxLength:4})} />
      {errors.yearOfBirth && <p role="alert">{errors.yearOfBirth?.message}</p>}
      <input type="submit" />
    </form>
  );
}