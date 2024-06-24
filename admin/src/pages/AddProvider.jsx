import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import "../App.css";

const AddProvider = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    password: "",
    confirmPassword: "",
    country: "", // Add country field to state
    region: "", // Add city field to state
  });
  const [pfpImage, setPfpImage] = useState(null); // Separate state for the file
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "../assets/img/no-dp.jpg"
  ); // State for image preview

  const handleChange = (e) => {
    if (e.target.name === "pfpImage") {
      const file = e.target.files[0];
      setPfpImage(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for the selected file
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  console.log("FormData: ", formData);
  const selectCountry = (val) => {
    setFormData({
      ...formData,
      country: val,
    });
  };

  const selectRegion = (val) => {
    setFormData({
      ...formData,
      region: val,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        timer: 1000,
      });
      setError(true);
      return;
    }
    setError(false);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.contact);
    data.append("address", formData.address);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    data.append("country", formData.country); // Add country to FormData
    data.append("region", formData.region); // Add city to FormData
    if (pfpImage) {
      data.append("pfpImage", pfpImage);
    }

    axios
      .post("http://localhost:5000/user/register", data)
      .then((res) => {
        console.log(res.data);
        setErrorMessage(null);
        navigate("/providerList");
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Customer added successfully!",
          timer: 1000,
        });
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setErrorMessage(err.response.data.message);
          swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email already exists!",
            timer: 1000,
          });
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        console.error(err);
      });
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <div className="card  card-body blur shadow-blur  p-0 overflow-hidden">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <h6 className="font-weight-bolder mb-0 ">
                    Provider | Provider Lists | Add New Provider
                  </h6>
                </nav>
                <div
                  className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                  id="navbar"
                >
                  <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                  <ul className="navbar-nav  justify-content-end">
                    <li className="nav-item d-flex align-items-center ">
                      <button
                        className="btn btn-primary m-0"
                        onClick={() => navigate("/providerList")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          style={{ marginRight: "4px", marginTop: "-5px" }}
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="white"
                            d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
                          />
                        </svg>{" "}
                        <span className="">Back</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          {/* form */}
          <div className="card mb-4 mt-4 pt-3 pb-4">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="container">
                <div className="row">
                  <div
                    className="col-lg-3 mt-1"
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease", // Added transition for the container
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="hover-overlay img-thumbnail"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "90%",
                        marginLeft: "5%",
                        height: "100%",
                        backgroundColor: "black",
                        opacity: isHovered ? 0.8 : 0, // Adjust opacity based on isHovered state
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transition: "opacity 0.3s ease", // Added transition for opacity change
                        // overflow:'hidden'
                      }}
                    >
                      <input
                        type="file"
                        style={{
                          width: "100%",
                          position: "absolute",
                          height: "100%",
                          cursor: "pointer",
                          opacity: 0,
                        }}
                        accept="image/png, image/jpeg"
                        name="pfpImage"
                        onChange={handleChange}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        // Adjust opacity based on isHovered state
                        style={{ width: "10vw", fill: "white" }}
                      >
                        <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                      </svg>
                    </div>
                    <img
                      src={imagePreviewUrl}
                      className="img-thumbnail"
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-6">
                        <label htmlFor="">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-lg-6">
                        <label htmlFor="">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      {/* <div className="col-lg-12">
                        <label htmlFor="">Image</label>
                        <input
                          className="form-control"
                          accept="image/png, image/jpeg"
                          type="file"
                          name="pfpImage"
                          onChange={handleChange}
                        />
                      </div> */}
                      <div className="col-lg-6">
                        <label htmlFor="">Select Provider Type: </label>
                        <select
                          className="form-select w-150"
                          aria-label="Select Service Provider Type"
                          name="service"
                          onChange={handleChange} // Replace handleChange with your actual handler function
                        >
                          <option value="">Select Service Provider Type</option>
                          <option value="electrician">Electrician</option>
                          <option value="plumber">Plumber</option>
                          <option value="carpenter">Carpenter</option>
                          <option value="painter">Painter</option>
                          <option value="hvac-technician">
                            HVAC Technician
                          </option>
                          <option value="landscaper">
                            Landscaper/Gardener
                          </option>
                          <option value="handyman">General Handyman</option>
                          <option value="cleaner">Cleaner</option>
                          <option value="pest-control">
                            Pest Control Specialist
                          </option>
                          <option value="locksmith">Locksmith</option>
                        </select>
                      </div>

                      <div className="col-lg-6">
                        <label htmlFor="">Contact Number</label>
                        <input
                          className="form-control"
                          type="number"
                          name="contact"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-lg-6 text-dark">
                        <label htmlFor="">Select Country</label>
                        <CountryDropdown
                          className="form-control"
                          value={formData.country}
                          onChange={(val) => selectCountry(val)}
                          required
                        />
                      </div>
                      <div className="col-lg-6 text-primary">
                        <label htmlFor="">Select Region</label>
                        <RegionDropdown
                          className="form-control"
                          country={formData.country}
                          value={formData.region}
                          onChange={(val) => selectRegion(val)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 text-warning">
                      <label htmlFor="">Address</label>
                      <textarea
                        style={{ maxHeight: "110px", minHeight: "110px" }}
                        className="form-control resizable-none"
                        id=""
                        name="address"
                        required
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 text-dark">
                    <label htmlFor="">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-6 text-primary">
                    <label htmlFor="">Confirm Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="confirmPassword"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col-lg-12">
                    {error === true && (
                      <p className="text-danger text-center">
                        Passwords doesn't match
                      </p>
                    )}

                    {errorMessage && (
                      <p className="text-danger text-center">{errorMessage}</p>
                    )}
                    <button className="btn btn-primary w-100">Save</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddProvider;
