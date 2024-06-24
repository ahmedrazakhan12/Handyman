import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
const Team = () => {
  const [data, setData] = useState([]);
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
    axios
      .get("http://localhost:5000/admin/team")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Sidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <div className="card  card-body blur shadow-blur  p-1 overflow-hidden mb-2">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid p-2">
                <nav aria-label="breadcrumb">
                  <h6
                    className="font-weight-bolder mb-0 p-0 "
                    style={{ fontSize: "20px" }}
                  >
                    Team Management
                  </h6>
                </nav>
              </div>
            </nav>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card mb-4">
                <div
                  className="card-header pb-0"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h6>Team Members</h6>
                  <Link to="/add-member">
                    <FontAwesomeIcon icon={faUserPlus} />
                  </Link>
                </div>
                <div className="card-body px-0 pt-0 pb-2">
                  <div className="table-responsive p-0">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            admins
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Role
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Status
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Employed
                          </th>
                          <th className="text-secondary opacity-7" />
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, index) => {
                          return (
                            <>
                              <tr>
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
                                            className="avatar avatar-sm me-3 "
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
                                    Manager
                                  </p>
                                  <p className="text-xs text-secondary mb-0">
                                    {item.role}
                                  </p>
                                </td>
                                <td className="align-middle text-center text-sm">
                                  <span className="badge badge-sm bg-gradient-success">
                                    Online
                                  </span>
                                </td>
                                <td className="align-middle text-center">
                                  <span className="text-secondary text-xs font-weight-bold">
                                    23/04/18
                                  </span>
                                </td>
                                <td className="align-middle">
                                  {String(item.id) !== String(loginId) ? (
                                    <Link
                                      to={`/edit-member/${item.id}`}
                                      className="text-secondary font-weight-bold text-xs"
                                    >
                                      Edit
                                    </Link>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
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

export default Team;
