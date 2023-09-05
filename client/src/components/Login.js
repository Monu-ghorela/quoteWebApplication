import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { loginuser } from '../queries/mutation'; 
import {useNavigate} from "react-router-dom"

export default function Login() {
    // const [email,setemail]=useState("");
    // const [password,setpassword]=useState("");
    const [formdata, setdata] = useState({});
    const naviagate=useNavigate();
    const [sighinuser, { data, loading, error }] = useMutation(loginuser);
    if (loading) {
        return <h1 className='red'>Loading....</h1>
    }
    if(data)
    {
        localStorage.setItem("Token",data.systemsignin.token);
        naviagate('/')
    }
    function handlechange(e) {
        setdata({
            ...formdata,
            [e.target.name]: e.target.value


        })
    }
    function handlesubmit(e) {
        e.preventDefault();
      
        sighinuser({
            variables: {
                user: formdata
            }
        })
    }
    return (
        <div className='container my-container'>
              {
                error &&
                <div className='red card-panel'>{error.message}</div>
            }
            {
                data && data.systemsignin &&
                <h1>welcome {data.systemsignin.token}</h1>

            }
            <h5>Lgin Here</h5>
            <form action="" onSubmit={(e) => handlesubmit(e)}>
                <input
                    type="email"
                    placeholder='Fill Out  Your Email Id'
                    required
                    name='emailid'
                    onChange={(e) => handlechange(e)}

                />

                <input
                    type="password"
                    placeholder='Fil Your Password'
                    required
                    name='password'

                    onChange={(e) => handlechange(e)}


                />
                <button className='btn #ab47bc purple lighten-1' type='submit'>Login</button>

            </form>
        </div>
    )
}