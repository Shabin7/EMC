import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Component/Home";
import Login from "./Pages/Employee/Login";
import Signup from "./Pages/Employee/Signup";
import EmployeeHome from "./Pages/Employee/EmployeeHome";
import Paysalary from "./Pages/Admin/Paysalary";
import AllEmployees from "./Pages/Admin/AllEmployees";
import Sidebar from "./Component/Employee/Sidebar";
import Navbar from "./Component/Employee/Navbar";
import NavbarHr from "./Component/HR/NavbarHr";
import SidebarHr from "./Component/HR/SidebarHr";
import NavbarAdmin from "./Component/Admin/NavbarAdmin";
import SidebarAdmin from "./Component/Admin/SidebarAdmin";
import HrHome from "./Pages/HR/HrHome";
import AdminHome from "./Pages/Admin/AdminHome";
import EmployeeProfile from "./Pages/Employee/EmployeeProfile";
import HrandAdminSignup from "./Pages/HR/HRsignup";
import HRLogin from "./Pages/HR/HRLogin";
import AdminSignup from "./Pages/Admin/AdminSignup";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AllPaySalary from "./Pages/Admin/AllPaySalary";
import AddEmployees from "./Pages/Admin/Addemployees";
import EditEmployees from "./Pages/Admin/EditEmployees";
import AllTransactionHistory from "./Pages/Admin/AllTransactionHistory";
import AdminTimeSheet from "./Pages/Admin/AdminTimeSheet";
import EmployeeSalary from "./Pages/Employee/EmployeeSalary";
import CalenderEmployee from "./Pages/Employee/CalenderEmployee";
import ApplyLeaveEmp from "./Pages/Employee/ApplyLeaveEmp";
import Management from "./Pages/Admin/Management";
import EmployeeTickets from "./Pages/Employee/EmployeeTickets";
import EmployeeTasks from "./Pages/Employee/EmployeeTasks";
import LeaveRequest from "./Pages/Admin/LeaveRequest";
import RejectedLeaveRequest from "./Pages/Admin/RejectedLeaveRequest";
import ApprovedLeaveRequest from "./Pages/Admin/ApprovedLeaveRequest";
import AdminHighPriorityTickets from "./Pages/Admin/AdminHighPriorityTickets";
import AdminMediumPriorityTickets from "./Pages/Admin/AdminMediumPriorityTickets";
import AdminLowPriorityTickets from "./Pages/Admin/AdminLowPriorityTickets";
import HrAllEmployees from "./Pages/HR/HrAllEmployees";
import { EmployeeProvider } from "./Contex/EmployeeContex";
import EmployeeLeaveStatus from "./Pages/Employee/EmployeeLeaveStatus";
import ResetPassword from "./Pages/Admin/ResetPassword";
import ResetPasswordEmployee from "./Pages/Employee/ResetPasswordEmployee";
import HrResetPassword from "./Component/HR/HrResetPassword";
import HrAllPaySalary from "./Pages/HR/HrAllPaySalary";
import HrPaysalary from "./Pages/HR/HrPaysalary";
import HrAllTransactionHistory from "./Pages/HR/HrAllTransactionHistory";
import HrEmployeeLeaveRequest from "./Pages/HR/HrEmployeeLeaveRequest";
import HrTimeSheet from "./Pages/HR/HrTimeSheet";
import HrRejectedLeaveRequest from "./Pages/HR/HrRejectedLeaveRequest";
import HrApprovedLeaveRequest from "./Pages/HR/HrApprovedLeaveRequest";
import HrManagement from "./Pages/HR/HrManagement";
import ProtectedRoute from "./Component/ProtectedRoute";
import EmployeeProtectedRoute from "./Component/EmployeeProtectedRoute";
import HrProtectedRoute from "./Component/HrProtectedRoute";

// import withEmployeeProvider from "./Contex/WithEmployeeProviders";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Component starts */}

        {/* Employee starts */}

        <Route path="/navbar" element={<Navbar />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/resetpassword" element={<ResetPasswordEmployee />} />

        {/* Employee ends */}

        {/* Admin starts */}

        <Route path="/navbaradmin" element={<NavbarAdmin />} />
        <Route path="/sidebaradmin" element={<SidebarAdmin />} />
        <Route path="/admin/resetpassword" element={<ResetPassword />} />

        {/* Admin Ends */}

        {/* Component ends */}

        {/* Complete Component Start */}

        <Route path="/" element={<Home />} />

        {/* Employee */}
        {/* Employee Signup */}
        <Route path="/signup" element={<Signup />} />
        {/* Employee Login */}
        <Route path="/login" element={<Login />} />
        {/* Employee Home */}
        <Route path="/employeehome" element={<EmployeeProtectedRoute><EmployeeProvider><EmployeeHome /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/* Employee profile */}
        <Route path="/employeeprofile" element={<EmployeeProtectedRoute><EmployeeProvider><EmployeeProfile /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/* Manage task */}
        <Route path="/employee/employeetasks" element={<EmployeeProtectedRoute><EmployeeProvider><EmployeeTasks /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/* Employee salary details */}
        <Route path="/employee/salary" element={<EmployeeProtectedRoute><EmployeeProvider><EmployeeSalary /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/* Employee Leave request */}
        <Route path="/employee/leaverequest" element={<EmployeeProtectedRoute><EmployeeProvider><LeaveRequest /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/* Related to leave and attendance */}
        <Route path="/employee/calenderemployee" element={<EmployeeProtectedRoute><EmployeeProvider><CalenderEmployee /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/* Applay leave */}
        <Route path="/employee/applyleaveemp" element={<EmployeeProtectedRoute><EmployeeProvider><ApplyLeaveEmp /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/* Employee leave status */}
        <Route path="/employee/leave/status" element={<EmployeeProtectedRoute><EmployeeProvider><EmployeeLeaveStatus /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/* Create tickets */}
        <Route path="/employee/tickets" element={<EmployeeProtectedRoute><EmployeeProvider><EmployeeTickets /></EmployeeProvider></EmployeeProtectedRoute>} />
        {/*  */}


        {/* Admin starts */}

        {/* Signup for admin */}
        <Route path="/adminsignup" element={<AdminSignup />} />
        {/* Login for admin */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        {/* Admin Home page */}
        <Route path="/adminhome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        {/* Add an employee */}
        <Route path="/admin/addemployees" element={<ProtectedRoute><AddEmployees /></ProtectedRoute>} />
        {/* Update an employee */}
        <Route path="/admin/editemployees/:id" element={<ProtectedRoute><EditEmployees /></ProtectedRoute>} />
        {/* List of all employees */}
        <Route path="/allemployees" element={<ProtectedRoute><AllEmployees /></ProtectedRoute>} />
        {/* Payment page of all employee to select one */}
        <Route path="/allsalary" element={<ProtectedRoute><AllPaySalary /></ProtectedRoute>} />
        {/* Pay employee salary */}
        <Route path="/paysalary/:id" element={<ProtectedRoute><Paysalary /></ProtectedRoute>} />
        {/* Transaction history of all employee */}
        <Route path="/admin/transactionhistoty" element={<ProtectedRoute><AllTransactionHistory /></ProtectedRoute>} />
        {/* Manage  All activites , Asign task, View task */}
        <Route path="/admin/management" element={<ProtectedRoute><Management /></ProtectedRoute>} />
        {/* View High priority Tickets */}
        <Route path="/admin/highprioritytickets" element={<ProtectedRoute><AdminHighPriorityTickets /></ProtectedRoute>} />
        {/* View Medium priority Tickets */}
        <Route path="/admin/mediumprioritytickets" element={<ProtectedRoute><AdminMediumPriorityTickets /></ProtectedRoute>} />
        {/* View Low priority Tickets */}
        <Route path="/admin/lowprioritytickets" element={<ProtectedRoute><AdminLowPriorityTickets /></ProtectedRoute>} />
        {/* Acces leave request, approved request and rejected */}
        <Route path="/admin/timesheet" element={<ProtectedRoute><AdminTimeSheet /></ProtectedRoute>} />
        {/* View Leave Request */}
        <Route path="/admin/leaverequest" element={<ProtectedRoute><LeaveRequest /></ProtectedRoute>} />
        {/* Detail of Rejected leave request */}
        <Route path='/admin/rejectedleaverequest' element={<ProtectedRoute><RejectedLeaveRequest /></ProtectedRoute>} />
        {/* Detail of Approved leave request */}
        <Route path="/admin/approvedleaverequest" element={<ProtectedRoute><ApprovedLeaveRequest /></ProtectedRoute>} />


        {/* Admin Ends */}

        {/* HR starts */}

        <Route path="/navbarhr" element={<NavbarHr />} />
        <Route path="/sidebarhr" element={<SidebarHr />} />
        {/* Signup for Hr */}
        <Route path="/hrsignup" element={<HrandAdminSignup />} />
        {/* Login for Hr */}
        <Route path="/hrlogin" element={<HRLogin />} />
        {/* Reset HR password */}
        <Route path="/hr/resetpassword" element={<HrProtectedRoute><HrResetPassword /></HrProtectedRoute>} />
        {/* hr home */}
        <Route path="/hrhome" element={<HrProtectedRoute><HrHome /></HrProtectedRoute>} />
        {/* View all employees */}
        <Route path="/hr/allemployees" element={<HrProtectedRoute><HrAllEmployees /></HrProtectedRoute>} />
        {/* Payment page of all employee to select one */}
        <Route path="/hr/allsalary" element={<HrProtectedRoute><HrAllPaySalary /></HrProtectedRoute>} />
        {/* Pay employee salary */}
        <Route path="/hr/paysalary/:id" element={<HrProtectedRoute><HrPaysalary /></HrProtectedRoute>} />
        {/* Transaction history of all employee */}
        <Route path="/hr/transactionhistoty" element={<HrProtectedRoute><HrAllTransactionHistory /></HrProtectedRoute>} />
        {/* Acces leave request, approved request and rejected */}
        <Route path="/hr/timesheet" element={<HrProtectedRoute><HrTimeSheet /></HrProtectedRoute>} />
        {/* View Leave Request */}
        <Route path="/hr/leaverequest" element={<HrProtectedRoute><HrEmployeeLeaveRequest /></HrProtectedRoute>} />
        {/* Detail of Rejected leave request */}
        <Route path='/hr/rejectedleaverequest' element={<HrProtectedRoute><HrRejectedLeaveRequest /></HrProtectedRoute>} />
        {/* Detail of Approved leave request */}
        <Route path="/hr/approvedleaverequest" element={<HrProtectedRoute><HrApprovedLeaveRequest /></HrProtectedRoute>} />
        {/* Manage  All activites , Asign task, View task */}
        <Route path="/hr/management" element={<HrProtectedRoute><HrManagement /></HrProtectedRoute>} />

        {/* HR ends */}

        {/* Complete Component Ends */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
