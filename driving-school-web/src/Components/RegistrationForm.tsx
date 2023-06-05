import {useForm, SubmitHandler} from 'react-hook-form';
import "../Styles/RegistrationForm.scss";


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

type RegistrationFormProps = {
  onSave: (data: Inputs) => void;
};



export const RegistrationForm = ({onSave}: RegistrationFormProps) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => {data.dateOfRegistration = new Date();  onSave(data); reset()};

  return (
    <form className = "form-group" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='name'>First Name</label>
      <input {...register("name", {required: "Name is required", maxLength: 80})} id='name'/>
      {errors.name && <p role="alert">{errors.name?.message}</p>}
      <label htmlFor='lastName'>Last Name</label>
      <input {...register("lastName", {required: "Last Name is required", maxLength: 100})} id='lastName'/>
      {errors.lastName && <p role="alert">{errors.lastName?.message}</p>}
      <label htmlFor='email'>Email</label>
      <input {...register("email", {required: "Incorrect email", pattern: /^\S+@\S+$/i})} id='email'/>
      {errors.email && <p role="alert">{errors.email?.message}</p>}
      <label htmlFor='phoneNumber'>Phone Number</label>
      <input {...register("phoneNumber", {required: "Incorrect phone number", pattern: /^\d+$/g, minLength: 6, maxLength: 12})} id='phoneNumber'/>
      {errors.phoneNumber && <p role="alert">{errors.phoneNumber?.message}</p>}
      <label htmlFor='trainingCategory'>Training Category</label>
      <select {...register("trainingCategory", {required: true})} id='trainingCategory'>
        <option value="A">A</option>
        <option value="A1">A1</option>
        <option value="B">B</option>
        <option value="BE">BE</option>
        <option value="C">C</option>
        <option value="CE">CE</option>
        <option value="D">D</option>
        <option value="M">M</option>
      </select>
      <label htmlFor='city'>City</label>
      <input {...register("city", {required: "City is required"})} id='city'/>
      {errors.city && <p role="alert">{errors.city?.message}</p>}
      <label htmlFor='adress'>Address</label>
      <input {...register("address", {required: "Adress is required"})} id='adress'/>
      {errors.address && <p role="alert">{errors.address?.message}</p>}
      <label htmlFor='yearOfBirth'>Year of Birth</label>
      <input {...register("yearOfBirth", {required: "Incorrect yearOfBirth", pattern: /^\d+$/g, minLength: 4, maxLength:4})} id='yearOfBirth'/>
      {errors.yearOfBirth && <p role="alert">{errors.yearOfBirth?.message}</p>}
      <input type="submit" />
    </form>
  );
}