import { createApiConfig } from "./config";
import { ADD_CAR,FETCH_NUMBERS,LOGIN_USER ,DELETE_BOOKING,DELETE_CAR} from "./routes";

const apiConfig = createApiConfig();

export const createUser = (name, email, password) => {
//   console.log("clug", clug);
  const send = {
    name: name,
    email: email,
    password: password,
  };


  return apiConfig.post(LOGIN_USER, send);
};

export const addcar = (formData, url) => {
  //   console.log("clug", clug);
    const send = {
      regno:formData.regno,
      carName: formData.name,
      brand:formData.brand,
      price:formData.price,

      description: formData.desc,
      speed:formData.speed,
      gps:formData.gps,
      seatType:formData.seattype,
      automatic:formData.type,
      kmsrun:formData.kms,
      imgUrl: url,

    };
    
  
    return apiConfig.post(ADD_CAR, send);
  };
  


export const fetchnumber = () => {
  
    return apiConfig.get(FETCH_NUMBERS);
  };

  // export const fetchactive = () => {
  
  //   return apiConfig.get(FETCH_ACTIVE);
  // };

  


  export const activebookingdeletefn = (id) => {
    const send={
      id : id
    }
    return apiConfig.post(DELETE_BOOKING,send);
  };

  export const deleteCar = (regno) => {
    const send={
      regno : regno
    }
    return apiConfig.post(DELETE_CAR,send);
  };

