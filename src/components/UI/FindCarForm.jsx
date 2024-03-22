import React from "react";
import "../../styles/find-car-form.css";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";

const FindCarForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">
        {/* <FormGroup className="form__group">
          <input type="text" placeholder="To address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="Journey date" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            className="journey__time"
            type="time"
            placeholder="Journey time"
            required
          />
        </FormGroup>
        <FormGroup className="select__group">
          <select>
            <option value="ac">AC Car</option>
            
            <option value="non-ac">Non AC Car</option>
          </select>
        </FormGroup> */}
        <h6 className="leading-8">
          Welcome to OnTheMove Cars – your go-to for seamless car rentals in
          Bangalore! Explore the city hassle-free with our diverse fleet and
          user-friendly booking platform. From compact cars to spacious SUVs,
          we've got your journey covered. Experience convenience, transparent
          pricing, and exceptional service. Your adventure awaits with OnTheMove
          Cars – where every ride is a joy.{" "}
        </h6>
        <FormGroup className="form__group  ">
          <button className="btn find__car-btn  ">Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
