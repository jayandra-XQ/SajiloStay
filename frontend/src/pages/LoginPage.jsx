import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const LoginPage = () => {

  const [formData, setFormData] = useState({
    email: " ",
    password: "",
  });

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      setUser(res.data);
      toast.success("Login successful!");
      navigate('/');
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error:", error.message);
  };
}

const handleInputChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
}

return (
  <>
    <div className="mt-5 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            name='email'
            onChange={handleInputChange}
            value={formData.email}

          />

          <input
            type="password"
            placeholder="password"
            name='password'
            onChange={handleInputChange}
            value={formData.password}
          />

          <button className="primary">Login</button>

          <div className='text-center py-2 text-gray-500'>
            <span>Don&apos;t have an account?</span>
            <Link className='underline text-black' to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  </>
)
}

export default LoginPage