import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const SettingProfile = () => {
  const [adminData, setAdminData] = useState({});
  const [loginId, setLoginId] = useState(""); // Initialize with null or an appropriate initial value
  const [error, setError] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const [closeModel, setCloseModel] = useState(false);
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
          window.location.reload();
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
        <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
          <div className="card-body px-0 pb-2">
            <div className="table-responsive">
              <table className="table align-items-center mb-0">
                <thead>
                  <tr>
                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      Profile Setting
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div
                        className="d-flex px-2 py-1"
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
                          <h6
                            className="mb-0 text-sm"
                            style={{ cursor: "pointer" }}
                          >
                            Security | Change Password
                          </h6>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Change Password
                  </h5>
                </div>
                <form action="" onSubmit={handleSubmit}>
                  <div class="modal-body">
                    <div className="row p-2">
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

                    <div className="row p-2">
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

                    <div className="row p-2">
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
                    {confirmError && (
                      <div className="text-danger">{confirmError}</div>
                    )}
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      {...(closeModel ? { "data-dismiss": "modal" } : {})}
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SettingProfile;
