import React,{useEffect} from 'react'
import BookingForm from '../components/UI/BookingForm'
import PaymentMethod from '../components/UI/PaymentMethod'
import { useData } from '../context/DataContext'
import { Col } from 'reactstrap'
const Book = (props) => {
  
    const {
   
        user,
     
        deletecar,
        individualcars,
        SaveIndividualCars,
      } = useData();

    // useEffect(() => {
    //   try {
    //     let data=sessionStorage.getItem('car')
    //     SaveIndividualCars({item:data})
    //   } catch (error) {
        
    //   }
    // }, [])
    
  
    return (
    <div className='container ' align='start'>{user !== "admin" ? (
        <div style={{alignContent:'start !important'}}>
          <Col id="booking" lg="7" className="mt-5">
            <div className="booking-info mt-5">
              <h5 className="mb-4 fw-bold ">Booking Information</h5>
              <BookingForm cardata={individualcars} />
            </div>
          </Col>

        
        </div>
      ) : null}</div>
  )
}

export default Book