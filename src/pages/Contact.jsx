import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { send_mail } from "../api/bookCars";

import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];


const Contact = () => {

// const [first, setfirst] = useState(second);
const [formData, setFormData] = useState({
  name: "",
  email: "",
  msg: "",

});
const handlesubmit=async(e)=>{
    e.preventDefault()
    try {
      const resp=await send_mail(formData)
      console.log(resp.data)
      setFormData({
        name: "",
        email: "",
        msg: "",
      
      })
      
    } catch (error) {
      console.log(error)
    }

}
const handleChange=(e)=>{
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
  console.log(formData.msg)
}
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" onChange={handleChange} value={formData.name} name="name" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" onChange={handleChange} value={formData.email} name="email"
                  type="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    name="msg"
                    rows="5"
                    value={formData.msg}
                    onChange={handleChange}
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" onSubmit={handlesubmit} onClick={handlesubmit} type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  688, Dr Rajkumar Rd, 5 Block, 6th Block, Rajajinagar,
                  Bengaluru, Karnataka 560010
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+91-7660885733</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">example@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
