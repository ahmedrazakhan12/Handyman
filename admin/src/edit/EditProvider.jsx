import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const EditProvider = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [pfpImage, setPfpImage] = useState(null); // Separate state for the file
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/provider/providers/${id}`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Added dependency array to avoid continuous fetching

  const handleChange = (e) => {
    if (e.target.name === "pfpImage") {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImagePreviewUrl(imageUrl);
        // Use 'imageUrl' as needed, e.g., setting state for previewing images
      } else {
        setImagePreviewUrl("../assets/img/no-dp.jpg");
      }
      //   console.log("File: ", file);
      setPfpImage(file);
      //   setImagePreviewUrl(URL.createObjectURL(file)); // Create a URL for the selected file
    } else {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("country", data.country);
    formData.append("region", data.region);
    formData.append("city", data.city);
    formData.append("postalCode", data.postalCode);
    formData.append("area", data.area);
    formData.append("address", data.address);
    formData.append("service", data.service);
    if (pfpImage) {
      formData.append("pfpImage", pfpImage);
    }

    axios
      .put(`http://localhost:5000/provider/providers/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Provider Updated Successfully",
          timer: 1000,
        });
        navigate("/providerList");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProvider = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/provider/providers/${id}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Provider Deleted Successfully",
              timer: 1000,
            });
            navigate("/providerList");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <>
      <Sidebar />
      <main className="main-content position-relative border-radius-lg ">
        <Navbar />
        <div className="container-fluid py-4 main-content position-relative border-radius-lg pb-4 ">
          <div className="card card-body blur shadow-blur p-0 overflow-hidden">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <h6 className="font-weight-bolder mb-0 ">
                    Provider | Provider Lists | Edit Provider
                  </h6>
                </nav>
                <div
                  className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
                  id="navbar"
                >
                  <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                  <ul className="navbar-nav justify-content-end">
                    <li className="nav-item d-flex align-items-center ">
                      <button
                        className="btn btn-primary m-0"
                        onClick={() => navigate("/providerList")}
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

          {/* form */}
          <div className="card team-details mt-3">
            <div className="card-body">
              <ul
                className="nav nav-tabs"
                style={{ display: "flex", alignItems: "center" }}
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#moderators"
                  >
                    Overview
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#booking">
                    Booking
                  </a>
                </li>
                <li className="nav-item" style={{ marginLeft: "auto" }}>
                  <button
                    className="btn btn-primary"
                    onClick={handleDeleteProvider}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      style={{
                        fill: "white",
                        height: "15px",
                        width: "17px",
                        marginBottom: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                    </svg>{" "}
                    Delete User
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-3 p-0">
                <form action="" onSubmit={handleSumbit}>
                  <div id="moderators" className="tab-pane fade show active">
                    <div className="row">
                      <div
                        className="col-lg-3 col-md-12 "
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s ease", // Added transition for the container
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div>
                          <div
                            className="hover-overlay img-thumbnail"
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "90%",
                              marginLeft: "5%",
                              height: "320px",
                              opacity: isHovered ? 1.8 : 0, // Adjust opacity based on isHovered state
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              transition: "opacity 0.3s ease",
                              overflow: "hidden", // Added transition for opacity change
                              // overflow:'hidden'
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              style={{
                                fill: "white",
                                height: "25px",
                                position: "absolute",
                                top: 10,
                                left: 125,
                                width: "90%",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                if (
                                  imagePreviewUrl === "../assets/img/no-dp.jpg"
                                ) {
                                  return Swal.fire({
                                    title: "No Profile Picture?",
                                    text: "No image selected.",
                                    icon: "warning",
                                    confirmButtonColor: "#3085d6",
                                  });
                                }
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You are about to reset the profile picture. This action cannot be undone.",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#3085d6",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, reset it!",
                                  cancelButtonText: "Cancel",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    // User confirmed, proceed with action
                                    setPfpImage("null1");
                                    setImagePreviewUrl(
                                      "../assets/img/no-dp.jpg"
                                    );
                                    Swal.fire(
                                      "Reset!",
                                      "Your profile picture has been reset.",
                                      "success"
                                    );
                                  }
                                });
                              }}
                            >
                              <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                            </svg>
                            <input
                              type="file"
                              style={{
                                width: "100%",
                                position: "absolute",
                                height: "100%",
                                cursor: "pointer",
                                marginTop: "80px",
                                opacity: 0,
                                // marginLeft:"-500px"
                              }}
                              accept="image/png, image/jpeg"
                              name="pfpImage"
                              onChange={handleChange}
                            />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              // Adjust opacity based on isHovered state
                              style={{ width: "10vw", fill: "white" }}
                            >
                              <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                            </svg>
                          </div>
                          <img
                            src={
                              imagePreviewUrl ||
                              data.pfpImage ||
                              "../assets/img/no-dp.jpg"
                            }
                            className="form img-thumbnail"
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "320px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-lg-9 col-md-12 ">
                        <div className="card-body p-1">
                          <ul className="list-group ">
                            <div className="row ">
                              <div className="col-lg-6">
                                <li className="list-group-item border-0 text-sm text-capitalize">
                                  <strong className="text-dark">Name:</strong>{" "}
                                  <input
                                    type="text"
                                    className="form-control m-0"
                                    name="name"
                                    value={data.name || ""}
                                    onChange={handleChange}
                                  />
                                </li>
                                <li className="list-group-item border-0 text-capitalize">
                                  <strong className="text-dark text-sm">
                                    Select Provider Type:
                                  </strong>{" "}
                                  <select
                                    required
                                    className="form-select w-150"
                                    aria-label="Select Service Provider Type"
                                    name="service"
                                    onChange={handleChange} // Replace handleChange with your actual handler function
                                  >
                                    <option value="">
                                      Select Service Provider Type
                                    </option>
                                    <option value="electrician">
                                      Electrician
                                    </option>
                                    <option value="plumber">Plumber</option>
                                    <option value="carpenter">Carpenter</option>
                                    <option value="painter">Painter</option>
                                    <option value="hvac-technician">
                                      HVAC Technician
                                    </option>
                                    <option value="landscaper">
                                      Landscaper/Gardener
                                    </option>
                                    <option value="handyman">
                                      General Handyman
                                    </option>
                                    <option value="cleaner">Cleaner</option>
                                    <option value="pest-control">
                                      Pest Control Specialist
                                    </option>
                                    <option value="locksmith">Locksmith</option>
                                  </select>
                                </li>
                                <li className="list-group-item border-0 text-capitalize">
                                  <strong className="text-dark text-sm">
                                    Country:
                                  </strong>{" "}
                                  <input
                                    type="text"
                                    className="form-control m-0"
                                    name="country"
                                    value={data.country || ""}
                                    onChange={handleChange}
                                  />
                                </li>
                                <li className="list-group-item border-0 text-capitalize">
                                  <strong className="text-dark text-sm">
                                    City:
                                  </strong>{" "}
                                  <input
                                    type="text"
                                    className="form-control m-0"
                                    name="city"
                                    value={data.city || ""}
                                    onChange={handleChange}
                                  />
                                </li>
                              </div>
                              <div className="col-lg-6">
                                <li className="list-group-item border-0 text-sm">
                                  <strong className="text-dark">Email:</strong>{" "}
                                  <input
                                    type="text"
                                    className="form-control m-0"
                                    name="email"
                                    value={data.email || ""}
                                    onChange={handleChange}
                                  />
                                </li>

                                <li className="list-group-item border-0 text-sm">
                                  <strong className="text-dark">
                                    Contact:
                                  </strong>{" "}
                                  <input
                                    type="number"
                                    className="form-control m-0"
                                    name="contact"
                                    value={data.contact || ""}
                                    onChange={handleChange}
                                  />
                                </li>

                                <li className="list-group-item border-0 text-sm">
                                  <strong className="text-dark">State:</strong>{" "}
                                  <input
                                    type="text"
                                    className="form-control m-0"
                                    name="region"
                                    value={data.region || ""}
                                    onChange={handleChange}
                                  />
                                </li>

                                <li className="list-group-item border-0 text-capitalize">
                                  <strong className="text-dark text-sm">
                                    Postal Code:
                                  </strong>{" "}
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="postalCode"
                                    value={data.postalCode || ""}
                                    onChange={handleChange}
                                  />
                                </li>
                              </div>
                            </div>
                          </ul>
                        </div>
                      </div>
                      <ul className="list-group">
                        <li className="list-group-item border-0 text-sm">
                          <strong className="text-dark">Address:</strong>{" "}
                          <textarea
                            name="address"
                            value={data.address || ""}
                            className="form-control"
                            style={{ minHeight: "100px" }}
                            onChange={handleChange}
                          ></textarea>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div id="booking" className="tab-pane fade">
                    {/* Content for Booking tab goes here */}
                    <p>This is the booking tab content.</p>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Save
                  </button>
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
                          navigate("/providerList");
                        }
                      });
                    }}
                    className="btn btn-secondary me-2"
                    style={{ float: "right" }}
                  >
                    Cancel
                  </button>
                  {/* <button
                      type="button"
                      className="btn btn-secondary me-3"
                      style={{ float: "right" }}
                    >
                      Cancel
                    </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditProvider;
