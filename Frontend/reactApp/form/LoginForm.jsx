import React, { useEffect, useState } from 'react'

import { request } from '../src/jwt/axios_helper';

const logURL = "/users/signIn";
const regURL = "/creators/signUp";

export default function LoginForm() {

    const[showPassword,setShowPassword] = useState(false);

    const[forms,setForms] = useState({
        // firstName:"",
        // lastName:"",
        email:"",
        password:"",
    });

    useEffect(()=>{
        
    },[]);

    // "email": "luca.ortega.creator4@example.com",
    // "password": "L0uca!Art"
    const handleLogin = async()=>{
        request("POST",logURL,{
            email:forms.email,
            password:forms.password,
        })
        .then((res)=>{
            console.log("User details: ",res.data);
            alert("Login succesfull..");
        })
        .catch((err)=>{
            console.log(err);
            alert("Login failed..");
        })
    }

    return (
        <>
        <div>
        {/* <h4>LoginForm</h4> */}

        <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
            <li class="nav-item">
                <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
            </ul>
        </div>
        <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>

        <form>
            <input type='email'  autoComplete="username" placeholder='username' value={forms.email} onChange={
                (e)=>{
                    setForms({...forms,email:e.target.value});
                }
            }/><br/>
            <input type={showPassword ? "text" : "password"}  autoComplete="current-password" placeholder='password' value={forms.password} onChange={
                (e)=>{
                    setForms({...forms,password:e.target.value});
                }
            }/>
            <button type='button' onClick={()=>setShowPassword(!showPassword)}>{ showPassword? "hide" : "show"}</button><br/>
            <button type='button' onClick={handleLogin}>Login</button>
        </form>
        </div>
        </>
    )
}
