import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";

const ProviderView = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({});
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
  }, [id]);

  const [serviceData, setServiceData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/booking/getServicebooking/${id}`)
      .then((res) => {
        setServiceData(res.data.data);
        console.log("Data:  ", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Number of cards per page

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Status filter
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "completed", "pending", "cancel"

  // Filtered data
  const [filteredData, setFilteredData] = useState([]);

  // Effect to filter data when serviceData, searchTerm or statusFilter changes
  useEffect(() => {
    let filteredPosts = serviceData.filter((item) =>
      item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (statusFilter !== "all") {
      filteredPosts = filteredPosts.filter(
        (item) => item.status.toLowerCase() === statusFilter
      );
    }

    setFilteredData(filteredPosts);
    setCurrentPage(1); // Reset to first page when filters change
  }, [serviceData, searchTerm, statusFilter]);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // Next page handler
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const totalPages = Math.ceil(serviceData.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative border-radius-lg">
        <Navbar />
        <div className="container-fluid py-4 main-content position-relative border-radius-lg pb-4">
          <div className="card card-body blur shadow-blur p-0 overflow-hidden">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb">
                  <h6 className="font-weight-bolder mb-0 ">
                    Provider | Provider Lists | Service Provider
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

          <div className="card team-details mt-3">
            <div className="card-body">
              <div>
                <div className="row">
                  <div
                    className="col-lg-3 col-md-12 "
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease", // Added transition for the container
                    }}
                  >
                    <div>
                      <img
                        src={data.pfpImage || "../assets/img/no-dp.jpg"}
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
                              <span style={{ display: "block" }}>
                                {data.name || ""}
                              </span>
                            </li>
                            <li className="list-group-item border-0 text-capitalize">
                              <strong className="text-dark text-sm">
                                 Provider Type:
                              </strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.service || ""}
                              </span>
                            </li>
                            <li className="list-group-item border-0 text-capitalize">
                              <strong className="text-dark text-sm">
                                Country:
                              </strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.country || ""}
                              </span>
                            </li>
                            <li className="list-group-item border-0 text-capitalize">
                              <strong className="text-dark text-sm">
                                City:
                              </strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.city || ""}
                              </span>
                            </li>
                          </div>
                          <div className="col-lg-6">
                            <li className="list-group-item border-0 text-sm">
                              <strong className="text-dark">Email:</strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.email || ""}
                              </span>
                            </li>

                            <li className="list-group-item border-0 text-sm">
                              <strong className="text-dark">Contact:</strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.contact || ""}
                              </span>
                            </li>

                            <li className="list-group-item border-0 text-sm">
                              <strong className="text-dark">State:</strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.region || ""}
                              </span>
                            </li>

                            <li className="list-group-item border-0 text-capitalize">
                              <strong className="text-dark text-sm">
                                Postal Code:
                              </strong>{" "}
                              <span style={{ display: "block" }}>
                                {data.postalCode || ""}
                              </span>
                            </li>
                          </div>
                          <div className="row">
                            <div className="col">
                              <li className="list-group-item border-0 text-sm">
                                <strong className="text-dark">Address:</strong>{" "}
                                <span style={{ display: "block" }}>
                                  {data.address || ""}
                                </span>
                              </li>
                            </div>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card mt-4 p-4">
            <ul className="nav nav-tabs">
              {/* <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#moderators"
                  >
                    Overview
                  </a>
                </li> */}
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#booking">
                  Booking
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#rating">
                  Ratings
                </a>
              </li>
            </ul>

            <div className="tab-content mt-3 p-0">
              <div id="booking" className="tab-pane fade show active">
                <div className="row">
                  <div className="col-lg-12 mb-0">
                    <input
                      type="text"
                      className="form-control mb-2 w-20"
                      style={{ float: "right" }}
                      placeholder="Search by name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                      className="btn btn-light me-3 m-0"
                      style={{ float: "right" }}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option className="text-center" value="all">
                        All Status
                      </option>
                      <option className="text-center" value="completed">
                        Completed
                      </option>
                      <option className="text-center" value="pending">
                        Pending
                      </option>
                      {/* Uncomment the line below if needed */}
                      {/* <option className="text-center" value="cancel">Cancelled</option> */}
                    </select>
                  </div>
                  {/* {currentPosts.map((item, index) => ( */}
                  <div className="col-lg-12 col-md-12" style={{overflow: "scroll"}}>
                    <table
                      className="table align-items-center"
                      style={{ marginTop: "10px" , overflow: "scroll"}}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "5px" }}></th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            Name
                          </th>
                          <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                            Order Placed
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            status
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            service
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            payment
                          </th>
                          <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                            payment
                          </th>
                          {/* <th className="text-secondary opacity-7" /> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentPosts.map((item, index) => (
                          <tr key={item.id}>
                            <td >{index + 1}.</td>
                            <td>
                              <div className="d-flex py-1">
                                <div>
                                  <span className="text-xs text-secondary mb-0 me-2"></span>
                                  {item.user.pfpImage ? (
                                    <img
                                      src={item.user.pfpImage}
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
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm text-capitalize">
                                    {item.user.name}
                                  </h6>
                                  <p className="text-xs text-secondary mb-0">
                                    {item.user.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle  text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {item.status}
                              </p>
                            </td>
                            <td className="align-middle text-center text-sm">
                              <p className="text-xs font-weight-bold mb-0">
                                {item.service}
                              </p>
                            </td>
                            <td className="align-middle text-center">
                              <p className="text-xs font-weight-bold mb-0">
                                {item.payment_status}
                              </p>
                            </td>
                            <td className="align-middle text-center">
                              <p className="text-xs font-weight-bold mb-0">
                                {item.notes}
                              </p>
                            </td>
                          </tr>                          
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* ))} */}
                </div>
                {currentPosts.length === 0 && (
                  <div className="text-center">
                    <p>No results found.</p>
                  </div>
                )}
                {/* Pagination */}
                <nav className="mt-2" style={{marginBottom:'-25px'}}>
                  <ul className="pagination justify-content-center">
                    <Pagination.Prev
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    />

                    {Array.from(
                      {
                        length: Math.ceil(filteredData.length / postsPerPage),
                      },
                      (_, index) => (
                        <li
                          className={`page-item ${
                            index + 1 === currentPage ? "active" : ""
                          }`}
                          key={index}
                        >
                          <button
                            className={
                              index === currentPage - 1
                                ? "text-light page-link m-0"
                                : "text-dark page-link m-0"
                            }
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                    <Pagination.Next
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                    />
                  </ul>
                </nav>
              </div>
              <div id="rating" className="tab-pane fade">
                Ratings
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProviderView;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const ProviderView = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState({});
//   const { id } = useParams();

//   useEffect(() => {
//     axios
//       .get(http://localhost:5000/provider/providers/${id})
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);

//   const [serviceData, setServiceData] = useState([]);
//   useEffect(() => {
//     axios
//       .get(http://localhost:5000/booking/getServicebooking/${id})
//       .then((res) => {
//         setServiceData(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]);

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(3); // Number of cards per page

//   // Search
//   const [searchTerm, setSearchTerm] = useState("");

//   // Status filter
//   const [statusFilter, setStatusFilter] = useState("all"); // "all", "completed", "pending", "cancel"

//   // Get current posts after filtering with search term and status
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;

//   let filteredPosts = serviceData.filter((item) =>
//     item.user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (statusFilter !== "all") {
//     filteredPosts = filteredPosts.filter(
//       (item) => item.status.toLowerCase() === statusFilter
//     );
//   }

//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <>
//       <Sidebar />
//       <main className="main-content position-relative border-radius-lg ">
//         <Navbar />
//         <div className="container-fluid py-4  main-content position-relative border-radius-lg pb-4 ">
//           <div className="card  card-body blur shadow-blur  p-0 overflow-hidden">
//             <nav
//               className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
//               id="navbarBlur"
//               navbar-scroll="true"
//             >
//               <div className="container-fluid py-1 px-3">
//                 <nav aria-label="breadcrumb">
//                   <h6 className="font-weight-bolder mb-0 ">
//                     Provider | Provider Lists | Service Provider
//                   </h6>
//                 </nav>
//                 <div
//                   className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
//                   id="navbar"
//                 >
//                   <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
//                   <ul className="navbar-nav  justify-content-end">
//                     <li className="nav-item d-flex align-items-center ">
//                       <button
//                         className="btn btn-primary m-0"
//                         onClick={() => navigate("/providerList")}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width={18}
//                           height={18}
//                           style={{ marginRight: "4px", marginTop: "-5px" }}
//                           viewBox="0 0 512 512"
//                         >
//                           <path
//                             fill="white"
//                             d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"
//                           />
//                         </svg>{" "}
//                         <span className="">Back</span>
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//           </div>

//           <div className="card team-details mt-3">
//             <div className="card-body">
//               <ul className="nav nav-tabs">
//                 <li className="nav-item">
//                   <a
//                     className="nav-link active"
//                     data-toggle="tab"
//                     href="#moderators"
//                   >
//                     Overview
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" data-toggle="tab" href="#booking">
//                     Booking
//                   </a>
//                 </li>
//               </ul>

//               <div className="tab-content mt-3 p-0">
//                 <div id="moderators" className="tab-pane fade show active">
//                   <div className="row">
//                     <div className="col-lg-3 col-md-12">
//                       {data.pfpImage ? (
//                         <img
//                           src={data.pfpImage}
//                           className="img-thumbnail"
//                           style={{
//                             width: "100%",
//                             height: "280px",
//                             objectFit: "cover",
//                           }}
//                           alt="Profile"
//                         />
//                       ) : (
//                         <img
//                           src="../assets/img/no-dp.jpg"
//                           className="img-thumbnail"
//                           alt="No Profile Picture"
//                         />
//                       )}
//                     </div>
//                     <div className="col-lg-9 col-md-12 ">
//                       <div className="card-body p-1">
//                         <ul className="list-group ">
//                           <div className="row ">
//                             <div className="col-lg-6">
//                               <li className="list-group-item border-0 ps-0  text-sm text-capitalize">
//                                 <strong className="text-dark">
//                                   Full Name:
//                                 </strong>{" "}
//                                 {data.name}
//                                 &nbsp;
//                               </li>
//                               <li className="list-group-item border-0 ps-0 text-capitalize">
//                                 <strong className="text-dark text-sm">
//                                   Country:
//                                 </strong>{" "}
//                                 {data.country}
//                                 &nbsp;
//                               </li>
//                               <li className="list-group-item border-0 ps-0  text-capitalize">
//                                 <strong className="text-dark text-sm">
//                                   City:
//                                 </strong>{" "}
//                                 {data.city}
//                                 &nbsp;
//                               </li>

//                               <li className="list-group-item border-0 ps-0  text-capitalize">
//                                 <strong className="text-dark text-sm">
//                                   Joining date:
//                                 </strong>{" "}
//                                 {new Date(data.createdAt).toDateString()}
//                                 &nbsp;
//                               </li>
//                             </div>
//                             <div className="col-lg-6">
//                               <li className="list-group-item border-0 ps-0 text-sm">
//                                 <strong className="text-dark">Email:</strong>{" "}
//                                 &nbsp;
//                                 {data.email}
//                               </li>

//                               <li className="list-group-item border-0 ps-0  text-capitalize">
//                                 <strong className="text-dark text-sm">
//                                   Service:
//                                 </strong>{" "}
//                                 {data.service}
//                                 &nbsp;
//                               </li>

//                               <li className="list-group-item border-0 ps-0 text-sm">
//                                 <strong className="text-dark">Contact:</strong>{" "}
//                                 {data.contact}
//                                 &nbsp;
//                               </li>
//                               {/* <li className="list-group-item mt-2 border-0 ps-0  text-capitalize">
//                                 <strong className="text-dark text-sm">
//                                   Area:
//                                 </strong>{" "}
//                                 {data.area}
//                                 &nbsp;
//                               </li> */}
//                             </div>
//                           </div>
//                           <li className="list-group-item border-0 ps-0 text-sm">
//                             <strong className="text-dark">Address:</strong>{" "}
//                             {data.address}
//                             &nbsp;
//                           </li>
//                           <li className="list-group-item border-0 ps-0  text-capitalize">
//                             <strong className="text-dark text-sm">
//                               Postal Code:
//                             </strong>{" "}
//                             {data.postalCode}
//                             &nbsp;
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div id="booking" className="tab-pane fade">
//                   <div className="row">
//                     <div className="col-lg-12 mb-3">
//                       <input
//                         type="text"
//                         className="form-control mb-2 w-20"
//                         style={{ float: "right" }}
//                         placeholder="Search by name..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                       <select
//                         className="btn btn-light me-3 m-0"
//                         style={{ float: "right" }}
//                         value={statusFilter}
//                         onChange={(e) => setStatusFilter(e.target.value)}
//                       >
//                         <option className="text-center" value="all">
//                           All Status
//                         </option>
//                         <option className="text-center" value="completed">
//                           Completed
//                         </option>
//                         <option className="text-center" value="pending">
//                           Pending
//                         </option>
//                         {/* Uncomment the line below if needed */}
//                         {/* <option className="text-center" value="cancel">Cancelled</option> */}
//                       </select>
//                     </div>
//                     {currentPosts.map((item, index) => (
//                       <div className="col-lg-6 col-md-12" key={index}>
//                         <div
//                           className="card mb-3 shadow-lg"
//                           style={{ width: "100%", padding: "10px" }}
//                         >
//                           <div className="row no-gutters">
//                             <div className="col-md-4">
//                               <img
//                                 src={
//                                   item.user.pfpImage ||
//                                   "../assets/img/no-dp.jpg"
//                                 }
//                                 className="card-img"
//                                 style={{
//                                   width: "200px",
//                                   height: "200px",
//                                   objectFit: "cover",
//                                 }}
//                                 alt="..."
//                               />
//                             </div>
//                             <div className="col-md-8">
//                               <div className="card-body">
//                                 <div className="d-flex flex-column justify-content-center">
//                                   <h6 className="mb-0 card-title text-capitalize">
//                                     {index + 1}. {item.user.name}
//                                   </h6>
//                                   <p className="text-xs text-secondary mb-0">
//                                     Email: {item.user.email}
//                                   </p>
//                                 </div>

//                                 <p className="card-text">
//                                   <small className="text-muted">
//                                     Service: {item.service}
//                                   </small>
//                                   <br />
//                                   <small className="text-muted">
//                                     Status: {item.status}
//                                   </small>
//                                   <br />
//                                   <small className="text-muted">
//                                     Last updated:{" "}
//                                     {new Date(item.createdAt).toDateString()}
//                                   </small>
//                                   <br />
//                                   <small className="text-muted">
//                                     Payment: {item.payment_status}
//                                   </small>
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   {currentPosts.length === 0 && (
//                     <div className="text-center">
//                       <p>No results found.</p>
//                     </div>
//                   )}
//                   {/* Pagination */}
//                   <nav className="mt-4">
//                     <ul className="pagination justify-content-center">
//                       {Array.from(
//                         {
//                           length: Math.ceil(
//                             filteredPosts.length / postsPerPage
//                           ),
//                         },
//                         (_, index) => (
//                           <li
//                             className={page-item ${
//                               index + 1 === currentPage ? "active" : ""
//                             }}
//                             key={index}
//                           >
//                             <button
//                               className={
//                                 index === currentPage - 1
//                                   ? " text-light page-link"
//                                   : "text-dark page-link"
//                               }
//                               onClick={() => paginate(index + 1)}
//                             >
//                               {index + 1}
//                             </button>
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   </nav>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default ProviderView;

// <div className="card team-details mt-3">
// <div className="card-body">
//   <ul className="nav nav-tabs">
//     <li className="nav-item">
//       <a
//         className="nav-link active"
//         data-toggle="tab"
//         href="#moderators"
//       >
//         Overview
//       </a>
//     </li>
//     <li className="nav-item">
//       <a className="nav-link" data-toggle="tab" href="#booking">
//         Booking
//       </a>
//     </li>
//   </ul>

//   <div className="tab-content mt-3 p-0">
//     <div id="moderators" className="tab-pane fade show active">
//       <div className="row">
//         <div className="col-lg-3 col-md-12">
//           {data.pfpImage ? (
//             <img
//               src={data.pfpImage}
//               className="img-thumbnail"
//               style={{
//                 width: "100%",
//                 height: "280px",
//                 objectFit: "cover",
//               }}
//               alt="Profile"
//             />
//           ) : (
//             <img
//               src="../assets/img/no-dp.jpg"
//               className="img-thumbnail"
//               alt="No Profile Picture"
//             />
//           )}
//         </div>
//         <div className="col-lg-9 col-md-12 ">
//           <div className="card-body p-1">
//             <ul className="list-group ">
//               <div className="row ">
//                 <div className="col-lg-6">
//                   <li className="list-group-item border-0 ps-0  text-sm text-capitalize">
//                     <strong className="text-dark">
//                       Full Name:
//                     </strong>{" "}
//                     {data.name}
//                     &nbsp;
//                   </li>
//                   <li className="list-group-item border-0 ps-0 text-capitalize">
//                     <strong className="text-dark text-sm">
//                       Country:
//                     </strong>{" "}
//                     {data.country}
//                     &nbsp;
//                   </li>
//                   <li className="list-group-item border-0 ps-0  text-capitalize">
//                     <strong className="text-dark text-sm">
//                       City:
//                     </strong>{" "}
//                     {data.city}
//                     &nbsp;
//                   </li>

//                   <li className="list-group-item border-0 ps-0  text-capitalize">
//                     <strong className="text-dark text-sm">
//                       Joining date:
//                     </strong>{" "}
//                     {new Date(data.createdAt).toDateString()}
//                     &nbsp;
//                   </li>
//                 </div>
//                 <div className="col-lg-6">
//                   <li className="list-group-item border-0 ps-0 text-sm">
//                     <strong className="text-dark">Email:</strong>{" "}
//                     &nbsp;
//                     {data.email}
//                   </li>

//                   <li className="list-group-item border-0 ps-0  text-capitalize">
//                     <strong className="text-dark text-sm">
//                       Service:
//                     </strong>{" "}
//                     {data.service}
//                     &nbsp;
//                   </li>

//                   <li className="list-group-item border-0 ps-0 text-sm">
//                     <strong className="text-dark">Contact:</strong>{" "}
//                     {data.contact}
//                     &nbsp;
//                   </li>
//                   {/* <li className="list-group-item mt-2 border-0 ps-0  text-capitalize">
//                     <strong className="text-dark text-sm">
//                       Area:
//                     </strong>{" "}
//                     {data.area}
//                     &nbsp;
//                   </li> */}
//                 </div>
//               </div>
//               <li className="list-group-item border-0 ps-0 text-sm">
//                 <strong className="text-dark">Address:</strong>{" "}
//                 {data.address}
//                 &nbsp;
//               </li>
//               <li className="list-group-item border-0 ps-0  text-capitalize">
//                 <strong className="text-dark text-sm">
//                   Postal Code:
//                 </strong>{" "}
//                 {data.postalCode}
//                 &nbsp;
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//     <div id="booking" className="tab-pane fade">
//       <div className="row">
//         <div className="col-lg-12 mb-3">
//           <input
//             type="text"
//             className="form-control mb-2 w-20"
//             style={{ float: "right" }}
//             placeholder="Search by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <select
//             className="btn btn-light me-3 m-0"
//             style={{ float: "right" }}
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option className="text-center" value="all">
//               All Status
//             </option>
//             <option className="text-center" value="completed">
//               Completed
//             </option>
//             <option className="text-center" value="pending">
//               Pending
//             </option>
//             {/* Uncomment the line below if needed */}
//             {/* <option className="text-center" value="cancel">Cancelled</option> */}
//           </select>
//         </div>
//         {currentPosts.map((item, index) => (
//           <div className="col-lg-6 col-md-12" key={index}>
//             <div
//               className="card mb-3 shadow-lg"
//               style={{ width: "100%", padding: "10px" }}
//             >
//               <div className="row no-gutters">
//                 <div className="col-md-4">
//                   <img
//                     src={
//                       item.user.pfpImage ||
//                       "../assets/img/no-dp.jpg"
//                     }
//                     className="card-img"
//                     style={{
//                       width: "200px",
//                       height: "200px",
//                       objectFit: "cover",
//                     }}
//                     alt="..."
//                   />
//                 </div>
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <div className="d-flex flex-column justify-content-center">
//                       <h6 className="mb-0 card-title text-capitalize">
//                         {index + 1}. {item.user.name}
//                       </h6>
//                       <p className="text-xs text-secondary mb-0">
//                         Email: {item.user.email}
//                       </p>
//                     </div>

//                     <p className="card-text">
//                       <small className="text-muted">
//                         Service: {item.service}
//                       </small>
//                       <br />
//                       <small className="text-muted">
//                         Status: {item.status}
//                       </small>
//                       <br />
//                       <small className="text-muted">
//                         Last updated:{" "}
//                         {new Date(item.createdAt).toDateString()}
//                       </small>
//                       <br />
//                       <small className="text-muted">
//                         Payment: {item.payment_status}
//                       </small>
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {currentPosts.length === 0 && (
//         <div className="text-center">
//           <p>No results found.</p>
//         </div>
//       )}
//       {/* Pagination */}
//       <nav className="mt-4">
//         <ul className="pagination justify-content-center">
//      <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />

//           {Array.from(
//             { length: Math.ceil(filteredData.length / postsPerPage) },
//             (_, index) => (
//               <li
//                 className={`page-item ${
//                   index + 1 === currentPage ? "active" : ""
//                 }`}
//                 key={index}
//               >
//                 <button
//                   className={
//                     index === currentPage - 1
//                       ? "text-light page-link"
//                       : "text-dark page-link"
//                   }
//                   onClick={() => paginate(index + 1)}
//                 >
//                   {index + 1}
//                 </button>
//               </li>
//             )
//           )}
//         <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />

//         </ul>
//       </nav>
//     </div>
//   </div>
// </div>
// </div>
