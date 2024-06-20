import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";

const Editprofile = () => {
  const { id } = useParams();
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
    if (id) {
      axios
        .get(`http://localhost:5000/admin/team/${id}`, {
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
      navigate("/team-management");
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
        await axios.delete(
          `http://localhost:5000/admin/team/delete/${adminData.id}`
        );
        Swal.fire({
          title: "Deleted!",
          text: "The admin has been deleted.",
          icon: "success",
          timer: 1000,
        });

        navigate("/team-management");
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
          .put(`http://localhost:5000/admin/imageDel/${adminData.id}`)
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
        <div className="d-flex justify-content-between align-items-center me-5">
          <h3
            className="text-uppercase"
            style={{ marginLeft: "32px", marginTop: "12px" }}
          >
            Edit {adminData.name}
          </h3>
          <h3>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ fontSize: "24px", color: "#AB1402", cursor: "pointer" }}
              onClick={handleDelete}
            />
          </h3>
        </div>
        <div className="container-fluid main-content position-relative">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card card-registration my-4"
                style={{ overflow: "hidden", borderRadius: ".5rem" }}
              >
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
                      onClick={handleImageDelete}
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
                      <form onSubmit={handleSubmit}>
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

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form3Example8">
                            Role
                          </label>
                          <select
                            className="form-select"
                            name="role"
                            onChange={handleChange}
                          >
                            <option value="admin">Admin</option>
                          </select>
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
                            style={{ height: "295px" }}
                            name="description"
                            value={
                              description === "null" ||
                              description === null ||
                              description === undefined
                                ? ""
                                : description
                            }
                            onChange={handleChange}
                          ></textarea>
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
                      </form>
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

export default Editprofile;
