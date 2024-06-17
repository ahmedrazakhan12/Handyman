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
                  <h6 className="font-weight-bolder mb-0 ">Add New Customer</h6>
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
                  <div className="col-lg-9">
                    <div className="row">
                      <div className="col-lg-12">
                        <label htmlFor="">Name</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <label htmlFor="">Email</label>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-lg-12">
                        <label htmlFor="">Image</label>
                        <input
                          className="form-control"
                          type="file"
                          name="pfpImage"
                          onChange={handleChange}
                        />
                      </div>
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
                    </div>
                  </div>
                  <div className="col-lg-3 mt-4">
                    <img
                      src={imagePreviewUrl}
                      className="img-thumbnail"
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "270px",
                        objectFit: "cover",
                      }}
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

export default AddCustomer;
