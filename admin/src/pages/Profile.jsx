import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const Profile = () => {
  const [adminData, setAdminData] = useState({});
  const [loginId, setLoginId] = useState(""); // Initialize with null or an appropriate initial value

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

  useEffect(() => {
    if (loginId) {
      axios
        .get("http://localhost:5000/admin/adminInfo", {
          headers: { Authorization: ` ${loginId}` }, // Corrected usage of loginId
        })
        .then((res) => {
          console.log(res.data);
          setAdminData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginId]);
  return (
    <>
      <Sidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container-fluid">
        <div className="card  card-body blur shadow-blur  p-1 overflow-hidden mb-2">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid p-2">
                <nav aria-label="breadcrumb">
                  <h6 className="font-weight-bolder mb-0 p-0 " style={{fontSize:'20px'}} >Profile</h6>
                </nav>
              </div>
            </nav>
          </div>
          <div
            className="page-header min-height-300 border-radius-xl mt-4"
            style={{
              backgroundImage: 'url("../assets/img/curved-images/curved0.jpg")',
              backgroundPositionY: "50%",
            }}
          >
            <span className="mask bg-gradient-primary opacity-6" />
          </div>
          <div className="card card-body blur shadow-blur mx-4 mt-n6 overflow-hidden">
            <div className="row gx-4">
              <div className="col-auto">
                <div className="avatar avatar-xl position-relative">
                  {adminData.pfpImage ? (
                    <img
                      src={adminData.pfpImage}
                      className="img-thumbnail"
                      alt="User avatar"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/150"
                      className="img-thumbnail"
                      alt="User avatar"
                    />
                  )}
                </div>
              </div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1 text-capitalize">{adminData.name}</h5>
                  <p className="mb-0 font-weight-bold text-sm">
                    {adminData.role}
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3">
                <div className="nav-wrapper position-relative end-0">
                  <ul
                    className="nav nav-pills nav-fill p-1 bg-transparent"
                    role="tablist"
                  >
                    <li className="nav-item"></li>
                    <li className="nav-item"></li>
                    <li className="nav-item">
                      <Link
                        to={"/profile/setting"}
                        className="nav-link mb-0 px-0 py-1 "
                      >
                        <svg
                          className="text-dark"
                          width="16px"
                          height="16px"
                          viewBox="0 0 40 40"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <title>settings</title>
                          <g
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(-2020.000000, -442.000000)"
                              fill="#FFFFFF"
                              fillRule="nonzero"
                            >
                              <g transform="translate(1716.000000, 291.000000)">
                                <g transform="translate(304.000000, 151.000000)">
                                  <polygon
                                    className="color-background"
                                    opacity="0.596981957"
                                    points="18.0883333 15.7316667 11.1783333 8.82166667 13.3333333 6.66666667 6.66666667 0 0 6.66666667 6.66666667 13.3333333 8.82166667 11.1783333 15.315 17.6716667"
                                  ></polygon>
                                  <path
                                    className="color-background"
                                    d="M31.5666667,23.2333333 C31.0516667,23.2933333 30.53,23.3333333 30,23.3333333 C29.4916667,23.3333333 28.9866667,23.3033333 28.48,23.245 L22.4116667,30.7433333 L29.9416667,38.2733333 C32.2433333,40.575 35.9733333,40.575 38.275,38.2733333 L38.275,38.2733333 C40.5766667,35.9716667 40.5766667,32.2416667 38.275,29.94 L31.5666667,23.2333333 Z"
                                    opacity="0.596981957"
                                  />
                                  <path
                                    className="color-background"
                                    d="M33.785,11.285 L28.715,6.215 L34.0616667,0.868333333 C32.82,0.315 31.4483333,0 30,0 C24.4766667,0 20,4.47666667 20,10 C20,10.99 20.1483333,11.9433333 20.4166667,12.8466667 L2.435,27.3966667 C0.95,28.7083333 0.0633333333,30.595 0.00333333333,32.5733333 C-0.0583333333,34.5533333 0.71,36.4916667 2.11,37.89 C3.47,39.2516667 5.27833333,40 7.20166667,40 C9.26666667,40 11.2366667,39.1133333 12.6033333,37.565 L27.1533333,19.5833333 C28.0566667,19.8516667 29.01,20 30,20 C35.5233333,20 40,15.5233333 40,10 C40,8.55166667 39.685,7.18 39.1316667,5.93666667 L33.785,11.285 Z"
                                  ></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                        <span className="ms-1">Settings</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-4">
          <div className="row">
            {/* <div className="col-12 col-xl-4">
            <div className="card h-100">
              <div className="card-header pb-0 p-3">
                <h6 className="mb-0">Platform Settings</h6>
              </div>
              <div className="card-body p-3">
                <h6 className="text-uppercase text-body text-xs font-weight-bolder">
                  Account
                </h6>
                <ul className="list-group">
                  <li className="list-group-item border-0 px-0">
                    <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input ms-auto"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        defaultChecked=""
                      />
                      <label
                        className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        Email me when someone follows me
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input ms-auto"
                        type="checkbox"
                        id="flexSwitchCheckDefault1"
                      />
                      <label
                        className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                        htmlFor="flexSwitchCheckDefault1"
                      >
                        Email me when someone answers on my post
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input ms-auto"
                        type="checkbox"
                        id="flexSwitchCheckDefault2"
                        defaultChecked=""
                      />
                      <label
                        className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                        htmlFor="flexSwitchCheckDefault2"
                      >
                        Email me when someone mentions me
                      </label>
                    </div>
                  </li>
                </ul>
                <h6 className="text-uppercase text-body text-xs font-weight-bolder mt-4">
                  Application
                </h6>
                <ul className="list-group">
                  <li className="list-group-item border-0 px-0">
                    <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input ms-auto"
                        type="checkbox"
                        id="flexSwitchCheckDefault3"
                      />
                      <label
                        className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                        htmlFor="flexSwitchCheckDefault3"
                      >
                        New launches and projects
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item border-0 px-0">
                    <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input ms-auto"
                        type="checkbox"
                        id="flexSwitchCheckDefault4"
                        defaultChecked=""
                      />
                      <label
                        className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                        htmlFor="flexSwitchCheckDefault4"
                      >
                        Monthly product updates
                      </label>
                    </div>
                  </li>
                  <li className="list-group-item border-0 px-0 pb-0">
                    <div className="form-check form-switch ps-0">
                      <input
                        className="form-check-input ms-auto"
                        type="checkbox"
                        id="flexSwitchCheckDefault5"
                      />
                      <label
                        className="form-check-label text-body ms-3 text-truncate w-80 mb-0"
                        htmlFor="flexSwitchCheckDefault5"
                      >
                        Subscribe to newsletter
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
            <div className="col-12 col-xl-4">
              <div className="card h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">Profile Information</h6>
                    </div>
                    <div className="col-md-4 text-end">
                      <Link to={"/profile/edit"}>
                        <svg
                          style={{ height: "20px" }}
                          className="cursor-pointer "
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          fill="#34495E"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <p className="text-sm">{adminData.description === "null" ? "No description" : adminData.description}</p>
                  <hr className="horizontal gray-light my-4" />
                  <ul className="list-group">
                    <li className="list-group-item border-0 ps-0 pt-0 text-sm text-capitalize">
                      <strong className="text-dark">Full Name:</strong> &nbsp;
                      {adminData.name}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Email:</strong> &nbsp;
                      {adminData.email}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Role:</strong> &nbsp;
                      {adminData.role}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Location:</strong> &nbsp;
                      USA
                    </li>
                    <li className="list-group-item border-0 ps-0 pb-0">
                      <strong className="text-dark text-sm">Social:</strong>{" "}
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
            </div>

            {/* <div className="col-12 col-xl-4">
            <div className="card h-100">
              <div className="card-header pb-0 p-3">
                <h6 className="mb-0">Conversations</h6>
              </div>
              <div className="card-body p-3">
                <ul className="list-group">
                  <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                    <div className="avatar me-3">
                      <img
                        src="../assets/img/kal-visuals-square.jpg"
                        alt="kal"
                        className="border-radius-lg shadow"
                      />
                    </div>
                    <div className="d-flex align-items-start flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Sophie B.</h6>
                      <p className="mb-0 text-xs">
                        Hi! I need more information..
                      </p>
                    </div>
                    <a
                      className="btn btn-link pe-3 ps-0 mb-0 ms-auto"
                      href="javascript:;"
                    >
                      Reply
                    </a>
                  </li>
                  <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                    <div className="avatar me-3">
                      <img
                        src="../assets/img/marie.jpg"
                        alt="kal"
                        className="border-radius-lg shadow"
                      />
                    </div>
                    <div className="d-flex align-items-start flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Anne Marie</h6>
                      <p className="mb-0 text-xs">Awesome work, can you..</p>
                    </div>
                    <a
                      className="btn btn-link pe-3 ps-0 mb-0 ms-auto"
                      href="javascript:;"
                    >
                      Reply
                    </a>
                  </li>
                  <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                    <div className="avatar me-3">
                      <img
                        src="../assets/img/ivana-square.jpg"
                        alt="kal"
                        className="border-radius-lg shadow"
                      />
                    </div>
                    <div className="d-flex align-items-start flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Ivanna</h6>
                      <p className="mb-0 text-xs">About files I can..</p>
                    </div>
                    <a
                      className="btn btn-link pe-3 ps-0 mb-0 ms-auto"
                      href="javascript:;"
                    >
                      Reply
                    </a>
                  </li>
                  <li className="list-group-item border-0 d-flex align-items-center px-0 mb-2">
                    <div className="avatar me-3">
                      <img
                        src="../assets/img/team-4.jpg"
                        alt="kal"
                        className="border-radius-lg shadow"
                      />
                    </div>
                    <div className="d-flex align-items-start flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Peterson</h6>
                      <p className="mb-0 text-xs">Have a great afternoon..</p>
                    </div>
                    <a
                      className="btn btn-link pe-3 ps-0 mb-0 ms-auto"
                      href="javascript:;"
                    >
                      Reply
                    </a>
                  </li>
                  <li className="list-group-item border-0 d-flex align-items-center px-0">
                    <div className="avatar me-3">
                      <img
                        src="../assets/img/team-3.jpg"
                        alt="kal"
                        className="border-radius-lg shadow"
                      />
                    </div>
                    <div className="d-flex align-items-start flex-column justify-content-center">
                      <h6 className="mb-0 text-sm">Nick Daniel</h6>
                      <p className="mb-0 text-xs">
                        Hi! I need more information..
                      </p>
                    </div>
                    <a
                      className="btn btn-link pe-3 ps-0 mb-0 ms-auto"
                      href="javascript:;"
                    >
                      Reply
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
            {/* <div className="col-12 mt-4">
            <div className="card mb-4">
              <div className="card-header pb-0 p-3">
                <h6 className="mb-1">Projects</h6>
                <p className="text-sm">Architects design houses</p>
              </div>
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                    <div className="card card-blog card-plain">
                      <div className="position-relative">
                        <a className="d-block shadow-xl border-radius-xl">
                          <img
                            src="../assets/img/home-decor-1.jpg"
                            alt="img-blur-shadow"
                            className="img-fluid shadow border-radius-xl"
                          />
                        </a>
                      </div>
                      <div className="card-body px-1 pb-0">
                        <p className="text-gradient text-dark mb-2 text-sm">
                          Project #2
                        </p>
                        <a href="javascript:;">
                          <h5>Modern</h5>
                        </a>
                        <p className="mb-4 text-sm">
                          As Uber works through a huge amount of internal
                          management turmoil.
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm mb-0"
                          >
                            View Project
                          </button>
                          <div className="avatar-group mt-2">
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Elena Morison"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-1.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Ryan Milly"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-2.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Nick Daniel"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-3.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Peterson"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-4.jpg"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                    <div className="card card-blog card-plain">
                      <div className="position-relative">
                        <a className="d-block shadow-xl border-radius-xl">
                          <img
                            src="../assets/img/home-decor-2.jpg"
                            alt="img-blur-shadow"
                            className="img-fluid shadow border-radius-lg"
                          />
                        </a>
                      </div>
                      <div className="card-body px-1 pb-0">
                        <p className="text-gradient text-dark mb-2 text-sm">
                          Project #1
                        </p>
                        <a href="javascript:;">
                          <h5>Scandinavian</h5>
                        </a>
                        <p className="mb-4 text-sm">
                          Music is something that every person has his or her
                          own specific opinion about.
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm mb-0"
                          >
                            View Project
                          </button>
                          <div className="avatar-group mt-2">
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Nick Daniel"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-3.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Peterson"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-4.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Elena Morison"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-1.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Ryan Milly"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-2.jpg"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                    <div className="card card-blog card-plain">
                      <div className="position-relative">
                        <a className="d-block shadow-xl border-radius-xl">
                          <img
                            src="../assets/img/home-decor-3.jpg"
                            alt="img-blur-shadow"
                            className="img-fluid shadow border-radius-xl"
                          />
                        </a>
                      </div>
                      <div className="card-body px-1 pb-0">
                        <p className="text-gradient text-dark mb-2 text-sm">
                          Project #3
                        </p>
                        <a href="javascript:;">
                          <h5>Minimalist</h5>
                        </a>
                        <p className="mb-4 text-sm">
                          Different people have different taste, and various
                          types of music.
                        </p>
                        <div className="d-flex align-items-center justify-content-between">
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm mb-0"
                          >
                            View Project
                          </button>
                          <div className="avatar-group mt-2">
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Peterson"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-4.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Nick Daniel"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-3.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Ryan Milly"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-2.jpg"
                              />
                            </a>
                            <a
                              href="javascript:;"
                              className="avatar avatar-xs rounded-circle"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Elena Morison"
                            >
                              <img
                                alt="Image placeholder"
                                src="../assets/img/team-1.jpg"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-4">
                    <div className="card h-100 card-plain border">
                      <div className="card-body d-flex flex-column justify-content-center text-center">
                        <a href="javascript:;">
                          <i className="fa fa-plus text-secondary mb-3" />
                          <h5 className=" text-secondary"> New project </h5>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
