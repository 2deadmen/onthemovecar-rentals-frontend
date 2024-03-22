import React,{useEffect} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { useData } from "../context/DataContext";


const CarListing = () => {
  useEffect(() => {
   fetchdata()
  }, [])
  
 

  const { data, updateData,updateCarData,setcarData ,fetchdata,carData } = useData();

 const handleChange =(e)=>{
    
    if(e.target.value=="low"){
      try {
        const sortedProducts = [...carData].sort((a, b) => a.price - b.price);
        setcarData(sortedProducts)
      } catch (error) {
        
      }
    }else{
      try {
        const sortedProducts = [...carData].sort((a, b) => b.price - a.price);
        setcarData(sortedProducts)
      } catch (error) {
        
      }
    }

 }  

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select onChange={handleChange}>
             
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
