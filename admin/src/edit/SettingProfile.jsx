import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const SettingProfile = () => {
  const [adminData, setAdminData] = useState({});
  const [loginId, setLoginId] = useState(""); // Initialize with null or an appropriate initial value
  const [error, setError] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const email = adminData.email;
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
          setAdminData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginId]);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    re_new_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      currentPassword: e.target.currentPassword.value,
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
      .put("http://localhost:5000/admin/changePassword", formData, {
        headers: { Authorization: `Bearer ${email}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message == "Password changed successfully") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password changed successfully",
            timer: 1000,
          });
          navigate("/profile");
        }
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

  return (
    <>
      <Sidebar />
      <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
        <Navbar />
        <div
          className="card  card-body blur shadow-blur  p-0 overflow-hidden container-fluid"
          style={{ width: "97%" }}
        >
          <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
            id="navbarBlur"
            navbar-scroll="true"
          >
            <div className="container-fluid py-1 px-3">
              <nav aria-label="breadcrumb">
                <h6 className="font-weight-bolder mb-0 ">
                  Profile | Settings{" "}
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
                      onClick={() => navigate("/profile")}
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
        <div
          className="container-fluid mt-3  card main-content position-relative max-height-vh-100 h-100 border-radius-lg "
          style={{ width: "97%" }}
        >
          <div className="card-body px-0 pb-2  p-3 ">
            <div
              className="d-flex px-2 mt-1 mb-4"
              data-toggle="modal"
              data-target="#exampleModal"
            >
              <div>
                <FontAwesomeIcon
                  icon={faUnlock}
                  style={{
                    marginRight: "10px",
                    marginTop: "0px",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="d-flex flex-column justify-content-center">
                <h6 className="mb-0 text-sm" style={{ cursor: "pointer" }}>
                  Security | Change Password
                </h6>
              </div>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div class="modal-body">
                <div className="row p-0">
                  <div className="col-12">
                    <label htmlFor="" className="form-label p-0">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      onChange={handleChange}
                      className={
                        error === true
                          ? "form-control w-100 is-invalid"
                          : "form-control w-100"
                      }
                      error
                      required
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="" className={"form-label p-0"}>
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      onChange={handleChange}
                      className={
                        confirmError
                          ? "form-control w-100 is-invalid"
                          : "form-control w-100"
                      }
                      required
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="" className={"form-label p-0"}>
                      Re-type New Password
                    </label>
                    <input
                      type="password"
                      name="re_new_password"
                      onChange={handleChange}
                      className={
                        confirmError
                          ? "form-control w-100 is-invalid"
                          : "form-control w-100"
                      }
                      required
                    />
                  </div>
                </div>

                {confirmError && (
                  <div className="text-danger">{confirmError}</div>
                )}
              </div>
              <div class="modal-footer mt-3">
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingProfile;
