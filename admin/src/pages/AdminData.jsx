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
  const [singleData, setSingleData] = useState([]);
  const [adminData, setAdminData] = useState({});
  const [loginId, setLoginId] = useState(""); // Initialize with null or an appropriate initial value
  const [error, setError] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const navigate = useNavigate();

  // console.log(id, loginId);
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/team")
      .then((res) => {
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/admin/team/${id}`)
        .then((res) => {
          setSingleData(res.data);
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

  const [formData, setFormData] = useState({
    newPassword: "",
    re_new_password: "",
  });

  // console.log(formData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      newPassword: e.target.newPassword.value,
      re_new_password: e.target.re_new_password.value,
    };

    if (formData.newPassword !== formData.re_new_password) {
      return setConfirmError("Passwords do not match");
    }
    if (formData.newPassword == formData.re_new_password) {
      setConfirmError("");
    }

    axios
      .put(`http://localhost:5000/admin/changeAdminPassword/${id}`, formData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.message == "Password changed successfully") {
          swal.fire({
            icon: "success",
            title: "Success",
            text: "Password changed successfully",
            timer: 1000,
          });
        }

        setFormData({
          newPassword: "",
          re_new_password: "",
        });
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          setError(true);
        } else {
          console.log("Error:", err.message);
        }
      });
  };

  const [searchValue, setSearchValue] = useState("");
  const [seratchResult, setSearchResult] = useState([]);
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchValue(searchTerm);
    axios
      .get(`http://localhost:5000/admin/search/${searchTerm}`)
      .then((res) => {
        setSearchResult(res.data);
        console.log("Search Result: ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("Search values: ",searchTerm);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Sidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <div className="content w-100">
            <div className="card  card-body blur shadow-blur  p-1 overflow-hidden mb-2">
              <nav
                className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
                id="navbarBlur"
                navbar-scroll="true"
              >
                <div className="container-fluid p-0">
                    <h6
                      className="font-weight-bolder mb-0 p-0 "
                      style={{ fontSize: "20px" }}
                    >
                      Team Management | Admin Profiles
                    </h6>
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
                </div>
              </nav>
            </div>

            <div className="input-group " style={{ width: "49%" }}>
              <span className="input-group-text text-body">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search admins..."
                onChange={handleSearchChange}
              />
            </div>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-12">
                {searchValue.length === 0 && (
                  <div className="card mb-4">
                    <div
                      className="card-header pb-0"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h6>Team Members</h6>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Admins
                              </th>
                              <th className="text-secondary opacity-7" />
                            </tr>
                          </thead>
                          <tbody>
                            {data.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <Link to={`/admin-data/${item.id}`}>
                                      <div>
                                        <span className="text-xs text-secondary mb-0 me-2">
                                          {index + 1}.{" "}
                                        </span>
                                        {item.pfpImage ? (
                                          <img
                                            src={item.pfpImage}
                                            className="avatar avatar-sm me-3"
                                            style={{ objectFit: "cover" }}
                                            alt="user1"
                                          />
                                        ) : (
                                          <img
                                            src="../assets/img/no-dp.jpg"
                                            className="avatar avatar-sm me-3"
                                            alt="user1"
                                          />
                                        )}
                                      </div>
                                    </Link>
                                    <div className="d-flex flex-column justify-content-center">
                                      <Link to={`/admin-data/${item.id}`}>
                                        <h6 className="mb-0 text-sm">
                                          {item.name}
                                        </h6>
                                        <p className="text-xs text-secondary mb-0">
                                          {item.email}
                                        </p>
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <Link to={`/admin-data/${item.id}`}>
                                    <span className="text-secondary font-weight-bold text-xs">
                                      View
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {searchValue.length > 0 && (
                  <div className="card mb-4">
                    <div
                      className="card-header pb-0"
                      style={{
                        display: "flex",
                      }}
                    >
                      <h6 className=" me-2">Your Search </h6>{" "}
                      {seratchResult.length === 0 && (
                        <h6 className="text-secondary"> (No results found)</h6>
                      )}
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                      <div className="table-responsive p-0">
                        <table className="table align-items-center mb-0">
                          <thead>
                            <tr>
                              <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                Admins
                              </th>
                              <th className="text-secondary opacity-7" />
                            </tr>
                          </thead>
                          <tbody>
                            {seratchResult.map((item, index) => (
                              <tr key={item.id}>
                                <td>
                                  <div className="d-flex px-2 py-1">
                                    <Link to={`/admin-data/${item.id}`}>
                                      <div>
                                        <span className="text-xs text-secondary mb-0 me-2">
                                          {index + 1}.{" "}
                                        </span>
                                        {item.pfpImage ? (
                                          <img
                                            src={item.pfpImage}
                                            className="avatar avatar-sm me-3"
                                            style={{ objectFit: "cover" }}
                                            alt="user1"
                                          />
                                        ) : (
                                          <img
                                            src="../assets/img/no-dp.jpg"
                                            className="avatar avatar-sm me-3"
                                            alt="user1"
                                          />
                                        )}
                                      </div>
                                    </Link>
                                    <div className="d-flex flex-column justify-content-center">
                                      <Link to={`/admin-data/${item.id}`}>
                                        <h6 className="mb-0 text-sm">
                                          {item.name}
                                        </h6>
                                        <p className="text-xs text-secondary mb-0">
                                          {item.email}
                                        </p>
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <Link to={`/admin-data/${item.id}`}>
                                    <span className="text-secondary font-weight-bold text-xs">
                                      View
                                    </span>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-12">
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AdminData;
