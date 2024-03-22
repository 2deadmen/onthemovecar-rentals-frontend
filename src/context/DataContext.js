// DataContext.js

import React, { createContext, useState, useContext } from "react";
import {
  fetchnumber,
  activebookingdeletefn,
  deleteCar,
} from "../api/userLogin";
import { getAllCars } from "../api/fetchCars";

// Create a context

const server = process.env.REACT_APP_SERVER;
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [data, setModal] = useState(false);
  const [carData, setcarData] = useState([]);
  const [user, setUser] = useState(null);
  const [editForm, seteditForm] = useState(null);
  const [individualcars, setindividualcars] = useState([])

  const updateData = (newData) => {
    setModal(newData);
  };

  

  const updateUser = (newData) => {
    setUser(newData);
  };
  const SaveIndividualCars=(data)=>{
    setindividualcars(data)
    sessionStorage.setItem('car',data)
    console.log(data)

  }

  const fetchdata = async () => {
    let response;
    try {
      const { data } = await getAllCars();
      console.log(data);
   
      setcarData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchnumbers = async () => {
    let resp;
    try {
      resp = await fetchnumber();

      return resp;
    } catch (error) {
      return error;
    }
  };

  //    const fetchactivebook= async()=>{
  //     let resp
  //    try {
  //  resp = await fetchactive()

  //  return resp
  // } catch (error) {
  //  return error
  // }

  //   }
  const deletecar = async (regno) => {
    let resp;
    try {
      resp = await deleteCar(regno);

      return resp;
    } catch (error) {
      return error;
    }
  };

  const activebookingdelete = async (id) => {
    let resp;
    try {
      resp = await activebookingdeletefn(id);

      return resp;
    } catch (error) {
      return error;
    }
  };

  const updateEditForm = (regno) => {
    seteditForm(regno);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        updateData,
        deletecar,
        activebookingdelete,
        fetchnumbers,
  
        updateEditForm,
        editForm,
        fetchdata,
        SaveIndividualCars,
        individualcars,
        carData,
        user,
        setcarData,
        updateUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume the context
export const useData = () => useContext(DataContext);
