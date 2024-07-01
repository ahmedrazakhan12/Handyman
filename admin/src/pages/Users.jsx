import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pagination, Button } from "react-bootstrap"; // Assuming you have react-bootstrap installed

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/users")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching users:", err);
      });
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    axios
      .get(`http://localhost:5000/user/search/${searchTerm}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error searching users:", err);
      });
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate the range of pagination items to display
  const maxPagesToShow = 10;
  const startIndex = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endIndex = Math.min(startIndex + maxPagesToShow - 1, totalPages);

  // Generate the range of pagination items to display
  const pageNumbers = [...Array(endIndex - startIndex + 1).keys()].map(
    (number) => startIndex + number
  );

  // Function to handle next button click
  const nextPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
  };

  // Function to handle previous button click
  const prevPage = () => {
    setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
  };

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-4 main-content position-relative border-radius-lg ">
          <div className="card card-body blur shadow-blur p-0 overflow-hidden">
            <div className="row p-2  d-flex justify-content-between">
              <div className="col-6">
                <h5
                className="px-3 py-2"
                  style={{
                    padding:"0px",
                    fontSize: "20px",
                  }}
                >
                  Customers
                </h5>
              </div>
              <div className="col-6">
               
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="card-body px-0 pt-0 p-2 bg-white mt-4 shadow blur border-radius-lg">
            <div className="table-responsive p-2">
             
              <div
                  className="card-header p-2"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="input-group p-0 w-20">
                  <span className="input-group-text text-body">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here..."
                    onChange={handleSearchChange}
                  />
                </div>
                  <Link to="/add-customer">
                    <FontAwesomeIcon icon={faUserPlus} />
                  </Link>
                </div>
              <table className="table align-items-center">
                <thead>
                  <tr>
                    <th style={{ width: "5px" }}></th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Name
                    </th>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                      Joining date
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Contact number
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Address
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Action
                    </th>
                    <th className="text-secondary opacity-7" />
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1 + indexOfFirstItem}.</td>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <Link to={`/user-data/${item.id}`}>
                            <div>
                              <span className="text-xs text-secondary mb-0 me-2"></span>
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
                            <Link to={`/user-data/${item.id}`}>
                              <h6 className="mb-0 text-sm text-capitalize">
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
                        <p className="text-xs font-weight-bold mb-0">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">
                          {item.contact}
                        </p>
                      </td>
                      <td className="align-middle text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          {item.address}
                        </span>
                      </td>
                      <td className="align-middle text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          {/* <Link
                            to={`/edit-password/${item.id}`}
                            className="text-secondary font-weight-bold text-xs me-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              style={{
                                width: "15px",
                                height: "15px",
                                fill: "grey",
                              }}
                            >
                              <path d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z" />
                            </svg>
                          </Link> */}
                          <Link
                            to={`/edit-customer/${item.id}`}
                            className="text-secondary font-weight-bold text-xs"
                          >
                          Edit
                          </Link>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {data.length === 0 && (
              <div className="d-flex justify-content-center">
              <p className="text-secondary">No Data Found</p>
            </div>
            )}
            <div className="d-flex justify-content-center">
              <Pagination>
                {/* Previous Button */}
                <Pagination.Prev
                  onClick={prevPage}
                  disabled={currentPage === 1}
                />

                {/* Pagination Items */}
                {pageNumbers.map((number) => (
                  <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => paginate(number)}
                  >
                    <span
                      className={number === currentPage ? "text-light" : ""}
                    >
                      {number}
                    </span>
                  </Pagination.Item>
                ))}

                {/* Next Button */}
                <Pagination.Next
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>

            {/* Load More Button */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Users;
