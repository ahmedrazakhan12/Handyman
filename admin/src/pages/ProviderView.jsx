import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProviderView = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/provider/providers/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <Sidebar />
      <main className="main-content position-relative border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-4  main-content position-relative border-radius-lg pb-4 ">
          <div className="card  card-body blur shadow-blur  p-0 overflow-hidden">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <h6 className="font-weight-bolder mb-0 ">
                    Provider | Provider Lists | Service Provider
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
          <div className="card team-details mt-3">
            <div className="card-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#moderators"
                  >
                    Overview
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#booking">
                    Booking
                  </a>
                </li>
              </ul>

              <div className="tab-content mt-3 p-0">
                <div id="moderators" className="tab-pane fade show active">
                  <div className="row">
                    <div className="col-lg-3 col-md-12">
                      {data.pfpImage ? (
                        <img
                          src={data.pfpImage}
                          className="img-thumbnail"
                          style={{
                            width: "100%",
                            height: "280px",
                            objectFit: "cover",
                          }}
                          alt="Profile"
                        />
                      ) : (
                        <img
                          src="../assets/img/no-dp.jpg"
                          className="img-thumbnail"
                          alt="No Profile Picture"
                        />
                      )}
                    </div>
                    <div className="col-lg-9 col-md-12 ">
                      <div className="card-body p-1">
                        <ul className="list-group ">
                          <div className="row ">
                            <div className="col-lg-6">
                              <li className="list-group-item border-0 ps-0  pt-0 text-sm text-capitalize">
                                <strong className="text-dark">
                                  Full Name:
                                </strong>{" "}
                                {data.name}
                                &nbsp;
                              </li>
                              <li className="list-group-item mt-2 border-0 ps-0 text-sm">
                                <strong className="text-dark">Email:</strong>{" "}
                                &nbsp;
                                {data.email}
                              </li>
                              <li className="list-group-item mt-2 border-0 ps-0 text-sm">
                                <strong className="text-dark">Contact:</strong>{" "}
                                {data.contact}
                                &nbsp;
                              </li>
                              <li className="list-group-item mt-2 border-0 ps-0 pb-0 text-capitalize">
                                <strong className="text-dark text-sm">
                                  Service:
                                </strong>{" "}
                                {data.service}
                                &nbsp;
                              </li>
                              <li className="list-group-item mt-2 border-0 ps-0 pb-0 text-capitalize">
                                <strong className="text-dark text-sm">
                                  Joining date:
                                </strong>{" "}
                                {new Date(data.createdAt).toDateString()}
                                &nbsp;
                              </li>
                            </div>
                            <div className="col-lg-6">
                              <li className="list-group-item border-0 ps-0 pb-0 pt-0 text-capitalize">
                                <strong className="text-dark text-sm">
                                  Country:
                                </strong>{" "}
                                {data.country}
                                &nbsp;
                              </li>
                              <li className="list-group-item mt-2 border-0 ps-0 pb-0 text-capitalize">
                                <strong className="text-dark text-sm">
                                  City:
                                </strong>{" "}
                                {data.city}
                                &nbsp;
                              </li>
                              <li className="list-group-item mt-2 border-0 ps-0 pb-0 text-capitalize">
                                <strong className="text-dark text-sm">
                                  Region:
                                </strong>{" "}
                                {data.region}
                                &nbsp;
                              </li>
                              <li className="list-group-item mt-2 border-0 ps-0 pb-0 text-capitalize">
                                <strong className="text-dark text-sm">
                                  Area:
                                </strong>{" "}
                                {data.area}
                                &nbsp;
                              </li>
                              <li className="list-group-item mt-2 border-0 ps-0 pb-0 text-capitalize">
                                <strong className="text-dark text-sm">
                                  Postal Code:
                                </strong>{" "}
                                {data.postalCode}
                                &nbsp;
                              </li>
                            </div>
                          </div>
                          <li className="list-group-item mt-2 border-0 ps-0 text-sm">
                            <strong className="text-dark">Address:</strong>{" "}
                            {data.address}
                            &nbsp;
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="booking" className="tab-pane fade">
                  {/* Content for Booking tab goes here */}
                  <p>This is the booking tab content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProviderView;
