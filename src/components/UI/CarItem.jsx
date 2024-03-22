import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import { useData } from "../../context/DataContext";
import {useNavigate, useParams } from "react-router-dom";
const CarItem = (props) => {
  const nav=useNavigate()
  const { updateEditForm } = useData();
  const handleedit = (regno) => {
    updateEditForm(regno);
  };

  const { user } = useData();
  const { imgUrl, model, regno, carName, automatic, speed, price } = props.item;
  const{SaveIndividualCars}=useData()




  const newPage=()=>{
    SaveIndividualCars(props)




    nav(`/cars/${regno}`)

    // const singleCarItem = carData.find((item) => item.carName === slug);
  }

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={imgUrl} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{carName}</h4>
          <h6 className="rent__price text-center mt-">
            ₹{price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            {/* <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span> */}
            <span className=" d-flex align-items-center gap-1">
             Automatic : {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              mileage : {speed}
            </span>
          </div>

          {user !== "admin" ? (
            <button className=" w-50 car__item-btn car__btn-rent">
              <Link to={`/cars/${carName}`}>Rent</Link>
            </button>
          ) : (
            <button className=" w-50 car__item-btn car__btn-rent">
              <Link to={`/addcar`} onClick={() => handleedit(regno)}>
                Edit
              </Link>
            </button>
          )}
        
            <button className=" w-50 car__item-btn car__btn-details" onClick={newPage}>
              Details
            </button>
         
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
