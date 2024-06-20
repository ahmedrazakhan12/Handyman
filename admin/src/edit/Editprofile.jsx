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
      console.error("Failed to Edit-Profile: ", error);
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
        <Navbar />

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
                      onClick={handleImageDelete}
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
                <div className="form-flex-item">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h4 className="panel-title">User info</h4>
                    </div>
                    <div className="panel-body">
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
