import React from "react";
import "./changepassword.css";
import axios from "axios";

const ChangePassword = () => {
  const changepassword = () => {
    var oldpassword = document.getElementById("oldpassword").value;
    var newpassword = document.getElementById("newpassword").value;
    var tokenn = localStorage.getItem("token");
    axios
      .post(
        "http://127.0.0.1:8000/Apiv1/changepassword",
        {
            old_password: oldpassword,
            new_password: newpassword
        },
        {
          headers: {
            Authorization: "Bearer " + tokenn,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {});
  };
  return (
    <div className="changepassword">
      <div className="changepassword_input">
        <input
          id="oldpassword"
          className="nhapDL_input"
          type="text"
          placeholder="OldPassword"
        />
        <input
          id="newpassword"
          className="nhapDL_input"
          type="text"
          placeholder="NewPassword"
        />
      </div>
      <button onClick={() => changepassword()}>Save</button>
    </div>
  );
};

export default ChangePassword;
