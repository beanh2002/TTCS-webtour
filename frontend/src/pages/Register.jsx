import React from 'react'
import {Container, Row, Col, Form,FormGroup, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../styles/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import registerImg from '../assets/images/register.png'
import userIcon from '../assets/images/user.png'


const Register = () => {

  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined
  })

  const [name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/Apiv1/signup', {
        username: name,
        password: Password
      });
      localStorage.setItem('token',response.data['access__token']);
      navigate('/home');
    } catch (error) {
      // console.error(error);
      alert("Tài khoản hoặc mật khẩu không tồn tại")
      // Handle the error
    }
  };

  const handleClick = e =>{
    e.preventDefault()
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-conten-between">
              <div className="login__img">
                <img src={registerImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input type="text" placeholder='Username' required id='username' onChange={(e) => setName(e.target.value)} />
                  </FormGroup>

                  {/* <FormGroup>
                    <input type="email" placeholder='Email' required id='email' onChange={(e) => setEmail(e.target.value)} />
                  </FormGroup> */}

                  <FormGroup>
                  <input type="password" placeholder='Password' required id='password' onChange={(e) => setPassword(e.target.value)} />
                  </FormGroup>

                  <Button onClick={handleSubmit} className='btn secondary__btn auth__btn' type='submit'>
                    Create Account
                  </Button>
                </Form>

                <p>Already have an account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Register