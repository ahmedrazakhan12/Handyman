import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [pfpImage, setPfpImage] = useState(null);
  const [adminData, setAdminData] = useState({});
  const [loginId, setLoginId] = useState(""); // Initialize with null or an appropriate initial value
  const navigate = useNavigate();
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
    if (id) {
      axios
        .get(`http://localhost:5000/user/users/${id}`)
        .then((res) => {
          console.log("Edit", res.data);
          setAdminData(res.data);
          setUsername(res.data.name);
          setEmail(res.data.email);
          setAddress(res.data.address);
          setNumber(res.data.contact);
          setPassword(res.data.password);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "number":
        setNumber(value);
        break;
      case "password":
        setPassword(value);
        break;

      default:
        break;
    }
  };
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for the selected file
    setPfpImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", adminData.id);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("contact", number);
    formData.append("password", password);
    formData.append("pfpImage", pfpImage);

    try {
      const response = await axios.put(
        "http://localhost:5000/user/updateProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Edit-Profile: ", response.data);
      navigate("/customers");
    } catch (error) {
      console.error("Failed to Edit-Profile: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/user/delete/${adminData.id}`);
        Swal.fire({
          title: "Deleted!",
          text: "The user has been deleted.",
          icon: "success",
          timer: 1000,
        });

        navigate("/customers");
      }
    } catch (error) {
      console.error("Failed to delete admin:", error);
      Swal.fire("Error!", "Failed to delete admin.", "error");
    }
  };

  const handleImageDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete the profile image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setImagePreviewUrl("../assets/img/no-dp.jpg");
        axios
          .put(`http://localhost:5000/user/imageDel/${adminData.id}`)
          .then((res) => {
            Swal.fire(
              "Deleted!",
              "Your profile image has been deleted.",
              "success"
            );

            console.log("Image Removed: ", res.data);
          })
          .catch((err) => {
            Swal.fire(
              "Error!",
              "There was an error deleting your profile image.",
              "error"
            );
            console.log(err);
          });
      }
    });
  };
  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        
        <div className="container-fluid main-content position-relative">
        <div className="card  card-body blur shadow-blur  p-0 overflow-hidden mt-3">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <h6 className="font-weight-bolder mb-0 ">
                    Customers | Edit Customer{" "}
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
                        onClick={() => navigate("/customers")}
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
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card card-registration my-4"
                style={{ overflow: "hidden", borderRadius: ".5rem" }}
              >
                <form onSubmit={handleSubmit}>
                  <div className="row g-0">
                    <div className="col-xl-6" style={{ position: "relative" }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          fontSize: "24px",
                          color: "white",
                          cursor: "pointer",
                          position: "absolute",
                          top: "3%",
                          left: "95%",
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => {
                          if (adminData.pfpImage === null) {
                            Swal.fire(
                              "Error!",
                              "Please upload a profile image.",
                              "error"
                            );
                            return;
                          }
                          Swal.fire({
                            title: "Are you sure?",
                            text: "You are about to delete this item.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              setPfpImage("null1");
                              setImagePreviewUrl("../assets/img/no-dp.jpg");
                              // Swal.fire(
                              //   'Deleted!',
                              //   'Your item has been deleted.',
                              //   'success'
                              // );
                              // Additional logic after confirmation
                            }
                          });
                        }}
                      />
                      <img
                        src={
                          imagePreviewUrl ||
                          adminData.pfpImage ||
                          "../assets/img/no-dp.jpg"
                        }
                        alt="Sample photo"
                        className="img-fluid"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                    <div className="col-xl-6">
                      <div className="card-body text-black">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="form3Example1m"
                                className="form-control form-control-lg"
                                required
                                name="username"
                                value={username}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <label
                                className="form-label"
                                htmlFor="form3Example1n"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control form-control-lg"
                                required
                                value={email}
                                onChange={handleChange}
                                name="email"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="control-label">Image</label>
                          <input
                            type="file"
                            accept="image/png, image/jpeg"
                            className="form-control"
                            name="pfpImage"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="control-label">
                            Contact Number
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="number"
                            value={number}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-group">
                          <label className="control-label">Address</label>
                          <textarea
                            className="form-control"
                            style={{ height: "205px" }}
                            name="address"
                            value={address}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                        <div className="form-group">
                          <label className="control-label">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="row">
                          <div className="col">
                            <button
                              type="submit"
                              className="btn btn-primary btn-lg w-100 "
                            >
                              Update Admin
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col ">
                            <button
                              type="button"
                              onClick={handleDelete}
                              className="btn btn-danger btn-lg w-100 "
                            >
                              Delete Admin
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col ">
                            <button
                              type="button"
                              onClick={() => {
                                Swal.fire({
                                  title: "Unsaved Changes",
                                  text: "Are you sure want to discard your changes?.",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, Unsaved it!",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    navigate("/customers");
                                  }
                                });
                              }}
                              className="btn btn-secondary btn-lg w-100 "
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default EditCustomer;
