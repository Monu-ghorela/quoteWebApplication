import { useQuery } from '@apollo/client'
import React from 'react'
import { myprofile } from '../queries/queries'
import { useNavigate } from 'react-router-dom'
export default function Profile() {
    const { loading, data, error } = useQuery(myprofile);
    const naviagate = useNavigate();
    if (loading)
        return (<h3>Profile is loading....</h3>)
    if (!localStorage.getItem("Token")) {
        naviagate('/login');

    }
    return (
        <div className='container my-container'>
            <div className='center-align'> <img className='circle' style={{ border: "2px solid", marginTop: "30px" }} src={`https://robohash.org/${data.user.fname}.png`} alt="pic" />
                <h5>{data.user.fname} {data.user.ltname}</h5>
                <h5>EmailId:{data.user.emailid}</h5>
                <h5>Phone No:{data.user.phoneno}</h5></div>
            <h4>Your Quotes</h4>
            {
                data.user.quotes.map((quote) => {

                    return (

                        <blockquote>
                            <h6>{quote.name}</h6>
                            <p className='right-align'>  ~{data.user.fname}</p>
                        </blockquote>
                    )
                })
            }

        </div>
    )
}
