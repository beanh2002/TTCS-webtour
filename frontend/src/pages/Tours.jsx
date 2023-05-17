import React from 'react'
import { useState, useEffect } from 'react'
import CommonSection from '../shared/CommonSection'

import '../styles/tour.css'
import TourCard from '../shared/TourCard'
import SearchBar from '../shared/SearchBar'
import Newsletter from '../shared/Newsletter'
// import tourData from '../assets/data/tours'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios';
const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [tourData,setTourData]=useState([]);
  useEffect(
    ()=>{
      axios.get('http://127.0.0.1:8000/Apiv1/Alltour')
      .then(response => {
          // Lưu dữ liệu trả về vào state
          setTourData(response.data);
      })
      .catch(error => {
      });
    },[]
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
            <SearchBar />
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

export default Tours