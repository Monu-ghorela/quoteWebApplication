import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { getuser } from '../queries/mutation';

export default function SignUp() {
    const [formdata, setdata] = useState({});
    const [signupuser, { data, loading, error }] = useMutation(getuser);

    if (loading) {
        return <h1 className='red'>Loading....</h1>
    }
  
    function handlechange(e) {
        setdata({
            ...formdata,
            [e.target.name]: e.target.value


        })
    }
    function handlesubmit(e) {
        e.preventDefault();
     
        signupuser({
            variables: {
                usernew: formdata
            }
        })
    }
    return (
        <div className='container'>
            {
                error &&
                <div className='red card-panel'>{error.message}</div>
            }
            {
                data && data.systemsignup &&
                <div className='green card-panel'>{data.systemsignup.fname} is succesfully signedup u can log in now  </div>
            }
            <h5>SignUP  Here</h5>
            <form action="" onSubmit={(e) => handlesubmit(e)}>
                <input
                    type="text"
                    placeholder='Fill Out  Your First tName'
                    required
                    name='fname'
                    onChange={(e) => handlechange(e)}


                />
                <input
                    type="text"
                    placeholder='Fill Out  Your Last tName'
                    required
                    name='ltname'
                    onChange={(e) => handlechange(e)}


                />
                <input
                    type="text"
                    placeholder='Fill Out  Your Phone No.'
                    required
                    name='phoneno'
                    onChange={(e) => handlechange(e)}

                />
                <input
                    type="text"
                    placeholder='Fill Out  Your Address'
                    required
                    name='address'
                    onChange={(e) => handlechange(e)}

                />
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
                <button className='btn #ab47bc purple lighten-1' type='submit'>Sign Up</button>

            </form>
        </div>
    )
}