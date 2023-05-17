import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import './booked.css'

const Booked = () => {
  const [tourinfo, setTourInfo] = useState([]);

  useEffect(() => {
    var tokenn = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/Apiv1/info", {
        headers: {
          Authorization: "Bearer " + tokenn,
        },
      })
      .then((response) => {
        setTourInfo(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div id="container">
      <div className="container__content">
        <div className="container__content__optiontitle">
          <h1>Tour đã đặt</h1>
        </div>
        <div className="container__content__optionbody">
          <div className="container__content__optionbody__table">
            <table id="table__productlist">
              <thead>
                <tr>
                  <th>FullName</th>
                  <th>Phone</th>
                  <th>TourName</th>
                  <th>Date</th>
                  <th>Guest</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody id="add">
                {tourinfo.map((tour) => (
                  <tr>
                    <td>{tour.fullname}</td>
                    <td>{tour.phone}</td>
                    <td>{tour.tourname}</td>
                    <td>{tour.date}</td>
                    <td>{tour.guest}</td>
                    <td>{tour.total}</td>
                    <td className="setupproduct">
                      <div className="clear"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="clear"></div>
    </div>
  );
};

export default Booked;
