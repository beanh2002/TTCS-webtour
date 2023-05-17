import React from 'react'
import './search-bar.css'
import {Col,Form, FormGroup} from 'reactstrap'
import {Link} from 'react-router-dom'
import { useState} from 'react'



const SearchBar = () => {

    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };


  return (
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
                    <Link to={`/toursearch/${inputValue}`}><i className='ri-search-line'></i></Link>
                </span>
            </Form>
        </div>
    </Col>
  )
}

export default SearchBar