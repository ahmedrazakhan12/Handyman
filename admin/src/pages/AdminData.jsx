import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
const AdminData = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loginId, setLoginId] = useState(""); // Initialize with null or an appropriate initial value
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/admin/team/${id}`)
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

  return (
    <>
      {/* <Sidebar /> */}
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* <Navbar /> */}
        <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <div className="card team-details mt-3">
                <div className="card-body">
                  <div>
                    <div className="row">
                      <div
                        className="col-lg-3 col-md-12 "
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s ease", // Added transition for the container
                        }}
                      >
                        <div>
                          <img
                            src={data.pfpImage || "../assets/img/no-dp.jpg"}
                            className="form img-thumbnail"
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "320px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-9 col-md-12 ">
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
                                <li className="list-group-item border-0 text-capitalize">
                                  <strong className="text-dark text-sm">
                                    Role:
                                  </strong>{" "}
                                  <span style={{ display: "block" }}>
                                    {data.role || ""}
                                  </span>
                                </li>
                                <li className="list-group-item border-0 text-capitalize">
                                <strong className="text-dark">
                                      Postal / Zip code:
                                    </strong>{" "}
                                    <span style={{ display: "block" }}>
                                      {data.postalCode || ""}
                                    </span>
                                </li>
                                {/* <li className="list-group-item border-0 text-capitalize">
                              <strong className="text-dark text-sm">
                                Country:
                              </strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.country || ""}
                              </span>
                            </li>
                            */}
                              </div>
                              <div className="col-lg-6">
                                <li className="list-group-item border-0 text-sm">
                                  <strong className="text-dark">Email:</strong>{" "}
                                  <span style={{ display: "block" }}>
                                    {data.email || ""}
                                  </span>
                                </li>

                                <li className="list-group-item border-0 text-sm">
                                  <strong className="text-dark">
                                    Contact:
                                  </strong>{" "}
                                  <span style={{ display: "block" }}>
                                    {data.contact || ""}
                                  </span>
                                </li>

                                <li className="list-group-item border-0 text-sm">
                                  <strong className="text-dark">
                                    Country:
                                  </strong>{" "}
                                  <span style={{ display: "block" }}>
                                    {data.country || ""}
                                  </span>
                                </li>

                                {/* <li className="list-group-item border-0 text-capitalize">
                              <strong className="text-dark text-sm">
                                Postal Code:
                              </strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.postalCode || ""}
                              </span>
                            </li> */}
                              </div>
                              <div className="row">
                                <div className="col">
                                  <li className="list-group-item border-0 text-sm">
                                    <strong className="text-dark">
                                      Address:
                                    </strong>{" "}
                                    <span style={{ display: "block" }}>
                                      {data.address || ""}
                                    </span>
                                  </li>
                                </div>
                              </div>

                            
                            </div>
                          </ul>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col">
                          <li className="list-group-item border-0 text-sm">
                            <strong className="text-dark">Description:</strong>{" "}
                            <span style={{ display: "block" }}>
                              {data.description || ""}
                            </span>
                          </li>
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

export default AdminData;

{
  /* <div className="col-lg-12 col-md-12">
  <div className="card team-details ">
    <div className="card-header">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="text-capitalize">
            Username: {singleData.name}
            {String(loginId) === String(id) ? (
              <span style={{ marginLeft: "10px" }}>(You)</span>
            ) : (
              ""
            )}
          </h5>
          <small>
            {singleData.description === null
              ? "No description"
              : singleData.description === "null"
              ? "No description"
              : singleData.description
              ? singleData.description
              : ""}
          </small>
        </div>
      </div>
    </div>
    <div className="card-body">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className="nav-link active"
            data-toggle="tab"
            href="#moderators"
          >
            Information
          </a>
        </li>
        {String(loginId) !== String(id) ? (
          <li className="nav-item">
            <a
              className="nav-link"
              data-toggle="tab"
              href="#members"
            >
              Security
            </a>
          </li>
        ) : (
          ""
        )}
      </ul>
      <div className="tab-content">
        <div
          id="moderators"
          className="tab-pane fade show active"
        >
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="card-body p-3">
                <ul className="list-group ">
                  <li className="list-group-item mt-2 border-0 ps-0 pt-0 text-sm text-capitalize">
                    <strong className="text-dark">
                      Full Name:
                    </strong>{" "}
                    &nbsp;
                    {singleData.name}
                  </li>
                  <li className="list-group-item mt-2 border-0 ps-0 text-sm">
                    <strong className="text-dark">Email:</strong>{" "}
                    &nbsp;
                    {singleData.email}
                  </li>
                  <li className="list-group-item mt-2 border-0 ps-0 text-sm">
                    <strong className="text-dark">Role:</strong>{" "}
                    &nbsp;
                    {singleData.role}
                  </li>
                  <li className="list-group-item mt-2 border-0 ps-0 text-sm">
                    <strong className="text-dark">
                      Location:
                    </strong>{" "}
                    &nbsp; USA
                  </li>
                  <li className="list-group-item mt-2 border-0 ps-0 pb-0">
                    <strong className="text-dark text-sm">
                      Social:
                    </strong>{" "}
                    &nbsp;
                    <a
                      className="btn btn-facebook btn-simple mb-0 ps-1 pe-2 py-0"
                      href="javascript:;"
                    >
                      <i className="fab fa-facebook fa-lg" />
                    </a>
                    <a
                      className="btn btn-twitter btn-simple mb-0 ps-1 pe-2 py-0"
                      href="javascript:;"
                    >
                      <i className="fab fa-twitter fa-lg" />
                    </a>
                    <a
                      className="btn btn-instagram btn-simple mb-0 ps-1 pe-2 py-0"
                      href="javascript:;"
                    >
                      <i className="fab fa-instagram fa-lg" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              {singleData.pfpImage ? (
                <img
                  src={singleData.pfpImage}
                  className="avatar me-3 "
                  style={{
                    objectFit: "cover",
                    height: "250px",
                    width: "100%",
                    margin: "10px",
                    borderRadius: "10px",
                  }}
                  alt="user1"
                />
              ) : (
                <img
                  src="../assets/img/no-dp.jpg"
                  className="avatar me-3 "
                  style={{
                    objectFit: "cover",
                    height: "250px",
                    width: "100%",
                    margin: "10px",
                    borderRadius: "10px",
                  }}
                  alt="user1"
                />
              )}
            </div>
          </div>
        </div>
        <div id="members" className="tab-pane fade">
          <div class="modal-content">
            <form action="" onSubmit={handleSubmit}>
              <div class="modal-body">
                <div className="row p-2">
                  <label htmlFor="" className={"form-label p-0"}>
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    onChange={handleChange}
                    value={formData.newPassword}
                    className={
                      confirmError
                        ? "form-control w-100 is-invalid"
                        : "form-control w-100"
                    }
                    required
                  />
                </div>

                <div className="row p-2">
                  <label htmlFor="" className={"form-label p-0"}>
                    Re-type New Password
                  </label>
                  <input
                    type="password"
                    name="re_new_password"
                    onChange={handleChange}
                    value={formData.re_new_password}
                    className={
                      confirmError
                        ? "form-control w-100 is-invalid"
                        : "form-control w-100"
                    }
                    required
                  />
                </div>
                {confirmError && (
                  <div className="text-danger">
                    {confirmError}
                  </div>
                )}
              </div>
              <div class="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */
}
