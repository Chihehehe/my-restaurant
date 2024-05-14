"use client"
import React, { useState } from 'react'
import { container, header, text, inputs, input, icon, forgot_password, remember_forget, button_continue, submit_container, button_gray, submit } from '@/styles/LoginSignup.module.css'
import { FaUser, FaLock, FaPhoneAlt } from "react-icons/fa";

export const LoginSignup = () => {

    const [action, setAction] = useState("Login");

    return (
        <div className={container}>
            <div className={header}>
                <div className={text}>{action}</div>
            </div>
            <div className={inputs}>
                {action === "Login" ? <div></div> : <div className={input}>
                    <FaUser className={icon} />
                    <input type="text" placeholder='Username' required />
                </div>
                }
                <div className={input}>
                    <FaPhoneAlt className={icon} />
                    <input type="phone" placeholder='Phone number' required />
                </div>
                <div className={input}>
                    <FaLock className={icon} />
                    <input type="password" placeholder='Password' required />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className={forgot_password}>
                <label><input type="checkbox" /> Remember me </label>
                <a href="#">Forget password?</a>
            </div>
            }
            {action === "Login" ? <div></div> : <div className={remember_forget}>
                <label><input type="checkbox" /> I agree to the terms and conditions. </label>
            </div>
            }
            <div>
                <button className={button_continue}>Continue</button>
            </div>
            <div className={submit_container}>
                <div className={action === "Login" ? button_gray : submit} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? button_gray : submit} onClick={() => { setAction("Login") }}>Login</div>
            </div>
        </div >
    )
};

export default LoginSignup;

