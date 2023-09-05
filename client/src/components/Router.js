import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Profile from './Profile'
import SignUp from './Signup'
import Home from './Home'
import Createquote from './Createquote'
import Otherprofile from './Otherprofile'
import Notfound from './Notfound'

export default function Router() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Login' element={<Login />} />
      <Route path='/Signup' element={<SignUp />} />
      <Route path='/Profile' element={<Profile />} />
      <Route path='/Profile/:userid' element={<Otherprofile />} />

      <Route path='/Createquote' element={<Createquote />} />
      <Route path='*' element={<Notfound />} />






    </Routes>

  )
}
