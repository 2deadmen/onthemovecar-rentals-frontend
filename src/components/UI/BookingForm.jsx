import React, { useState, useEffect } from "react";
import "../../styles/booking-form.css";
import { Col, FormGroup, Row } from "reactstrap";
import { auth, storage } from "../../firebaseConfig";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { bookcar } from "../../api/bookCars";
const BookingForm = (props) => {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    person: "",
    luggage: "",
    start_date: "",
    end_date: "",
    time: "",
    finishtime: "",
    license: "",
  });

  useEffect(() => {
    dateset()
    if (!props.cardata.item) {
      navigate("/cars");
    }
  }, []);
  const [today, settoday] = useState(new Date())
  const [phone, setPhone] = useState("+918151048182");
  const [image, setimage] = useState("");
  const [hasFilled, setHasFilled] = useState(false);
  const [verified, setverified] = useState(false);
  const [otp, setOtp] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const error = (msg) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

  const validate = () => {
    if (
      data.address === "" ||
      data.date === "" ||
      data.email === "" ||
      data.firstname === "" ||
      data.license === "" ||
      data.phone === ""
    ) {
      error("fill all the fields to proceed");
      return true;
    } else {
      return false;
    }
  };
  console.log(props.cardata.item);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      // event.preventDefault();
      return;
    } else {
      try {
        console.log("jdm");
        const testers = await bookcar(data, props.cardata.item.regno);
        console.log("here");
        console.log(testers);
        if(testers.status===200)
        navigate("/Clock");
        else{
           error(testers.data.error) 
        }
      } catch (err) {
        console.log(err);
        error(err);
      }
      // event.preventDefault();
    }
  };

  const generateRecaptcha = () => {
    auth.settings.appVerificationDisabledForTesting = true;
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          console.log("Captcha Resolved");
        },
      },
      auth
    );
  };

  const handleFile = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setimage(e.target.files[0]);
    }
    CreateUpload(e);
  };
  const CreateUpload = (e) => {
    e.preventDefault();

    const storageRef = ref(storage, `Driver/${image.name}`);
    //  setloading(true);
    uploadBytes(storageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log("Image uploaded successfully!");
            console.log("Download URL:", downloadURL);
            setdata({ ...data, license: downloadURL });
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });

    console.log(data.license);
  };

  const handleOnChangeForm = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value }); // For other input fields

    console.log(data);
  };

  const handleSend = async (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        console.log("sms sen check ");
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const verifyOtp = (event) => {
    event.preventDefault();
    // setverified(true);
    let otp = document.getElementById("OTP").value;
    setOtp(otp);
    // setverified(true)

    if (otp.length === 6 && window.confirmationResult) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let user = result.user;
          console.log(user);
          setverified(true);
          alert("User verified successfully");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("Invalid verification code");
          // setverified(true)
        });
    } else {
      alert("Invalid verification code");
    }
  };

 const dateset=()=>{
  let obj = new Date()
  let day = obj.getDate()
 let month = obj.getMonth()+1 //January is 0
  let year = obj.getFullYear();
       if(day<10){
              day='0'+day
          } 
      if(month<10){
          month='0'+month
      }
      settoday(year+'-'+month+'-'+day);
     

      // document.getElementById("start_date").min= today;
      // document.getElementById("end_date").min=today;
 }
  // navigate('/goodbye');

  return (
    <>
      {contextHolder}
      <form>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input
            required
            type="text"
            placeholder="First Name"
            onChange={handleOnChangeForm}
            name="firstname"
          />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input
            type="text"
            placeholder="Last Name"
            onChange={handleOnChangeForm}
            name="lastname"
          />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            onChange={handleOnChangeForm}
            name="email"
          />
        </FormGroup>
        <div className="flex flex-row">
          <FormGroup className="booking__form d-inline-block ms-1 mb-4">
            <input
              type="number"
              placeholder="Phone Number"
              onChange={handleOnChangeForm}
              name="phone"
            />
          </FormGroup>
          <button
            class="bg-blue-500 h-10 ml-4 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={handleSend}
          >
            send otp
          </button>
        </div>
        <FormGroup className="booking__form d-inline-block ms-1 mb-4">
          <input type="text" id="OTP" placeholder="OTP" />
        </FormGroup>
        <button
          class="bg-blue-500 h-10 ml-4 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={verifyOtp}
        >
          verify
        </button>
        <br />
        {verified && (
          <div>
            {" "}
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <input
                type="text"
                placeholder="To Address"
                name="address"
                onChange={handleOnChangeForm}
              />
            </FormGroup>
            <div id="recaptcha"></div>
            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <select
                name="person"
                id=""
                value={data.person}
                onChange={handleOnChangeForm}
              >
                <option value="1">1 Person</option>
                <option value="2">2 Person</option>
                <option value="3">3 Person</option>
                <option value="4">4 Person</option>
                <option value="5+">5+ Person</option>
              </select>
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <select
                name="luggage"
                id=""
                value={data.luggage}
                onChange={handleOnChangeForm}
              >
                <option value="1">1 luggage</option>
                <option value="2">2 luggage</option>
                <option value="3">3 luggage</option>
                <option value="4">4 luggage</option>
                <option value="5+">5+ luggage</option>
              </select>
            </FormGroup>
            <Row>
              <Col>
                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                  <label htmlFor="Journey Date">Journey start Date</label>
                  <input
                    type="date"
                    placeholder="Journey Date"
                    name="start_date"
                    id="start_date"
                    min={today}
                    onChange={handleOnChangeForm}
                    value={data.start_date}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                  <label htmlFor="Journey Date">Journey Ending Date</label>
                  <input
                    type="date"
                    id="end_date"
                    placeholder="Journey Date"
                    name="end_date"
                    min={today}
                    onChange={handleOnChangeForm}
                    value={data.end_date}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <label htmlFor=""> starting time </label>
              <input
                type="time"
                placeholder="Journey Time"
                className="time__picker"
                name="time"
                onChange={handleOnChangeForm}
                value={data.time}
              />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4">
              <label htmlFor=""> ending time</label>
              <input
                type="time"
                placeholder="Finish Time"
                className="time__picker"
                name="finishtime"
                onChange={handleOnChangeForm}
                value={data.finishtime}
              />
            </FormGroup>
            <FormGroup className="booking__form d-inline-block ms-1 mb-4 flex flex-row">
              <input type="file" onChange={handleFile} />
              <small>Upload your Driver's License (Max: 2MB)</small>
              {/* <button
          class="bg-blue-500 h-10 ml-4 hover:bg-blue-400 text-white font-bold py-1 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={CreateUpload}
        >
          Upload
        </button> */}
            </FormGroup>
            <Row className="py-5">
              <input
                type="submit"
                class="bg-blue-500 ml-4  hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={handleSubmit}
              />
            </Row>
          </div>
        )}
        <div id="recaptcha"></div>
      </form>
    </>
  );
};

export default BookingForm;
