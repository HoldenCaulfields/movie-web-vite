import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import './App.css'
import Search from './pages/Search'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className="text-center bg-gray-900">
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        <Footer />
      </div>
    </>
  )
}

export default App
