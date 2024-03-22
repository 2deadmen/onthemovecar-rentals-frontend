import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import CarListing from "./CarListing";
import Bookings from "../components/UI/Bookings";

const Admin = () => {
  const { updateUser, fetchnumbers, activebookingdelete } = useData(); // useEffect(() => {
  //  auth()
  // console.log(user)
  // }, [])

  const [cars, setcars] = useState([]);
  const [users, setusers] = useState([]);
  const [book, setbook] = useState([]);
  const [activebook, setactivebook] = useState([]);
  const nav = useNavigate();
  // const auth=()=>{

  //     if(user !== "admin"){
  //           nav('/home')
  //     }
  // }
  const setvalues = async () => {
    let data = await fetchnumbers();

    setcars(data.data.cars);
    setbook(data.data.book);
    setusers(data.data.users);
    setactivebook(data.data.activebook);
    console.log(data.data.book,data.data.activebook)
  };

  useEffect(() => {
    checkuser();

    setvalues();
  }, []);

  const checkuser = () => {
    if (!sessionStorage.getItem("admin")) {
      nav("/home");
    } else {
      updateUser("admin");
    }
  };

  const handledeletebooking = async (id) => {
    console.log(id);
    const resp = await activebookingdelete(id);
    console.log(resp.status);
    await setvalues();
  };

  return (
    <div>
      {/* modals for all 4 tables */}
      {/* users table modal */}

      <div
        className="modal fade"
        id="usersmodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Users registered
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <table>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
                {users.map((ele) => {
                  return (
                    <tr className="" key={ele.email}>
                      <td className="p-2 names">{ele.name}</td>
                      <td className=" px-1 winner">
                        <a href={"mailto:" + ele.email}>email</a>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                <span>close</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* total bookings */}

      <div
        className="  modal  fade"
        id="booksmodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg   modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                All Bookings
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body container d-flex justify-content-center">
              <table cell-spacing="10px">
                <tr>
                  <th className="px-1">name</th>
                  <th className="px-1"> email</th>
                  <th className="px-1">phone</th>
                  <th className="px-1">regno</th>
                  <th className="">licensce</th>
                  <th className="px-1">start date</th>

                  <th className="px-1">ride completed</th>
                </tr>
                {book.map((ele) => {
                  return (
                    <tr key={ele.id}>
                      <td className="px-2 names">{ele.customer_name}</td>
                      <td className="px-1 winner">
                        <a href={"tel:" + ele.phone}>phone</a>
                      </td>
                      <td className=" px-1 winner">
                        <a href={"mailto:" + ele.email}>email</a>
                      </td>
                      <td className="px-2 winner">{ele.regno}</td>
                      <td className="px-2 winner">
                        <a href={ele.licensce}>click here</a>
                      </td>
                      <td className="px-2 py-2 winner">
                        {new Date(
                          ele.start_date._seconds * 1000
                        ).toDateString()}
                      </td>

                      <td className="px-2 winner">
                        {ele.ride_completed.toString()}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                <span>close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* total active bookings */}

      <div
        className="modal w-[400px] container fade"
        id="activebooksmodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className=" modal-lg modal-dialog  modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Active booking Logs
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-flex justify-content-center">
              <table>
                <tr>
                  <th className="px-1">customer_name</th>
                  <th className="px-1">address</th>
                  <th className="px-1">phone number</th>
                  <th className="px-1">email</th>
                  <th className="px-1">licensce</th>
                  <th className="px-1">otp</th>
                  <th className="px-1">registration number</th>
                  <th className="px-1">booking time (from-to)</th>
                </tr>
                {activebook.map((ele) => {
                  return (
                    <tr key={ele.id}>
                      <td className="px-1 names">{ele.customer_name}</td>
                      <td className="px-1 names">{ele.address}</td>
                      <td className="px-1 winner">
                        <a href={"tel:" + ele.phone}>phone</a>
                      </td>
                      <td className=" px-1 winner">
                        <a href={"mailto:" + ele.email}>email</a>
                      </td>

                      <td className="px-1 winner">
                        <a href={ele.licensce}>licensce</a>
                      </td>
                      <td className="px-1 winner">{ele.otp}</td>
                      <td className="px-1 winner">{ele.regno}</td>
                      <td className="px-1 winner">
                        {new Date(
                          ele.start_date._seconds * 1000
                        ).toDateString()}{" "}
                        --{" "}
                        {new Date(
                          ele.start_date._seconds * 1000
                        ).toDateString()}
                      </td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handledeletebooking(ele.id)}
                      >
                        delete
                      </button>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                <span>close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* actual admin page starts */}

      <h1 className="d-flex justify-content-center">ADMIN DASHBOARD</h1>
      <div
        className=" cards
      conatiner m-5 d-flex justify-content-center"
      >
        <div className=" row row-cols-3  justify-content-center  row-cols-md-3 g-4">
          <div className="col text-center ">
            <button
              className="btn btn-primary"
              type="button"
              data-toggle="modal"
              data-target="#usersmodal"
            >
              <div
                style={{ "padding-left": "4vw", "padding-right": "4vw" }}
                className="card "
              >
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">
                    <h3>{users.length}</h3>
                  </p>
                </div>
              </div>
            </button>
          </div>
          <div className="col text-center">
            <button
              className="btn btn-primary"
              type="button"
              data-toggle="modal"
              data-target="#booksmodal"
            >
              <div
                style={{ "padding-left": "4vw", "padding-right": "4vw" }}
                className="card"
              >
                <div className="card-body">
                  <h5 className="card-title">Total Bookings</h5>
                  <p className="card-text">
                    <h3>{book.length}</h3>
                  </p>
                </div>
              </div>
            </button>
          </div>
          <div className="col text-center">
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {}}
            >
              <a style={{ "text-decoration": "none" }} href="#cars">
                {" "}
                <div
                  style={{ "padding-left": "4vw", "padding-right": "4vw" }}
                  className="card"
                >
                  <div className="card-body">
                    <h5 className="card-title">Total Cars</h5>
                    <p className="card-text">
                      <h3>{cars.length}</h3>
                    </p>
                  </div>
                </div>
              </a>
            </button>
          </div>

          <div className="float text-center">
            <button
              className="btn btn-primary"
              type="button"
              data-toggle="modal"
              data-target="#activebooksmodal"
            >
              <div
                style={{
                  "padding-left": "4vw",
                  "padding-right": "4vw",
                  "margin-top": "2vh",
                }}
                className="card"
              >
                <div className="card-body">
                  <h5 className="card-title"> Total Active Bookings</h5>
                  <p className="card-text">
                    <h3>{activebook.length}</h3>
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
      <span id="cars"></span>
      <CarListing />
      <Link
        className="btn d-flex justify-content-center btn-primary"
        to="/addcar"
      >
        {" "}
        Add New Car
      </Link>

      <div className="container">
        <Bookings />
      </div>
    </div>
  );
};

export default Admin;
