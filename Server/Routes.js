const express = require('express')
const routes = express.Router()
const ManagementController = require('./ManagementController')

// Employee page starts

// Employee signup
routes.post('/signup', ManagementController.newManagement)
// Employee login
routes.post('/login', ManagementController.login)
// Get employee profile
// Get employee details for leave apply by employee
// Get employee details for rasing tickets by employee
routes.get('/employee/employeeprofile', ManagementController.getEmployeeDetails)
// Employee salary history starts
routes.get('/employee/salaryhistory', ManagementController.getEmployeeSalaryhistory)
// Post apply leave by employee
routes.post('/employee/leaveapply', ManagementController.newEmployeeLeaveApply)
// Get employee leave status
routes.get('/employee/leave/status', ManagementController.getEmployeeLeaveStatus)
// Post employee tickets by employee
routes.post('/employee/tickets', ManagementController.newEmployeeTickets)
// Update leave balance by employee
routes.post('/employee/updateLeaveBalance', ManagementController.updateLeaveBalance)
// Get employee leave balance
routes.get('/employee/getEmployeeLeaveBalance', ManagementController.getLeaveBalance)
// Get employee task
routes.get('/employee/task', ManagementController.getemployeetask)
// Update task status
routes.put('/employee/task/updateDone/:id', ManagementController.updateTaskDone)
// Logout
routes.post('/logout', ManagementController.logout)
// Reset password
routes.post('/resetpassword', ManagementController.resetEmployeePassword)

// Employee page ends

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

// Admin pages starts

// Admin Signup
routes.post('/adminsignup', ManagementController.newAdminSignup)
// Admin Login
routes.post('/adminlogin', ManagementController.AdminLogin)
// Adimin Add employee
routes.post('/addemployee', ManagementController.newAddEmployee)
// Post Edited Employee details
routes.put('/admin/editemployees/:id', ManagementController.UpdateEmployee)
// routes.post('/paysalary',ManagementController.newPaySalary)
routes.get('/allemployee', ManagementController.AllEmployee)
// Get High priority tickets list for Admin
routes.get('/admin/highprioritytickets', ManagementController.getHighPriorityTickets)
// Get Medium priority tickets list for Admin
routes.get('/admin/mediumprioritytickets', ManagementController.getMediumPriorityTickets)
// Get Low priority tickets list for Admin
routes.get('/admin/lowprioritytickets', ManagementController.getLowPriorityTickets)
// Delete employee by id
routes.delete('/admin/deletebyid/:id', ManagementController.employeeFindByIdAndDelete)
// Admin Edit Employeee
routes.get('/admin/getEmployeeById/:id', ManagementController.getEmployeeById)
// Admin pay salary (Get one individual detail for salary payment)
routes.get('/admin/getEmployeeById/:id', ManagementController.SalaryIndividually)
// Post individual salary payment details
routes.post('/admin/indiviualsalarypay', ManagementController.newPaySalary)
// Get all employee payment history
routes.get('/admin/alltransactionhistory', ManagementController.AllEmployeeTransactionHistory)
// Get Employee leave request fro Admin
routes.get('/admin/leaverequest', ManagementController.getEmployeeLeaveRequest)
// Post approved leave request
routes.post('/admin/approveLeaveRequest', ManagementController.postApprovedLeaveRequest)
// post rejected leave request
routes.post('/admin/rejectLeaveRequest', ManagementController.postRejectedLeaveRequest)
// Get rejected leave request
routes.get('/admin/rejectedLeave', ManagementController.getRejectedLeaveRequest)
// Get approved leave request
routes.get('/admin/approvedLeave', ManagementController.getApprovedLeaveRequest)
// Post create task
routes.post('/admin/tasks/create', ManagementController.newEmployeeTask)
// Reset Admin Password
routes.post('/admin/resetPassword', ManagementController.resetAdminPassword)
// Admin Pages ends

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

// HR page starts

// HR signup
routes.post('/hrsignup', ManagementController.newHrSignup)
// HR login
routes.post('/hrlogin', ManagementController.HRLogin)
// HR reset password
routes.post('/hr/resetPassword', ManagementController.resetHrPassword)
// Pay view all employees
routes.get('/hr/allemployees', ManagementController.AllEmployee)
// HR pay salary (Get one individual detail for salary payment)
routes.get('/hr/getEmployeeById/:id', ManagementController.SalaryIndividually)
// Post individual salary payment details
routes.post('/hr/indiviualsalarypay', ManagementController.newPaySalary)
// Get all employee payment history
routes.get('/hr/alltransactionhistory', ManagementController.AllEmployeeTransactionHistory)

// Get Employee leave request for HR
routes.get('/hr/leaverequest', ManagementController.getEmployeeLeaveRequest)
// Post approved leave request
routes.post('/hr/approveLeaveRequest', ManagementController.postApprovedLeaveRequest)
// post rejected leave request
routes.post('/hr/rejectLeaveRequest', ManagementController.postRejectedLeaveRequest)
// Get rejected leave request
routes.get('/hr/rejectedLeave', ManagementController.getRejectedLeaveRequest)
// Get approved leave request
routes.get('/hr/approvedLeave', ManagementController.getApprovedLeaveRequest)
// Post create task
routes.post('/hr/tasks/create', ManagementController.newEmployeeTask) 


// HR page ends
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------


module.exports = routes 