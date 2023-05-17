import React from 'react'
import {Container, Row, Button} from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'
import { useRef, useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import './header.css'

const nav__links=[
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
]

const Header = () => {

  const headerRef = useRef(null)

  const stickyHeaderFunc = () =>{
    window.addEventListener('scroll', () =>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky_header')
      }else{
        headerRef.current.classList.remove('sticky_header')
      }
    })
  }

  const[click, setClick] = useState(false)
  const handleClick = () =>setClick(!click)
  const closeMobileMenu = () => setClick(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [check, setCheck] = useState(false)

  useEffect(() => {
    stickyHeaderFunc()

    return window.removeEventListener('scroll', stickyHeaderFunc)
  })

  const location = useLocation();

  useEffect(() => {
    if(localStorage.getItem('token')){
      setIsLoggedIn(true)
    }
  }, [location]);

  const logout = () =>{
    localStorage.removeItem('token');
    setIsLoggedIn(false)
  }

  return (
    <header className="header" ref={headerRef}>
       <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            {/* ============logo============ */}
            <div className="logo">
              <img src={logo} alt=''/>
            </div>
            {/* ============logo end======== */}

            {/* ============menu start======== */}

            <div className='menu-icon' onClick={handleClick}>  
                  <i className={click ? 'ri-close-fill' : 'ri-menu-line'}/>
              </div>
            <div className="navigation">
              <ul className={click ? "nav-menu active" : "menu d-flex align-items-center gap-5"}>
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path} className="active__link" onClick={closeMobileMenu}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            {/* ============menu end======== */}

            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                <Button className='btn secondary__btn'>{isLoggedIn === false ? <Link to='/login'>Login</Link> : <Link to='/account'><i className="ri-account-circle-line">Account</i></Link>}</Button>
                <Button className='btn secondary__btn'>{isLoggedIn === false ? <Link to='/register'>Register</Link>: <Link to='/home'><button className='logout' onClick={() => logout()}>Log out</button></Link>}</Button>
              </div>

              <span className="mobile__menu">
                <i className='ri-menu-line'/>
              </span>
            </div>
          </div>
        </Row>
       </Container>
    </header>
  )
}

export default Header