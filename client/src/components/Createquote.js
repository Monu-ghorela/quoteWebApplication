import { useMutation } from '@apollo/client';
import React,{useState} from 'react'
import { createQuote } from '../queries/mutation'; 
import { getallquotes, myprofile } from '../queries/queries';


export default function Createquote() {
    const [CreateQuote,{data,loading,error}]=useMutation(createQuote,{
        refetchQueries:[
            getallquotes,
            "quotes",
            myprofile
        ]
    });

    const [quote,setquote]=useState('');
    if(loading)
    {
        return(<h1>Loading.....</h1>)
    }
    
    
    function handlechange(e)
    {
        setquote(e.target.value);
    }
    function handlesubmit(e) {
        e.preventDefault();
        CreateQuote(
            {
            variables:{
               name:quote 
            }
        })
    }
    return (
        <div className='container my-container'>
            <h5>Quote</h5>
            {
                data &&
                <h4 className='green'>Quote Saved Successfully</h4>
            }
            {
                error &&
                <h4 className='red'>{error.message}</h4>
            }
            <form action="" onSubmit={(e) => handlesubmit(e)}>
               
              
                <input
                    type="text"
                    placeholder='create a Quote'
                    required
                    name='quote'

                    onChange={(e)=>handlechange(e)}


                />
                <button className='btn #ab47bc purple lighten-1' type='submit'>Submit</button>

            </form>
        </div>
    )
    }