import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Apartment from './apartment'

export default function AddApartment( { user, setApartment, apartment, handleApartment } ) {
  console.log(user)

  const [reviews, setReviews]= useState('')


  const navigate = useNavigate("")
  function handleClick() {
    navigate('/apartmentform')
  }

  function handleUnitClick() {
    navigate('/unitform')
  }
  return (
    <div className="myapartment">



      <h3 className=' text-2xl underline-offset-4 my-4 underline' style={{fontFamily:"Montserrat"}} onClick={handleClick}>Add apartment <i class="fa-solid fa-arrow-right-from-bracket"></i></h3>


      <div className="flex flex-row gap-8 flex-wrap">

          {/* added ? just before user, remove it when necessary */}
          {user?.apartments?.map(apartment => (
            <Apartment apartment={apartment} handleApartment={handleApartment} setApartment={setApartment} />

          ))}
          {/* {posts?.map(post => <Card details={post}/>)} */}


      </div>
    </div>
  )
}