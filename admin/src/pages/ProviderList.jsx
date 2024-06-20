import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const ProviderList = () => {
    const navigate = useNavigate();
  return (
    <>
    
    <Sidebar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <Navbar />
      <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
      <div className="card  card-body blur shadow-blur  p-0 overflow-hidden ">
            <div className="row pt-3 d-flex justify-content-between">
              <div className="col-6">
                <h5
                  style={{
                    marginLeft: "20px",
                    marginTop: "5px",
                    fontSize: "20px",
                  }}
                >
                  Customer Lists
                </h5>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-primary float-end me-3"
                  onClick={() => navigate("/add-provider")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    width={20}
                    height={20}
                    style={{ marginRight: "0px", marginTop: "-5px" }}
                  >
                    <path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
                  </svg>{" "}
                  Add provider
                </button>
              </div>
            </div>
          </div>
      </div>
    </main>
  </>
  )
}

export default ProviderList
