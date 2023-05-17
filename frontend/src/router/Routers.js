import React from 'react'
import {Routes, Route , Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import ThankYou from '../pages/ThankYou'
import Admin from '../components/Admin/Admin'
import Account from '../pages/Account'

const Routers = () => {
  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home />}/>
        <Route path='/tours' element={<Tours />}/>
        <Route path='/tours/:id' element={<TourDetails />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/thank-you' element={<ThankYou />}/>
        <Route path='/toursearch/:ten' element={<SearchResultList />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/account' element={<Account />} />
    </Routes>
  )
}

export default Routers