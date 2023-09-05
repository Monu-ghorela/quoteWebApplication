import React from 'react'
import { getallquotes } from "../queries/queries"
import { useQuery } from "@apollo/client"
import { Link } from 'react-router-dom';
export default function Home() {
  const { loading, error, data } = useQuery(getallquotes);
  if (loading)
    return <h1>loading</h1>
  if (error) {
    console.log(error.message);
  }
  if(data.quotes.length==0)
  {
    return(<h2>No quotes are available</h2>)
  }
  return (
    <div className='container my-container'>
      {
        data.quotes.map(quote=>{
          return( <blockquote>
            <h6>{quote.name}</h6>
            <Link to={`Profile/${quote.by.id}`}><p className='right-align'>  ~{quote.by.fname}</p></Link>
          </blockquote>)
        })
      }
     
     
    </div>
  )
}
