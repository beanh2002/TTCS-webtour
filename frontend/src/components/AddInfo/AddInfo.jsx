import React from "react";
import "./addinfo.css";
import axios from "axios";
const AddInfo = () => {
  const addtt = () => {
    var emailinput = document.getElementById('email').value
    var dobinput = document.getElementById('dob').value
    var tokenn = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/Apiv1/themttnguoidung",
        {
          email: emailinput,
          dob: dobinput
        },
        {
          headers: {
            Authorization: "Bearer " + tokenn,
          },
        }
      )
      .then((response) => {
      })
      .catch((error) => {
      });
  };
  return (
    <div className="addinfo">
      <div className="info_input">
        <input id='email' className='nhapDL_input' type="text" placeholder='Email' />
        <input id='dob' className='nhapDL_input' type="text" placeholder='Dob' />
      </div>
      <button onClick={() => addtt()}>Save</button>
    </div>
  );
};
export default AddInfo;
