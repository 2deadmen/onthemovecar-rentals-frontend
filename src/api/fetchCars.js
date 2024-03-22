import { createApiConfig } from "./config";
import { FETCH_ONE_CAR, GET_ALL_CARS } from "./routes";

const apiConfig = createApiConfig();

export const getOneCar = (reqno) => {
  const send = {
    regno: reqno,
  };


  return apiConfig.post(FETCH_ONE_CAR, send);
};

export const getAllCars = () => {
  return apiConfig.get(GET_ALL_CARS);
};
