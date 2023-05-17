import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../shared/SearchBar';
import CommonSection from '../../shared/CommonSection';
import { Row, Container } from 'reactstrap';
import './admin.css'

const Admin = () => {

    const [tourData,setTourData]=useState([]);
    const [click, setClick] = useState(false)

  useEffect(
    ()=>{
      axios.get('http://127.0.0.1:8000/Apiv1/Alltour')
      .then(response => {
          // Lưu dữ liệu trả về vào state
          setTourData(response.data);
          console.log(tourData);
      })
      .catch(error => {
          console.log(error);
      });
    },[click]
  )
  
  const cc = (idx) => {
    var tokenn = localStorage.getItem('token')
    axios.delete('http://127.0.0.1:8000/Apiv1/delete/'+idx,{
        headers: {
          'Authorization': 'Bearer '+ tokenn
        }
      })
      .then((response) => {
        setClick(!click)
        // console.log(response);
        // alert('Data deleted successfully.');
      })
      .catch((error) => {
        // console.log(error);
        // alert('Error deleting data.');
      });
  }

  const update = () => {
    var id = document.getElementById('id').value
    var name = document.getElementById('Tourname').value
    var destination = document.getElementById('Tourdestination').value
    var tourprice = document.getElementById('Tourprice').value
    var distance = document.getElementById('Distance').value
    var address = document.getElementById('Address').value
    var desc = document.getElementById('Desc').value
    var photo = document.getElementById('Photo');
    var featured = document.getElementById('Featured').value

    var tokenn = localStorage.getItem('token')
     
    // Lấy đối tượng input chứa hình ảnh

    const formData = new FormData();
    formData.append('id',id);
    formData.append('tourname',name);
    formData.append('tourdestination',destination);
    formData.append('tourprice',tourprice);
    formData.append('distance',distance);
    formData.append('address',address);
    formData.append('desc',desc);
    formData.append('photo',photo.files[0]);
    formData.append('featured',featured)


        
        axios.put('http://127.0.0.1:8000/Apiv1/delete/'+id,formData,{
            headers: {
              'Authorization': 'Bearer '+ tokenn
            }
    
          })
          .then((response) => {
            setClick(!click)
            // console.log(response);
            // alert('Data deleted successfully.');
          })
          .catch((error) => {
            // console.log(error);
            // alert('Error deleting data.');
          });
  
   
  }

  const newtour = () => {
    var name = document.getElementById('Tourname').value
    var destination = document.getElementById('Tourdestination').value
    var tourprice = document.getElementById('Tourprice').value
    var distance = document.getElementById('Distance').value
    var address = document.getElementById('Address').value
    var desc = document.getElementById('Desc').value
    var photo = document.getElementById('Photo');
    var featured = document.getElementById('Featured').value

    var tokenn = localStorage.getItem('token')
     
    const formData = new FormData();
    formData.append('tourname',name);
    formData.append('tourdestination',destination);
    formData.append('tourprice',tourprice);
    formData.append('distance',distance);
    formData.append('address',address);
    formData.append('desc',desc);
    formData.append('photo',photo.files[0]);
    formData.append('featured',featured)
   
  
     
        axios.put('http://127.0.0.1:8000/Apiv1/new',formData,{
            headers: {
              'Authorization': 'Bearer '+ tokenn
            }
    
          })
          .then((response) => {
            setClick(!click)
            // console.log(response);
            // alert('Data deleted successfully.');
          })
          .catch((error) => {
            // console.log(error);
            // alert('Error deleting data.');
          });
   
  }

  return (
    <>
        <CommonSection title={"All Tours"} />

        <section>
            <Container>
                <Row>
                    <SearchBar />
                </Row>
            </Container>
        </section>

        <div className='update_new'>
          <div className='nhapDL'>
            <input id='id' className='nhapDL_input' type="id" placeholder='id' />
            <input id='Tourname' className='nhapDL_input' type="text" placeholder='Tourname' />
            <input id='Tourdestination' className='nhapDL_input' type="text" placeholder='Tourdestination' />
            <input id='Tourprice' className='nhapDL_input' type="number" placeholder='Tourprice' />
            <input id='Distance' className='nhapDL_input' type="number" placeholder='Distance' />
            <input id='Address' className='nhapDL_input' type="text" placeholder='Address' />
            <input id='Desc' className='nhapDL_input' type="text" placeholder='Desc' />
           
            <input id ="Photo" type="file" accept='image/*' />
            <input id='Featured' className='nhapDL_input' type="number" placeholder='Featured' />
          </div>

          <div className='nut'>
            <button onClick={() => update()} className='update'>Update</button>
            <button onClick={() => newtour()} className='new'>New</button>
          </div>
        </div>

        <div className='contai'>
            {tourData.map((tour) =>(
                <div key={tour.id} className='contai_detail'>
                    <img className='img_tour' src={tour.photo}/>
                    <h5 className='tour_id'>TourID: {tour.id}</h5>
                    <ul className='tour_info'>
                        <li className='tour_detail'>Name: {tour.title}</li>
                        <li className='tour_detail'>TourDestination: {tour.city}</li>
                        <li className='tour_detail'>Distance: {tour.distance}</li>
                        <li className='tour_detail'>Address: {tour.address}</li>
                        <li className='tour_detail'>Desc: {tour.desc}</li>
                        <li className='tour_detail'>Featured: {tour.featured}</li>
                        <li className='tour_detail'>TourPrice: {tour.price}</li>
                    </ul>
                    <button onClick={() => cc(tour.id)} className='delete'>Delete</button>
                </div>
            ))}
        </div>
    </>
  )
}

export default Admin