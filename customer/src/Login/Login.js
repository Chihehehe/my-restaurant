import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios'


function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if(errors.email === "" && errors.password === "") {
            axios.post("http://localhost:8800/login", {
                gmail: values.email,
                password: values.password.toString(), // Convert password to string
              })
            .then(res => {
                if(res.data.status === "Success") {
                    const userId = res.data.userId;
                    navigate(`/${userId}`);
                } else {
                    alert("No record existed");
                    console.log(values)
                }
            })
            .catch(err => console.log(err));
        }
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{ backgroundColor: '#E8F1E8' }}>
        <div className='p-3 rounded w-25' style={{ backgroundColor: '#E8F1E8' }}>
            <h2>Log in to Eatme-Feedme</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0' style={{ border: '1px solid #ced4da' }}/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <button className='btn btn-success'>Log in</button>
                <p>You are agree to our terms and policies</p>
                <Link to ="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login