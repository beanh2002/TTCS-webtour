import React from 'react'
import TourCard from '../../shared/TourCard'
// import tourData from '../../assets/data/tours'
import {Col} from 'reactstrap'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
const FeaturedTourList = () => {

  const [tourData,setTourData]=useState([]);
  useEffect(
    ()=>{
      axios.get('http://127.0.0.1:8000/Apiv1/hottour')
      .then(response => {
          // Lưu dữ liệu trả về vào state
          setTourData(response.data);
          console.log(tourData);
      })
      .catch(error => {
          console.log(error);
      });
    },[]
  )
  return (
    <>
        {
            tourData.map(tour =>(
                <Col lg='3' className='mb-4' key={tour.id}>
                    <TourCard tour={tour} />
                </Col>
            ))}
    </>
  )
}

export default FeaturedTourList