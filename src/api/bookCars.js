
import { createApiConfig } from "./config";
import { BOOK_CAR, SEND_MAIL } from "./routes";

const apiConfig = createApiConfig();

export const bookcar = (formData,registerno) => {
    let start_date=formData.start_date.split('-')
    let end_date=formData.end_date.split('-')
    let time=formData.time.split(':')
    let finishtime=formData.finishtime.split(':')
     start_date=new Date(parseInt(start_date[0]),parseInt(start_date[1]),parseInt(start_date[2]),parseInt(time[0]),parseInt(time[1]))
     end_date=new Date(parseInt(end_date[0]),parseInt(end_date[1]),parseInt(end_date[2]),parseInt(finishtime[0]) +2,parseInt(finishtime[1]))
    
   
   
  const send = {
    regno: registerno,
    name: formData.firstname,
    email: formData.email,
    start_date: start_date,
    end_date: end_date,
    phone: formData.phone,
    address: formData.address,
    license: formData.license,  
  };

  return apiConfig.post(BOOK_CAR, send);
};


export const send_mail = (formData) => {
  
  const send={
    user:formData.name,
    email:formData.email,
    info:formData.msg
    
  }
  return apiConfig.post(SEND_MAIL,send);
};

