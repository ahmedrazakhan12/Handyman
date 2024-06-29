import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pagination, Button } from "react-bootstrap"; // Assuming you have react-bootstrap installed

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
            <div className="row pt-3 d-flex justify-content-between">
              <div className="col-6">
                <h5
                  style={{
                    marginLeft: "20px",
                    marginTop: "5px",
                    fontSize: "20px",
                  }}
                >
                  Customers
                </h5>
              </div>
              <div className="col-6">
                <button
                  className="btn btn-primary float-end me-3"
                  onClick={() => navigate("/add-customer")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    width={20}
                    height={20}
                    style={{ marginRight: "4px", marginTop: "-5px" }}
                  >
                    <path
                      fill="white"
                      d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                    />
                  </svg>{" "}
                  Add user
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="card-body px-0 pt-0 p-2 bg-white mt-4 shadow blur border-radius-lg">
            <div className="table-responsive p-2">
              <div style={{ float: "right" }}>
                <div className="input-group p-1">
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
