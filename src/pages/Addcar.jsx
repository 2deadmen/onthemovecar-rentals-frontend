import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addcar } from "../api/userLogin";
import { getOneCar } from "../api/fetchCars";
import { useNavigate } from "react-router-dom";
const Addcar = () => {
  const nav = useNavigate();

  const [url, seturl] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    desc: "",
    regno: "",
    kms: "",
    price: "",
    speed: "",
    gps: "",
    type: "",
    seattype: "",
  });

  //pic upload to firebase storage
  const handleFileUpload = async (file) => {
    try {
      const storageRef = ref(storage, `cars/${file.name}`);

      // Upload the file
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((picurl) => {
          seturl(picurl);
        });
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  // Replace with your actual file input ID
  const filechange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };
  //form data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    checkdata();
  }, []);

  const { carData, editForm } = useData();

  const checkdata = async () => {
    try {
      console.log(editForm);
      if (editForm) {
        console.log(editForm);
        let resp = await getOneCar(editForm);
        resp = resp.data[0];
        console.log(resp);

        let data = {
          name: resp.carName,
          brand: resp.brand,
          regno: resp.regno,
          desc: resp.description,
          kms: resp.kmsrun,
          price: resp.price,
          speed: resp.speed,
          gps: resp.gps,
          type: resp.automatic,
          seattype: resp.seatType,
        };
        console.log(data);
        setFormData(data);
        // document.getElementById('desc').innerHTML=resp.description
      }
    } catch (error) {}
  };
  ////adding new car
  const addingcar = async (event) => {
    event.preventDefault();
    //  let desc=document.getElementById('desc').value

    if (url) {
      console.log(formData);
      try {
        const response = await addcar(formData, url);
        if (response.status === 200) nav("/admin");
      } catch (error) {
        document.getElementById("warn").value = "adding car failed";
      }
    } else {
      document.getElementById("warn").value = "adding car failed";
    }
  };

  return (
    <div>
      <div className="container m-5 ">
        <form>
          <div className="">
            <h2 className="d-flex justify-content-center">CAR DETAILS</h2>
          </div>
          <div className="container w-25">
            <div className="m-2">
              <label htmlFor="">Car Name</label>
              <input
                type="text"
                required
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                name="name"
                placeholder="car name"
                id="name"
              />
            </div>
            <div className="m-2">
              <label htmlFor="">Car Brand</label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={handleInputChange}
                className="form-control"
                name="brand"
                placeholder="Car Brand"
                id="brand"
              />
            </div>
            <div className="m-2">
              <label htmlFor="">Car Registration Number</label>
              <input
                type="text"
                value={formData.regno}
                onChange={handleInputChange}
                required
                className="form-control"
                name="regno"
                placeholder="Car regno"
                id="regno"
              />
            </div>
            <div className="m-2">
              <label htmlFor="">Car rental price</label>
              <input
                type="number"
                required
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Car price"
                id="price"
              />
            </div>
            <div className="m-2">
              <label htmlFor="">Car Description</label>
              <textarea
                name="desc"
                id="desc"
                onChange={handleInputChange}
                value={formData.desc}
                cols="30"
                rows="4"
              ></textarea>
            </div>
            <div className="m-2">
              <label htmlFor="">Car speed</label>
              <input
                type="number"
                name="speed"
                value={formData.speed}
                onChange={handleInputChange}
                required
                className="form-control"
                placeholder="Car speed"
                id="speed"
              />
            </div>
            <div className="m-2">
              <label htmlFor="">GPS availability</label>
              <select
                className="form-control"
                id="gps"
                value={formData.gps}
                onChange={handleInputChange}
                name="gps"
              >
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
            <div className="m-2">
              <label htmlFor="">Gear type </label>

              <select
                className="form-control"
                value={formData.type}
                onChange={handleInputChange}
                name="type"
                id="type"
              >
                <option value="YES">Automatic</option>
                <option value="NO">Manual</option>
              </select>
            </div>
            <div className="m-2">
              <label htmlFor="">seat type </label>

              <select
                name="seattype"
                value={formData.seattype}
                onChange={handleInputChange}
                className="form-control"
                id="seattype"
              >
                <option value="normal">normal</option>
                <option value="heating">heating</option>
              </select>
            </div>

            <div className="m-2">
              <label htmlFor="">total run in kms </label>

              <input
                type="number"
                value={formData.kms}
                onChange={handleInputChange}
                required
                className="form-control"
                name="kms"
                placeholder="Car speed"
                id="kms"
              />
            </div>

            <div className="m-2">
              <label htmlFor="">upload car pic </label>

              <input
                type="file"
                required
                onChange={filechange}
                className="form-control-file"
                name="pic"
                id="pic"
              />
            </div>
          </div>
          <small style={{ color: "red" }} id="warn">
            {" "}
          </small>{" "}
          <br />
          <div className="d-flex justify-content-center">
            <input
              type="submit"
              value="submit"
              className=" m-2 btn btn-primary"
              onClick={addingcar}
              onSubmit={addingcar}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addcar;
