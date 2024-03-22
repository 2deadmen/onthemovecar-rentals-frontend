import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";

import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useNavigate, useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
import PaymentMethod from "../components/UI/PaymentMethod";
import { getOneCar } from "../api/fetchCars";

const CarDetails = () => {
  const { slug } = useParams();

  const {
    user,

    deletecar,
    individualcars,
    SaveIndividualCars,
  } = useData();
  // const individualcars = carData.find((item) => item.carName === slug);
  // const [individualcars, setindividualcars] = useState([]);
  const nav = useNavigate();
  const handleSubmit = () => {
    nav("/booking");
  };

  const populateData = async () => {
    console.log("we triggered");
    if (individualcars.length == 0) {
      try {
        console.log("no data so we here ");
        const { data } = await getOneCar(slug);
        console.log(data[0].imgUrl);

        SaveIndividualCars({ item: data[0] });

        console.log("no data so we here ");
        return;
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("we here and ready ");
      console.log(individualcars);
    }
  };

  const handledeletecar = async (regno) => {
    //  console.log(regno)

    await deletecar(regno);
    nav("/admin");
  };

  useEffect(() => {
    populateData();
    window.scrollTo(0, 0);
  }, [individualcars]);

  return (
    <div>
      {individualcars && individualcars.item ? (
        <Helmet title={individualcars.item.carName}>
          <section>
            <Container>
              <Row>
                <Col lg="6">
                  <img
                    src={individualcars.item.imgUrl}
                    alt=""
                    className="w-100"
                  />
                </Col>

                <Col lg="6">
                  <div className="car__info">
                    <h2 className="section__title">
                      {individualcars.item.carName}
                    </h2>

                    <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                      <h6 className="rent__price fw-bold fs-4">
                      ₹{individualcars.item.price}.00 / Day
                      </h6>

                      <span className=" d-flex align-items-center gap-2">
                        <span style={{ color: "#f9a826" }}>
                          <i className="ri-star-s-fill"></i>
                          <i className="ri-star-s-fill"></i>
                          <i className="ri-star-s-fill"></i>
                          <i className="ri-star-s-fill"></i>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        ({individualcars.item.rating} ratings)
                      </span>
                    </div>

                    <p className="section__description">{individualcars.item.description}</p>

                    <div
                      className=" d-flex align-items-center mt-3"
                      style={{ columnGap: "4rem" }}
                    >
                      {/* <span className=" d-flex align-items-center gap-1 section__description">
                        <i
                          className="ri-roadster-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {individualcars.item.model}
                      </span> */}

                      <span className=" d-flex align-items-center gap-1 section__description">
                        Automatic
                        <i
                          className="ri-settings-2-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {individualcars.item.automatic}
                      </span>

                      <span className=" d-flex align-items-center gap-1 section__description">
                        Mileage <i
                          className="ri-timer-flash-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {individualcars.item.speed}
                      </span>
                    </div>

                    <div
                      className=" d-flex align-items-center mt-3"
                      style={{ columnGap: "2.8rem" }}
                    >
                      <span className=" d-flex align-items-center gap-1 section__description">
                        GPS <i
                          className="ri-map-pin-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {individualcars.item.gps}
                      </span>

                      <span className=" d-flex align-items-center gap-1 section__description">
                        seat type <i
                          className="ri-wheelchair-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {individualcars.item.seatType}
                      </span>

                      <span className=" d-flex align-items-center gap-1 section__description">
                        Company <i
                          className="ri-building-2-line"
                          style={{ color: "#f9a826" }}
                        ></i>{" "}
                        {individualcars.item.brand}
                      </span>
                    </div>
                  </div>
                 
                </Col>
                <button
                    className="btn btn-primary m-3 "
                    style={{ backgroundColor:'#f9a826',color:'black', borderColor:'#f9a826' ,}}
                    onClick={handleSubmit}
                  >
                    Rent Now
                  </button>
                {user === "admin" ? (
                  <button
                    onClick={() => handledeletecar(individualcars.item.regno)}
                    className="btn btn-danger m-3"
                  >
                    Delete Car
                  </button>
                ) : null}
              </Row>
            </Container>
          </section>
        </Helmet>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default CarDetails;
