import React, { useRef, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useData } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "../../styles/header.css";
import logo from "../../assets/all-images/OTM_LOGO LONG.png";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },

  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const nav =useNavigate()
  const menuRef = useRef(null);
  const { updateData, user } = useData();

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const [openModal, setOpenModal] = useState(false);

  const handleLogout = () => {
    nav('/home')
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    user !== "admin" ? <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +91-7660885733
                </span>
              </div>
            </Col>
            {user ? (
              <Col lg="6" md="6" sm="6">
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
          
                  <Link
                    to="#"
                    
                    className=" d-flex align-items-center gap-1"
                   
                  >
                    <i class="ri-user-line"></i> {user}
                  </Link>
                  <Link
                    to="/home"
                    className=" d-flex align-items-center gap-1"
                    onClick={handleLogout}
                  >
                    <i class="ri-user-line"></i> Logout
                  </Link>
                </div>
              </Col>
            ) : (
              <Col lg="6" md="6" sm="6">
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <Link
                    to="/home"
                    className=" d-flex align-items-center gap-1 "
                    onClick={() => updateData(true)
                    
                    }
                  
                  >
                    <i class="ri-login-circle-line"></i> Login
                  </Link>

                  <Link  onClick={() => updateData(true)} to="/home" className=" d-flex align-items-center gap-1">
                    
                    <i class="ri-user-line"></i> Register
                  </Link>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col className="logocol" lg="4" md="3" sm="4">
              <div className="logo">
                {/* <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      OnTheMove <br /> Cars
                    </span>
                  </Link>
                </h1> */}
                <img src={logo} alt="" height={250} width={250} className="imgpic" />
              </div>
            </Col>

            <Col lg="3" className="textheadermiddle" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Bengaluru</h4>
                  <h6>6th Block, Rajajinagar</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" className="textheadermiddle" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Sunday </h4>
                  <h6>6am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
            
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className=" header__btn btn ">
                <Link  className="textheadermiddle" to="/contact">
                  <i className=" ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
          
                ))}
                       
              </div>
            </div>

            {/* <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div> */}
          </div>
        </Container>
      </div>
    </header>: 
              <Col className="float-right" lg="6" md="6" sm="6">
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
          
                  <Link
                    to="#"
                    style={{"color":"black"}}
                    className=" d-flex align-items-center gap-1"
                   
                  >
                    <i className="ri-user-line btn "></i> {user}
                  </Link>
                  <Link
                    to="/home"
                    
                    className="btn btn-primary d-flex align-items-center gap-1"
                    onClick={handleLogout}
                  >
                    <i class="ri-user-line"></i> Logout
                  </Link>
                </div>
              </Col>
  )
};

export default Header;
