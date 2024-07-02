// Breadcrumbs.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x && isNaN(x));

  const customMappings = {
    "team-management": "Team",
    "admin-data": "Team / View Team Member",
    "edit-member": "Team / Edit Team Member",
    "add-member": "Team / Add Team Member",
    "providerList": "Service Provider",
    "provider": "Service Provider / View Provider",
    "edit-provider": "Service Provider / Edit Provider",
    "add-provider": "Service Provider / Add Provider",
    "customers": "Customers",
    "edit-customer": "Customers / Edit Customer",
    "add-customer": "Customers / Add Customer",
    "user-data": "Customers / View Customer"
    // Add more custom mappings as needed
  };

  return (
    <div className="container-fluid main-content position-relative max-height-vh-100 h-100 border-radius-lg">
      <div className="card card-body blur shadow-blur p-1 overflow-hidden">
        <div className="container-fluid p-2">
          <div className="row" aria-label="breadcrumb">
            <div className="col">
              <ol className="breadcrumb bg-transparent mb-0 p-0" style={{ display: 'flex', alignItems: 'center' }}>
                <h6 className="font-weight-bolder mt-1 px-2 mb-0 p-0 breadcrumb-item" style={{ fontSize: '18px' }}>
                  <Link to="/">Dashboard</Link>
                </h6>
                {pathnames.map((value, index) => {
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathnames.length - 1;
                  const displayValue = customMappings[value] || value; // Check for custom mappings
                  return (
                    <h6
                      key={to}
                      className={`breadcrumb-item mt-1 px-2 mb-0 p-0 ${isLast ? "active" : ""}`}
                    >
                      {isLast ? (
                        <span>{displayValue}</span>
                      ) : (
                        <Link to={to}>{displayValue}</Link>
                      )}
                    </h6>
                  );
                })}
              </ol>
            </div>
            <div className="col">
              <button
                className="btn btn-primary m-0 float-end"
                type="button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumbs;
