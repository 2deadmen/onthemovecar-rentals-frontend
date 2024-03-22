import React from "react";

import masterCard from "../../assets/all-images/master-card.jpg";
import QrCode from "../../assets/all-images/qrcode.jpeg";
import paypal from "../../assets/all-images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = () => {
  return (
    <>
      <div className="payment">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Direct Bank Transfer
        </label>
      </div>

      <div className="payment mt-3">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Cheque Payment
        </label>
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Master Card
        </label>

        <img src={masterCard} alt="" />
      </div>

      <div className="payment mt-3 d-flex align-items-center justify-content-between">
        <label htmlFor="" className="d-flex align-items-center gap-2">
          <input type="radio" /> Paypal
        </label>

        <img src={paypal} alt="" />
      </div>
      <div className="payment text-end mt-5">
        <button>Reserve Now</button>
      </div>
      {/* <div className="flex flex-col items-center content-center">
        <h4>UPI Payment is accepted for now </h4>
        <img src={QrCode} alt="" />
        <h2>or</h2>
        <h4>prathiksurana92@okhdfcbank</h4>

      </div> */}
    </>
  );
};

export default PaymentMethod;
