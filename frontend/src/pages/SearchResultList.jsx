import React from 'react'
import { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'
import '../styles/searchresultlist.css'

import '../styles/tour.css'
import TourCard from '../shared/TourCard'
import Newsletter from '../shared/Newsletter'
// import tourData from '../assets/data/tours'
import { Container, Row, Col } from 'reactstrap'
import {Form, FormGroup} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios';


const SearchResultList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tourData,setTourData]=useState([]);
  const [inputValue, setInputValue] = useState('');
  const [ten, setTen] = useState(true)

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

  useEffect(
    ()=>{
      axios.get('http://127.0.0.1:8000/Apiv1/toursearch/'+window.location.pathname.substring(12))
      .then(response => {
          // Lưu dữ liệu trả về vào state
          setTourData(response.data);
          console.log(tourData);
      })
      .catch(error => {
          console.log(error);
      });
    },[ten]
  )

  useEffect(() => {
    const pages = Math.ceil(5/4)  //leter we will use backend date count
    setPageCount(pages);
  }, [page])

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
          <Col lg='12'>
        <div className="search__bar">
            <Form className="search_form d-flex align-items-center gap-4">
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span><i className='ri-map-pin-line'></i></span>
                    <div>
                        <h6>Điểm Đến</h6>
                        <input onChange={handleInputChange} type='text' placeholder='' required/>
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-fast'>
                    <span><i className='ri-map-pin-time-line'></i></span>
                    <div>
                        <h6>Thành phố</h6>
                        <input type='text' placeholder=''/>
                    </div>
                </FormGroup>
                <FormGroup className='d-flex gap-3 form__group form__group-last'>
                    <span><i className='ri-group-line'></i></span>
                    <div>
                        <h6>Quốc gia</h6>
                        <input type='text' placeholder=''/>
                    </div>
                </FormGroup>

                <span className='search__icon' type='submit'>
                    <Link to={`/toursearch/${inputValue}`} onClick={() => setTen(!ten)}><i className='ri-search-line'></i></Link>
                </span>
            </Form>
        </div>
    </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {
              tourData.map((tour) => (
                <Col lg='3' className='mb-4' key={tour.id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg='12'>
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map(number => (
                    <span key={number} onClick={() => setPage(number)} className={page  === number ? "active__page" : ""}>
                      {number+1}
                    </span>
                  ))}
                </div>
              </Col>
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  )
}

export default SearchResultList