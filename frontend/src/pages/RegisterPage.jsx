import { useState } from "react"
import { Link } from "react-router-dom"
import {toast} from 'react-hot-toast'
import axios from "axios";

import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  //set the input to our state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // print the data to the console for testing
    await axios.post('/api/auth/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    })
    .then(res => {
      console.log(res.data);
      toast.success("Registration successful!");    
      navigate('/login'); // redirect to login page after successful registration
    })
    .catch(error => {
      console.log(error.message);
      toast.error("Registration failed. Please try again.");    })
  }

  return (
    <>
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input 
          type="text" 
          placeholder="John Doe"
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          />
          <input
            type="email"
            placeholder="your@email.com"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />

          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
          />

          <button className="primary">Register</button>

          <div className='text-center py-2 text-gray-500'>
            <span>Already a member?</span>
            <Link className='underline text-black' to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  </>
  )
}

export default RegisterPage