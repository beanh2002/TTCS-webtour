import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './account.css'
import AddInfo from '../components/AddInfo/AddInfo'
import ChangePassword from '../components/ChangePassword/ChangePassword'

const Account = () => {

    const [infouser, setInfo] = useState([])
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    useEffect(
        ()=>{
            var tokenn = localStorage.getItem('token')
            axios.get('http://127.0.0.1:8000/Apiv1/nguoidung',{
                headers: {
                'Authorization': 'Bearer '+ tokenn
            }

            })
            .then((response) => {
                setInfo(response.data)
            })
            .catch((error) => {
            })},[]
      )

      const {username, useremail, userdob} = infouser

  return (
    <div className='infouser'>
        <ul className='inforuser_list'>
            <li className='inforuser_item'>UserName: {username}</li>
            <li className='inforuser_item'>UserEmail:{useremail}</li>
            <li className='inforuser_item'>UserDob: {userdob}</li>
        </ul>
        <div className='user_button'>
        <button className='primary__btn' onClick={() => setShow(!show)}>Add Information</button> {show && <AddInfo/>}
        <button className='primary__btn' onClick={() => setShow1(!show1)}>Change Password</button> {show1 && <ChangePassword/>}
        </div>
    </div>
  )
}

export default Account