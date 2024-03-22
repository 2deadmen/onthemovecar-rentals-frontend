import React from 'react'
import { useData } from "../context/DataContext";
import { useNavigate } from 'react-router-dom';
const Adminlogin = () => {
    let nav=useNavigate()
    const { updateUser } = useData();
    const checkpass=(e)=>{
        e.preventDefault()
        let pass=document.getElementById("inputPassword").value
        if(pass=="adminpass"){
            updateUser("admin")
            sessionStorage.setItem('admin',"admin")
            nav('/admin')
            
        }else{
           document.getElementById("warn").innerHTML="wrong password"
        }
     
    }
  return (
    <div className='container m-5 d-flex justify-content-center'><form>
    <div className="">
      
    <h2 className='d-flex justify-content-center'>ADMIN LOGIN</h2>
    </div>
    <div className="d-flex justify-content-center">
  
      
        <input  type="password" className="form-control" placeholder='password' id="inputPassword"/>
       
    </div>
    <small style={{"color":"red"}}id='warn'> </small> <br />
 <div className="d-flex justify-content-center">
 
        <input type="submit" value="submit" className=' m-2 btn btn-primary' onClick={checkpass} onSubmit={checkpass} />
     
 </div>
  </form></div>
  )
}

export default Adminlogin