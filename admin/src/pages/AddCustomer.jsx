import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";

const AddCustomer = () => {
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
  });
  const [pfpImage, setPfpImage] = useState(null); // Separate state for the file
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // State for image preview

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (formData.password !== formData.confirmPassword) {
    //   swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "Passwords do not match!",
    //     timer: 1000,
    //   });
    //   setError(true);
    //   return;
    // }
    // setError(false);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.contact);
    data.append("address", formData.address);
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    data.append("status", "user");
    if (pfpImage) {
      data.append("pfpImage", pfpImage);
    }

    axios
      .post("http://localhost:5000/user/register", data)
      .then((res) => {
        console.log(res.data);
        setErrorMessage(null);
        navigate("/customers");
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
                    Customers | Add New Customer
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
                        onClick={() => navigate("/customers")}
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
                    className="col-lg-3 col-md-12 "
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease", // Added transition for the container
                    }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div>
                      <div
                        className="hover-overlay img-thumbnail"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "90%",
                          marginLeft: "5%",
                          height: "380px",
                          opacity: isHovered ? 1.8 : 0, // Adjust opacity based on isHovered state
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          transition: "opacity 0.3s ease",
                          overflow: "hidden", // Added transition for opacity change
                          // overflow:'hidden'
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          style={{
                            fill: "white",
                            height: "25px",
                            position: "absolute",
                            top: 10,
                            left: 125,
                            width: "90%",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            if (imagePreviewUrl === "../assets/img/no-dp.jpg") {
                              return swal.fire({
                                title: "No Profile Picture?",
                                text: "No image selected.",
                                icon: "warning",
                                confirmButtonColor: "#3085d6",
                              });
                            }
                            swal
                              .fire({
                                title: "Are you sure?",
                                text: "Want to remove your profile picture.",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, reset it!",
                                cancelButtonText: "Cancel",
                              })
                              .then((result) => {
                                if (result.isConfirmed) {
                                  // User confirmed, proceed with action
                                  setPfpImage(null);
                                  setImagePreviewUrl("../assets/img/no-dp.jpg");
                                  swal.fire(
                                    "Removed!",
                                    "Your profile picture has been removed.",
                                    "success"
                                  );
                                }
                              });
                          }}
                        >
                          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                        </svg>
                        <input
                          type="file"
                          style={{
                            width: "100%",
                            position: "absolute",
                            height: "100%",
                            cursor: "pointer",
                            marginTop: "80px",
                            opacity: 0,
                            // marginLeft:"-500px"
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
                        src={
                          imagePreviewUrl ||
                          formData.pfpImage ||
                          "../assets/img/no-dp.jpg"
                        }
                        className="form img-thumbnail"
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "380px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
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
                      <div className="col-lg-12">
                        <label htmlFor="">Contact Number</label>
                        <input
                          className="form-control"
                          type="number"
                          name="contact"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-lg-12 text-warning">
                        <label htmlFor="">Address</label>
                        <textarea
                          style={{ maxHeight: "200px", minHeight: "200px" }}
                          className="form-control resizable-none"
                          id=""
                          name="address"
                          required
                          onChange={handleChange}
                        ></textarea>
                      </div>
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
                    {/* {error === true && (
                      <p className="text-danger text-center">
                        Passwords doesn't match
                      </p>
                    )} */}

                    {errorMessage && (
                      <p className="text-danger text-center">{errorMessage}</p>
                    )}
                    <button className="btn btn-primary w-10 float-end m-0">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        swal
                          .fire({
                            title: "Unsaved Changes",
                            text: "Are you sure want to discard your changes?.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, Unsaved it!",
                          })
                          .then((result) => {
                            if (result.isConfirmed) {
                              navigate("/customers");
                            }
                          });
                      }}
                      className="btn btn-secondary me-2"
                      style={{ float: "right" }}
                    >
                      Cancel
                    </button>
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

export default AddCustomer;
