import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
const ProviderList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust items per page as needed

  useEffect(() => {
    axios
      .get("http://localhost:5000/provider/providers")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error fetching providers:", err);
      });
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    axios
      .get(`http://localhost:5000/provider/search/${searchTerm}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Error searching providers:", err);
      });
  };

  // Pagination handling
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // Next page handler
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Calculate current items to display based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Sidebar />
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />

        <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg">
          <div className="card  card-body blur shadow-blur  p-0 overflow-hidden">
            <nav
              className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
              id="navbarBlur"
              navbar-scroll="true"
            >
              <div className="container-fluid py-1 px-3">
                <nav aria-label="breadcrumb" style={{display:"flex"}}>
                  <h6 className="font-weight-bolder mb-0">
                    Provider | Provider Lists
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
                        className="btn btn-primary m-0 "
                        onClick={() => navigate("/add-provider")}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                          width={20}
                          height={20}
                          style={{ marginRight: "0px", marginTop: "-5px" }}
                        >
                          <path
                            fill="white"
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                          />
                        </svg>{" "}
                        Add provider
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          <div
            className="card-body px-0 pt-0 pt-2 pl-2 pb-1 pe-2 bg-white mt-4 shadow blur border-radius-lg"
            style={{ maxHeight: "90vh" }}
          >
            <div className="table-responsive p-2">
              <div
                style={{
                  float: "right",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
              >
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

              <table className="table align-items-center" style={{ overflow: "scroll", marginTop: "50px" }}>
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
                      contact number
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      service
                    </th>
                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                      action
                    </th>
                    {/* <th className="text-secondary opacity-7" /> */}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}.</td>
                      <td>
                        <div className="d-flex px-2 py-1">
                          <Link to={`/provider/${item.id}`}>
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
                                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                  className="avatar avatar-sm me-3"
                                  alt="user1"
                                />
                              )}
                            </div>
                          </Link>
                          <div className="d-flex flex-column justify-content-center">
                            <Link to={`/provider/${item.id}`}>
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
                      <td className="align-middle text-center text-sm">
                        <p className="text-xs font-weight-bold mb-0">
                          {item.service}
                        </p>
                      </td>
                      <td className="align-middle text-center">
                        <span className="text-secondary text-xs font-weight-bold">
                          <Link
                            to={`/edit-provider/${item.id}`}
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
            <Pagination className="mt-3 justify-content-center " >
            <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />

              {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
                (number) => {
                  // Limit pagination items to maximum of 10
                  if (
                    number < currentPage + 5 &&
                    number >= currentPage - 4 &&
                    number + 1 <= Math.ceil(data.length / itemsPerPage)
                  ) {
                    return (
                      
                      <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => paginate(number + 1)}
                        
                      >
                        <span
                            className={
                              number === currentPage - 1
                                ? " text-light text-xs font-weight-bold"
                                : "text-dark text-xs font-weight-bold"
                            }
                          >
                            {number + 1}
                          </span>
                      </Pagination.Item>
                    );
                  } else {
                    return null;
                  }
                }
              )}
                    <Pagination.Next onClick={nextPage} disabled={currentPage === totalPages} />

            </Pagination>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProviderList;


// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// const ProviderList = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/provider/providers")
//       .then((res) => {
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.log("ahmed", err);
//       });
//   }, []);

//   const handleSearchChange = (e) => {
//     const searchTerm = e.target.value;
//     axios
//       .get(`http://localhost:5000/provider/search/${searchTerm}`)
//       .then((res) => {
//         console.log(res.data);
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const [expandedAddressId, setExpandedAddressId] = useState(null);

//   const toggleExpand = (id) => {
//     setExpandedAddressId(expandedAddressId === id ? null : id);
//   };

//   return (
//     <>
//       <Sidebar />
//       <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
//         <Navbar />

//         <div className="container-fluid py-4  main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
//           <div className="card  card-body blur shadow-blur  p-0 overflow-hidden">
//             <nav
//               className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
//               id="navbarBlur"
//               navbar-scroll="true"
//             >
//               <div className="container-fluid py-1 px-3">
//                 <nav aria-label="breadcrumb">
//                   <h6 className="font-weight-bolder mb-0 ">
//                     Provider | Provider Lists
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
//                         className="btn btn-primary m-0 "
//                         onClick={() => navigate("/add-provider")}
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 640 512"
//                           width={20}
//                           height={20}
//                           style={{ marginRight: "0px", marginTop: "-5px" }}
//                         >
//                           <path
//                             fill="white"
//                             d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
//                           />
//                         </svg>{" "}
//                         Add provider
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//           </div>

//           <div
//             className="card-body px-0 pt-0 pt-2 pl-2 pe-2 bg-white mt-4 shadow blur border-radius-lg"
//             style={{ maxHeight: "90vh" }}
//           >
//             <div className="table-responsive p-2    ">
//               <div
//                 style={{
//                   float: "right",
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                 }}
//               >
//                 <div className="input-group   p-1">
//                   <span className="input-group-text text-body">
//                     <i className="fas fa-search" aria-hidden="true" />
//                   </span>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Type here..."
//                     onChange={handleSearchChange}
//                   />
//                 </div>
//               </div>

//               <div>
//                 {/* <h5 className="text-capitalize text-secondary  font-weight-bolder opacity-8" style={{marginLeft: "2%" , fontSize:'15px'}}>Service Providers</h5> */}
//               </div>
//               <table
//                 className="table align-items-center"
//                 style={{ overflow: "scroll", marginTop: "50px" }}
//               >
//                 <thead>
//                   <tr>
//                     <th style={{ width: "5px" }}></th>
//                     <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
//                       Name
//                     </th>
//                     <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
//                       Joining date
//                     </th>
//                     <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
//                       contact number
//                     </th>
//                     <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
//                       service
//                     </th>

//                     <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
//                       action
//                     </th>

//                     <th className="text-secondary opacity-7" />
//                   </tr>
//                 </thead>
//                 {data.map((item, index) => {
//                   return (
//                     <tbody>
//                       <>
//                         <tr>
//                           <td>{index + 1}.</td>
//                           <td>
//                             <div className="d-flex px-2 py-1">
//                               <Link to={`/provider/${item.id}`}>
//                                 <div>
//                                   <span className="text-xs text-secondary mb-0 me-2"></span>
//                                   {item.pfpImage ? (
//                                     <img
//                                       src={item.pfpImage}
//                                       className="avatar avatar-sm me-3 "
//                                       style={{ objectFit: "cover" }}
//                                       alt="user1"
//                                     />
//                                   ) : (
//                                     <img
//                                       src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                                       className="avatar avatar-sm me-3"
//                                       alt="user1"
//                                     />
//                                   )}
//                                 </div>
//                               </Link>
//                               <div className="d-flex flex-column justify-content-center">
//                                 <Link to={`/provider/${item.id}`}>
//                                   <h6 className="mb-0 text-sm text-capitalize">
//                                     {item.name}
//                                   </h6>
//                                   <p className="text-xs text-secondary mb-0">
//                                     {item.email}
//                                   </p>
//                                 </Link>
//                               </div>
//                             </div>
//                           </td>

//                           <td>
//                             <p className="text-xs font-weight-bold mb-0 ">
//                               {new Date(item.createdAt).toLocaleDateString()}
//                             </p>
//                           </td>
//                           <td className="align-middle text-center text-sm">
//                             <p className="text-xs font-weight-bold mb-0">
//                               {item.contact}
//                             </p>
//                           </td>
//                           <td className="align-middle text-center text-sm">
//                             <p className="text-xs font-weight-bold mb-0">
//                               {item.service}
//                             </p>
//                           </td>

//                           <td className="align-middle text-center">
//                             <span className="text-secondary text-xs font-weight-bold">
//                               <Link
//                                 to={`/edit-provider/${item.id}`}
//                                 className="text-secondary font-weight-bold text-xs"
//                               >
//                                 Edit
//                               </Link>
//                               {/* <button
//                                 className="btn btn-primary"
//                                 style={{
//                                   paddingLeft: "25px",
//                                   paddingRight: "25px",
//                                 }}
//                                 onClick={() =>
//                                   navigate(`/edit-customer/${item.id}`)
//                                 }
//                               >
//                                 Edit
//                               </button> */}
//                             </span>
//                           </td>
//                         </tr>
//                       </>
//                     </tbody>
//                   );
//                 })}
//               </table>
//             </div>
//           </div>
//         </div>

//         <div>
//           {/* <p style={{width:'20px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam magni fugiat fuga quas recusandae sapiente quia dolorem, numquam ab accusantium corporis eius animi dicta voluptates. Saepe ad quia unde laudantium excepturi quae. Voluptas blanditiis pariatur provident fugit omnis quo sed iusto voluptatibus a! Qui illum enim sint maxime sapiente, delectus ut omnis mollitia animi, quam aut, pariatur nulla ullam dolorem corporis odio libero quae eos. Adipisci, sint ea repellendus sequi nobis assumenda deleniti praesentium quos eum fugiat, dolor voluptatibus harum aliquid rem ab veritatis earum itaque consectetur nemo nulla velit eos fugit tenetur. Facere error, qui reprehenderit iure voluptatum itaque cupiditate velit. Harum dolor eaque alias beatae repellendus autem fugit atque accusantium aliquid! Facere tenetur necessitatibus accusamus expedita nulla, obcaecati quisquam voluptate possimus id repellendus maiores placeat eos ipsam, architecto dignissimos animi, omnis reprehenderit? Dolore dignissimos voluptate veniam sequi sunt nihil eligendi, explicabo similique aut aperiam distinctio laboriosam velit veritatis provident et labore consectetur quasi? Ratione voluptatum sequi praesentium quam veniam porro iste minima mollitia, quasi dolorum cum rerum, sapiente earum omnis at assumenda, facere harum incidunt. Nam cupiditate illum quos velit amet, ratione inventore est blanditiis! Reprehenderit eum consequatur esse, culpa minima eius, commodi perferendis consequuntur ratione nam temporibus!</p> */}
//         </div>
//       </main>
//     </>
//   );
// };

// export default ProviderList;

// {
//   /* <span className="text-secondary text-xs font-weight-bold">
//                               {expandedAddressId === item.id ||
//                               item.address.length <= 50 ? (
//                                 <span>{item.address}</span>
//                               ) : (
//                                 <span>{item.address.slice(0, 20)}...</span>
//                               )}
//                               {item.address.length > 50 && (
//                                 <button
//                                   className="p-0"
//                                   style={{
//                                     cursor: "pointer",
//                                     background: "none",
//                                     border: "none",
//                                   }}
//                                   onClick={() => toggleExpand(item.id)}
//                                 >
//                                   {expandedAddressId === item.id
//                                     ? "Read Less"
//                                     : "Read More"}
//                                 </button>
//                               )}
//                             </span> */
// }
// {
//   /* <td className="align-middle text-center text-sm">
//                             <p className="text-xs font-weight-bold mb-0">
//                               {item.country}
//                             </p>
//                           </td>
//                           <td className="align-middle text-center text-sm">
//                             <p className="text-xs font-weight-bold mb-0">
//                               {item.region}
//                             </p>
//                           </td>
//                           <td className="align-middle text-center text-sm">
//                             <p className="text-xs font-weight-bold mb-0">
//                               {item.city}
//                             </p>
//                           </td>
//                           <td className="align-middle text-center text-sm">
//                             <p className="text-xs font-weight-bold mb-0">
//                               {item.postalCode}
//                             </p>
//                           </td>
//                           <td className="align-middle text-center text-sm">
//                             <p className="text-xs font-weight-bold mb-0">
//                               {item.area}
//                             </p>
//                           </td>
//                           <div style={{ marginTop: "12px", width: "400px" }}>
//                             <span className="text-secondary text-xs font-weight-bold">
//                               {expandedAddressId === item.id ||
//                               item.address.length <= 50 ? (
//                                 <span>{item.address} </span>
//                               ) : (
//                                 <span>{item.address.slice(0, 53)}... </span>
//                               )}
//                               {item.address.length > 50 && (
//                                 <button
//                                   className="p-0"
//                                   style={{
//                                     cursor: "pointer",
//                                     background: "none",
//                                     border: "none",
//                                   }}
//                                   onClick={() => toggleExpand(item.id)}
//                                 >
//                                   {expandedAddressId === item.id
//                                     ? " Read Less"
//                                     : " Read More"}
//                                 </button>
//                               )}
//                             </span>
//                           </div> */
// }
