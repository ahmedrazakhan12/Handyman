import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
const UserData = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [adminData, setAdminData] = useState({});
  const [loginId, setLoginId] = useState(""); // Initialize with null or an appropriate initial value
  const [error, setError] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const navigate = useNavigate();

  // console.log(id, loginId);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/user/users")
  //     .then((res) => {
  //       // console.log(res.data);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/user/users/${id}`)
        .then((res) => {
          setData(res.data);
          // console.log("Single Data: ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/admin/decodedToken", {
        headers: { Authorization: token },
      })
      .then((res) => {
        setLoginId(res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [formData, setFormData] = useState({
  //   newPassword: "",
  //   re_new_password: "",
  // });

  // console.log(formData);
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     newPassword: e.target.newPassword.value,
  //     re_new_password: e.target.re_new_password.value,
  //   };

  //   if (formData.newPassword !== formData.re_new_password) {
  //     return setConfirmError("Passwords do not match");
  //   }
  //   if (formData.newPassword == formData.re_new_password) {
  //     setConfirmError("");
  //   }

  //   axios
  //     .put(`http://localhost:5000/admin/changeAdminPassword/${id}`, formData)
  //     .then((res) => {
  //       // console.log(res.data);
  //       if (res.data.message == "Password changed successfully") {
  //         swal.fire({
  //           icon: "success",
  //           title: "Success",
  //           text: "Password changed successfully",
  //           timer: 1000,
  //         });
  //       }

  //       setFormData({
  //         newPassword: "",
  //         re_new_password: "",
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       if (err.response) {
  //         setError(true);
  //       } else {
  //         console.log("Error:", err.message);
  //       }
  //     });
  // };

  // const [searchValue, setSearchValue] = useState("");
  // const [seratchResult, setSearchResult] = useState([]);
  // const handleSearchChange = (e) => {
  //   const searchTerm = e.target.value;
  //   setSearchValue(searchTerm);
  //   axios
  //     .get(`http://localhost:5000/user/search/${searchTerm}`)
  //     .then((res) => {
  //       setSearchResult(res.data);
  //       console.log("Search Result: ", res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // console.log("Search values: ",searchTerm);
  // };

  // useEffect(() => {}, []);

  return (
    <>
      <Sidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <div className="content w-100">
        
        
            <div className="w-96 " style={{marginLeft:'10px'}}>
            <div className="card  card-body blur shadow-blur  p-0 overflow-hidden">
              <nav
                className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
                id="navbarBlur"
                navbar-scroll="true"
              >
                <div className="container-fluid py-1 px-3">
                  <nav aria-label="breadcrumb">
                    <h6 className="font-weight-bolder mb-0 ">
                      Customers | View Customer
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
            
            </div>
            
            <div className="container-fluid">
            <div className="row mt-3">
              <div className="card col-lg-12 col-md-12 p-4">
                <div className="row">
                  <div className="col-lg-2 m-0 col-md-12 ">
                    <img
                      src={data.pfpImage || "../assets/img/no-dp.jpg"}
                      className="form img-thumbnail w-md-100"
                      alt="Preview"
                      style={{
                        minWidth: "120px",
                        width: "100%",
                        height: "100%",
                        maxHeight: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <div className="col-lg-9 col-md-9 ">
                    <div className="card-body p-1">
                      <ul className="list-group ">
                        <div className="row ">
                          <div className="col-lg-6">
                            <li className="list-group-item border-0 text-sm text-capitalize">
                              <strong className="text-dark">Name:</strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.name || ""}
                              </span>
                            </li>
                            <li className="list-group-item border-0 text-sm mt-4">
                              <strong className="text-dark">Contact:</strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.contact || ""}
                              </span>
                            </li>
                          </div>
                          <div className="col-lg-6">
                            <li className="list-group-item border-0 text-sm">
                              <strong className="text-dark">Email:</strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.email || ""}
                              </span>
                            </li>
                            <li className="list-group-item border-0 text-sm mt-4">
                                <strong className="text-dark">Address:</strong>{" "}
                                <span style={{ display: "block" }}>
                                  {data.address || ""}
                                </span>
                              </li>
                          </div>
                          <div className="row">
                            <div className="col">
                             
                            </div>
                          </div>
                        </div>
                      </ul>
                    </div>
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

export default UserData;
