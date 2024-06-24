import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../App.css";
const AddMember = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin", // Default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    axios
      .post("http://localhost:5000/admin/register", formData)
      .then((res) => {
        // Handle success response
        Swal.fire({
          title: "Admin Registered  !",
          text: "User registered successfully!",
          icon: "success",
          timer: 1000,
        });

        navigate("/");
        // Optionally, you can redirect or perform other actions after successful registration
      })
      .catch((err) => {
        // Handle error response
        console.error("Error registering admin:", err);
        Swal.fire({
          title: "Error!",
          text: "Failed to register admin.",
          icon: "error",
        });
        setError(err.response.data.message); // Set error state if necessary
      });
  };

  // Optional: Logging form data whenever it changes
  console.log(formData);

  return (
    <>
      <Sidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* <Navbar /> */}
        <div className="container-fluid  main-content position-relative ">
        <div className="card  card-body blur shadow-blur  p-0 overflow-hidden mt-3">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <h6 className="font-weight-bolder mb-0 ">
                    Team Management | Add New Admin
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
                        onClick={() => navigate("/team-management")}
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
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card card-registration my-4"
                style={{ overflow: "hidden", borderRadius: ".5rem" }}
              >
                <div className="row g-0">
                  <div
                    className="col-xl-6 d-none d-xl-block"
                    style={{ height: "670px", overflow: "hidden" }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                      alt="Sample photo"
                      className="img-fluid"
                      style={{
                        height: "auto",
                        width: "100%",
                        objectFit: "cover",
                        // borderTopLeftRadius: ".5rem",
                        // borderBottomLeftRadius: ".5rem",
                      }}
                    />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">Add Admin</h3>
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div
                              data-mdb-input-init=""
                              className="form-outline"
                            >
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                required
                                name="username"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div
                              data-mdb-input-init=""
                              className="form-outline"
                            >
                              <label
                                className="form-label"
                                htmlFor="form3Example1n"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control form-control-lg"
                                required
                                onChange={handleChange}
                                name="email"
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          data-mdb-input-init=""
                          className="form-outline mb-4"
                        >
                          <label className="form-label" htmlFor="form3Example8">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg"
                            required
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>

                        <div
                          data-mdb-input-init=""
                          className="form-outline mb-4"
                        >
                          <label className="form-label" htmlFor="form3Example8">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control form-control-lg"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>

                        <div
                          data-mdb-input-init=""
                          className="form-outline mb-4"
                        >
                          <label className="form-label" htmlFor="form3Example8">
                            Role
                          </label>
                          <select
                            data-mdb-select-init=""
                            className="form-select"
                            name="role"
                          >
                            <option value={1}>Admin</option>
                          </select>
                        </div>
                        <div className="row">
                          <span className="text-danger text-sm text-center pb-2">
                            {error && error}
                          </span>
                        </div>
                        <div className="row ">
                          <div className="col">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg w-100 "
                            >
                              Register Admin
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddMember;
