import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
const Dashboard = () => {
  const [adminData, setAdminData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/user/decodedToken", {
        headers: { Authorization: token }
      })
      .then((res) => {
        // console.log(res.data);
        setAdminData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const [data, setData] = useState([]);
  const [providers , setProviders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/users")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("ahmed", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/provider/providers")
      .then((res) => {
        console.log(res.data);
        setProviders(res.data);
      })
      .catch((err) => {
        console.log("ahmed", err);
      });
  }, []);
  
  return (
    <>
    
      {/* <Sidebar /> */}
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
       
        <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        {/* <div className="card  card-body blur shadow-blur  p-1 overflow-hidden mb-3">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid p-2">
                <nav aria-label="breadcrumb">
                  <h6 className="font-weight-bolder mb-0 p-0 " style={{fontSize:'20px'}} >Dashboard</h6>
                </nav>
              </div>
            </nav>
          </div> */}
          
          <div className="row">
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <Link to="/customers">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Total Users
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                        {data.length}
                          
                        </h5>
                      </div>
                      </Link>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-money-coins text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <Link to="/providerList">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Service Providers

                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          {providers.length}
                        </h5>
                      </div>
                      </Link>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-world text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Total Orders

                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          +3,462
                          <span className="text-danger text-sm font-weight-bolder">
                            -2%
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-paper-diploma text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="card">
                <div className="card-body p-3">
                  <div className="row">
                    <div className="col-8">
                      <div className="numbers">
                        <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Revenue
                        </p>
                        <h5 className="font-weight-bolder mb-0">
                          $103,430
                          <span className="text-success text-sm font-weight-bolder">
                            +5%
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-4 text-end">
                      <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                        <i
                          className="ni ni-cart text-lg opacity-10"
                          aria-hidden="true"
                        />
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

export default Dashboard;
