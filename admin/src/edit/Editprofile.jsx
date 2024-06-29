import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Editprofile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
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
    if (loginId) {
      axios
        .get("http://localhost:5000/admin/adminInfo", {
          headers: { Authorization: ` ${loginId}` },
        })
        .then((res) => {
          console.log(res.data);
          setAdminData(res.data);
          setUsername(res.data.name);
          setEmail(res.data.email);
          setDescription(res.data.description);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loginId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "description":
        setDescription(value);
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
    formData.append("description", description);
    formData.append("pfpImage", pfpImage);

    try {
      const response = await axios.put(
        "http://localhost:5000/admin/editProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Edit-Profile: ", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error setting up the request:", error.message);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("id", adminData.id);
  //   formData.append("username", username);
  //   formData.append("email", email);
  //   formData.append("description", description);
  //   formData.append("pfpImage", pfpImage);

  //   try {
  //     const response = await axios.put(
  //       "http://localhost:5000/admin/editProfile",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log("Edit-Profile: ", response.data);
  //     navigate("/profile");
  //   } catch (error) {
  //     console.error("Failed to Edit-Profile: ", error);
  //   }
  // };
  // const handleImageDelete = () => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you really want to delete the profile image?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       setImagePreviewUrl("../assets/img/no-dp.jpg");
  //       axios
  //         .put(`http://localhost:5000/admin/imageDel/${adminData.id}`)
  //         .then((res) => {
  //           Swal.fire(
  //             "Deleted!",
  //             "Your profile image has been deleted.",
  //             "success"
  //           );

  //           console.log("Image Removed: ", res.data);
  //         })
  //         .catch((err) => {
  //           Swal.fire(
  //             "Error!",
  //             "There was an error deleting your profile image.",
  //             "error"
  //           );
  //           console.log(err);
  //         });
  //     }
  //   });
  // };
  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div
          className="card  card-body blur shadow-blur  p-0 overflow-hidden mt-3 container-fluid"
          style={{ width: "93%" }}
        >
          <nav
            className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
            id="navbarBlur"
            navbar-scroll="true"
          >
            <div className="container-fluid py-1 px-3">
              <nav aria-label="breadcrumb">
                <h6 className="font-weight-bolder mb-0 ">
                  Profile | Edit Profile{" "}
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
        <div className="editProfile">
          <div className="container">
            <form className="form-horizontal" onSubmit={handleSubmit}>
              <div className="form-flex-container">
                <div className="panel panel-default">
                  <div
                    className="panel-body text-center "
                    style={{ position: "relative" }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{
                        fontSize: "24px",
                        color: "white",
                        cursor: "pointer",
                        position: "absolute",
                        top: "7%",
                        left: "92%",
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
                      className="img-thumbnail"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div className=" form-flex-item">
                  <div className="card panel panel-default ">
                    <div className="panel-heading ">
                      <h4 className="panel-title">User info</h4>
                    </div>
                    <div className="panel-body card">
                      <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          value={username}
                          name="username"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label">Email Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />
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
                        <label className="control-label">Description</label>
                        <textarea
                          className="form-control"
                          style={{ height: "180px" }}
                          name="description"
                          placeholder={
                            description === "null" ? "No Description" : ""
                          }
                          value={description === "null" ? "" : description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="form-group ">
                        <button type="submit" className="btn btn-primary me-3">
                          Submit
                        </button>
                        <button
                          type="reset"
                          className="btn btn-default"
                          onClick={() => navigate("/profile")}
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
      </main>
    </>
  );
};

export default Editprofile;
