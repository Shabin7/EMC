import React from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../Component/Admin/SidebarAdmin";
import NavbarAdmin from "../../Component/Admin/NavbarAdmin";
const AdminTimeSheet = () => {
  return (
    <div className="d-flex bg-secondary-subtle" id="wrapper">
      <SidebarAdmin />
      <div className="w-100" id="page-content-wraper">
        <NavbarAdmin />
        <h3 className="my-4 mx-2 p-2 rounded text-center bg-white">
          Calender Managment
        </h3>
        <div className="d-flex justify-content-between p-2">
          <Link to="/admin/leaverequest" className="btn btn-outline-primary m-1 p-4">
            <i className="bi bi-hourglass-split p-2"></i>
            Leave Request
          </Link>
          <Link to='/admin/rejectedleaverequest' className="btn btn-outline-danger m-1 p-4">
            <i className="bi bi-x-circle p-2"></i>
            Rejected Leave Request
          </Link>
          <Link to="/admin/approvedleaverequest" className="btn btn-outline-success m-1 p-4">
            <i className="bi bi-check-circle p-2"></i>
            Approved Leave Request
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminTimeSheet;
