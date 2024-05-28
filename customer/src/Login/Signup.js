import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Signup() {
    const [values, setValues] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})


    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        console.log(values);

        if(errors.name === "" && errors.phone === "" && errors.email === "" && errors.password === "") {
            axios
            .post("http://localhost:8800/signup", {
              name: values.name.toString(),
              phone: values.phone.toString(), 
              gmail: values.email.toString(),
              password: values.password.toString()
            })
            .then(res => {
                alert("Create account successfully")
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'  style={{ backgroundColor: '#E8F1E8' }}>
        <div className='p-3 rounded w-25'  style={{ backgroundColor: '#E8F1E8' }}>
            <h2>Sign up</h2>
            <form action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type="text" placeholder='Enter Name' name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='phone'><strong>Phone number</strong></label>
                    <input type="text" placeholder='Enter Phone number' name='phone' 
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.phone && <span className='text-danger'> {errors.phone}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>                
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <button type="submit" className='btn btn-success w-100 rounded-0'>Sign up</button>
                <p>You are agree to our terms and policies</p>
                <Link to ="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>
            </form>
        </div>
    </div>
  )
}

function Validation(values) {
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^.{5,}$/

    if(values.name === "") {
        error.name = "Name should not be empty"
    }
    else {
        error.name = ""
    }

    if (values.phone === "") {
        error.phone = "Phone number should not be empty";
    } else if (isNaN(values.phone)) {
        error.phone = "Phone number should be a valid number";
    } else {
        error.phone = "";
    }    


    if(values.email === "") {
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)) {
        error.email = "Email didn't match"
    } else {
        error.email = ""
    }

    if(values.password === "") {
        error.password = "Password should not be empty"
    }
    else if(!password_pattern.test(values.password)) {
        error.password = "Password didn't match"
    }
    else {
        error.password = ""
    }

    return error;
}


export default Signup;