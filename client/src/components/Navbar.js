import React from 'react'
import { Link, useNavigate } from "react-router-dom"
export default function Navbar() {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  return (
    <nav>
      <div className="nav-wrapper #ab47bc purple lighten-1">
        <Link to={'/'} className="brand-logo">Quote</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {
            token ?
              <>
                <li><Link to={'/Profile'}>Profile</Link></li>
                <li><Link to={'/Createquote'}>Create</Link></li> 
               <li> <button className='red btn' onClick={()=>{
                localStorage.removeItem('Token');
                navigate('/Login')
               }}>Log out </button></li>
              </> :
              <>
              <li><Link to={'/Login'}>Login</Link></li>
              <li><Link to={'/Signup'}>Signup</Link></li>
              </>
          }

        </ul>
      </div>
    </nav>

  )
}
