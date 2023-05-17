import React from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Booking = ({tourData, avgRating}) => {

  const {price, reviews} = tourData
  const navigate = useNavigate()

  const [credentials, setCredentials] = useState({
    userId: '01', //later it will be dynamic
    userEmail: 'example@gmail.com',
    fullName: '',
    phone: '',
    guestSize: 1,
    bookAt: ''
  })

  const handleChange = e =>{
    setCredentials(prev => ({...prev, [e.target.id]:e.target.value}))
  }

  const serviceFee = 10
  const totalAmount = Number(price) * Number(credentials.guestSize) + Number(serviceFee)

  const handleClick = e => {
    e.preventDefault();
    var tok = localStorage.getItem('token') 
    if(tok != null){
      var name = document.getElementById('fullName').value
      var phone = document.getElementById('phone').value
      // var date = document.getElementById('bookAt').value
      var guest = document.getElementById('guestSize').value
      var tourid = window.location.pathname.substring(7)
      var total = totalAmount
      var tokenn = localStorage.getItem('token')
      axios.post('http://127.0.0.1:8000/Apiv1/booking',{
        fullname: name,
        phone: phone,
        guest: guest,
        tourID: tourid,
        totalamount: total,
    },{
        headers: {
          'Authorization': 'Bearer '+ tokenn
        }

      })
      .then((response) => {
      })
      .catch((error) => {
      });
      navigate("/thank-you")
    }else{
      navigate("/login")
    }
  }

  

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} <span>/per person</span></h3>
        <span className='tour__rating d-flex align-items-center'>
          <i className='ri-star-s-fill'></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ================booking form start========= */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder='Full name' id="fullName" required onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <input type="number" placeholder='Phone' id="phone" required onChange={handleChange} />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            {/* <input type="date" placeholder='' id="bookAt" required onChange={handleChange} /> */}
            <input type="number" placeholder='Guest' id="guestSize" required onChange={handleChange} />
          </FormGroup>
        </Form>
      </div>
      {/* ================booking form end========= */}

      {/* ================booking bottom start========= */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>${price}<i className='ri-close-line'></i>1 person</h5>
            <span>${price}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0'>
            <h5>Service charge</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
      </div>
      {/* ================booking bottom end========= */}
    </div>
  )
}

export default Booking