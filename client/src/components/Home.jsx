import React from 'react'
import image from '../images/1.png'
import Navbar from '../Navbar.jsx'
const Home = () => {
  return (
    <><Navbar /><div className='h'>
          <div className='cont'>
              Elevate your coding journey! Build your profile, save favorite problems, and stay updated on contests and top coding challenges shared by the community
          </div>
          <div className='pic'>
              <img src={image} alt="hey" />
          </div>
      </div></>
    
  )
}

export default Home
