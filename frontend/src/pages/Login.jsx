import React from 'react'
import {Container, Row, Col, Form,FormGroup, Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import '../styles/login.css'
import { useState } from 'react'
import axios from 'axios'
import loginImg from '../assets/images/login.png'
import userIcon from '../assets/images/user.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [credentials, setCredentials] = useState({
     email: undefined,
     password: undefined
  })

  const handleClick = e =>{
    e.preventDefault()
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleemail = e =>{
    setEmail(e.target.value);
  }

  const handlepassword = e =>{
    setPassword(e.target.value);
  }

  const navigate = useNavigate();
  const [role, setRole] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/Apiv1/login', {
        username: email, password
      });

      // console.log(response.data);
      localStorage.setItem('token',response.data['access__token']);
      var tokenn = localStorage.getItem('token')
      axios.get('http://127.0.0.1:8000/Apiv1/giaima',{
        headers: {
          'Authorization': 'Bearer '+ tokenn
        }
      })
      .then(response =>{
        setRole(response.data)
        console.log(response.data);
        if(response.data.Roles.includes("admin")){
          navigate('/admin')
        }
      })
      navigate('/home');
    } catch (error) {
      // console.error(error);
      alert("Tài khoản hoặc mật khẩu không tồn tại")
      // Handle the error
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-conten-between">
              <div className="login__img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>

                <div onSubmit={handleClick}>
                  <FormGroup>
                    <input type="email" placeholder='username' required id='email' onChange={handleemail} />
                  </FormGroup>

                  <FormGroup>
                  <input type="password" placeholder='Password' required id='password' onChange={handlepassword} />
                  </FormGroup>

                  <Button className='btn secondary__btn auth__btn' type='submit' onClick={handleSubmit}>
                    Login
                  </Button>
                </div>

                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login