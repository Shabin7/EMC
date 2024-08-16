const Signup_Schema = require('./Schema/Signup_Schema')
const HrSignup_Schema = require('./Schema/HrSignup_Schema')
const AdminSignup_Schema = require('./Schema/AdminSignup_Schema')
const EditEmployee_Schema = require('./Schema/AddEmployee_Schema')
const PaySalary_Schema = require('./Schema/PaySalary_Schema')
const AddEmployee_Schema = require('./Schema/AddEmployee_Schema')
const EmployeeLeaveApplay_Schema = require('./Schema/EmployeeLeaveApplay_Schema')
const EmployeeTickets_Schema = require('./Schema/EmployeeTickets_Schema')
const EmployeeTask_Schema = require('./Schema/EmployeeTask_Schema')
const multer = require("multer");
// const { connect } = require('mongoose')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }).single("profile_picture");

// Employee Pages starts

// Employee signup starts (using async, await)
const newManagement = async (req, res) => {
    try {
        const { fullname, employeeid, email, newpassword, confirmpassword } = req.body;

        // Backend validation
        if (!fullname || !employeeid || !email || !newpassword || !confirmpassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (newpassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        if (newpassword !== confirmpassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        const employee = await AddEmployee_Schema.findOne({ employee_id: employeeid });
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const signupData = new Signup_Schema({
            employeesId: employee._id,
            fullname: fullname,
            employeeid: employeeid,
            email: email,
            newpassword: newpassword,
        });

        const savedSignup = await signupData.save();
        res.json({ data: savedSignup });
    } catch (err) {
        res.status(500).json({ err });
    }
};
// Employee signup ends

// FindOne Employee Login Starts 
function login(req, res) {
    const { password, email } = req.body;

    Signup_Schema.findOne({ email })
        .then(data => {
            if (data === null) {
                res.json({
                    err: "err",
                    status: 405,
                    message: "User not found"
                });
            } else if (data.newpassword !== password) {
                res.json({
                    err: 'err',
                    status: 405,
                    message: "Invalid Password"
                });
            } else {
                req.session.employeesId = data.employeesId;
                console.log("Login successful", data.employeesId)
                res.json({
                    status: 200,
                    message: 'You are logged in successfully'
                });
            }
        })
        .catch(err => {
            res.json({ err });
        });
}
//Employee Login Ends  

// Post Employee Leave Apply start 
const newEmployeeLeaveApply = (req, res) => {
    const employeesId = req.session.employeesId
    if (!employeesId) {
        return res.status(401).json({
            err: 'err',
            message: 'Not authenticated'
        });
    }
    const EmployeeLeaveApply = new EmployeeLeaveApplay_Schema({
        employeesId,
        employee_name: req.body.employee_name,
        employee_id: req.body.employee_id,
        designation: req.body.designation,
        from: req.body.from,
        to: req.body.to,
        typeOfLeave: req.body.typeOfLeave,
        reason: req.body.reason,
    })
    EmployeeLeaveApply.save()
        .then(data => {
            res.json({ 'data': data })
        })
        .catch(err => {
            res.json({ 'err': err })
        })
}
// Employee Leave Apply ends

// Post Employee Tickets start (Post tickets by employee)
const newEmployeeTickets = (req, res) => {
    const employeesId = req.session.employeesId
    if (!employeesId) {
        return res.status(401).json({
            err: 'err',
            message: 'Session id for employee not fiund'
        })
    }
    const EmployeeTickets = new EmployeeTickets_Schema({
        employeesId,
        employee_name: req.body.employee_name,
        employee_id: req.body.employee_id,
        subject: req.body.subject,
        type: req.body.type,
        explain: req.body.explain
    })
    EmployeeTickets.save()
        .then(data => {
            res.json({ data: 'data' })
        })
        .catch(err => {
            res.json({ err: 'err' })
        })
}
// Post Employee Tickets ends

// Get employee salary setails start
const getEmployeeSalaryhistory = (req, res) => {
    const employeesId = req.session.employeesId
    console.log('session data:', req.session);
    if (!employeesId) {
        return res.status(401).json({
            err: 'err',
            message: 'Cant find employee id'
        })
    }
    else {
        PaySalary_Schema.find({ employeesId })
            .then(employee => {
                if (!employee) {
                    return res.status(404).json({
                        err: 'err',
                        message: 'cant find employee salary'
                    })
                }
                else {
                    res.json(employee)
                }
            })
            .catch(err => {
                res.status(500).json({ err })
            })
    }
}
// Get employee salary setails ends

// Get employee leave status start
const getEmployeeLeaveStatus = async (req, res) => {
    try {
        const employeesId = req.session.employeesId
        if (!employeesId) {
            return res.status(400).json({ message: 'Employee ID is missing in session' })
        }
        const leaveStatus = await EmployeeLeaveApplay_Schema.find({ employeesId })
        if (!leaveStatus || leaveStatus.lenght === 0) {
            return res.status(404).json({ message: 'Employee leave details not found' })
        }
        res.json({ data: leaveStatus })
    } catch (error) {
        console.error('Error getting employee leave status:', error)
        res.status(500).json({ error: error.message })
    }
}
// Get employee leave status end

// Get employee task start
const getemployeetask = async (req, res) => {
    try {
        const email = req.session.email
        const taskList = await EmployeeTask_Schema.find(email)
        if (!taskList) {
            return res.status(404).json({ message: 'Email id not found' })
        }
        res.json({ data: taskList })
    } catch (error) {
        res.status(500).json({ error })
    }
}
// Get employee task start

// Updat employee task start
const updateTaskDone = async (req, res) => {
    try {
        const { id } = req.params;
        const updateTask = await EmployeeTask_Schema.findByIdAndUpdate(id, { status: 'done' })
        res.json({ 'data': updateTask })
    } catch (error) {
        res.status(500).json({ error })
    }
}
// Updat employee task ends

// Get Employee profile starts
// Get Employee details for leave apply by employee
// Get Employee details for rising employee tickets by employee
const getEmployeeDetails = (req, res) => {
    const employeesId = req.session.employeesId;

    if (!employeesId) {
        return res.status(401).json({
            err: 'err',
            message: 'Not authenticated'
        });
    }
    else {
        AddEmployee_Schema.findById(employeesId)
            .then(employee => {
                if (!employee) {
                    return res.status(404).json({
                        err: 'err',
                        status: 404,
                        message: 'Employee not found'
                    });
                }
                else {
                    res.json(employee);
                }
            })
            .catch(err => {
                res.status(500).json({ err });
            });
    }
}
// End

// update leave blance fro employee by employee
const updateLeaveBalance = async (req, res) => {
    try {
        const { employee_id, typeOfLeave, days } = req.body;
        const employee = await AddEmployee_Schema.findOne({ employee_id });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (typeOfLeave === 'Casual leave') {
            employee.casual_taken += days;
        } else if (typeOfLeave === 'Sick leave') {
            employee.sick_taken += days;
        }

        await employee.save();
        res.json({ message: 'Leave balance updated successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};
// End

// Fetch leave balance for employee by employee
const getLeaveBalance = async (req, res) => {
    try {
        const employeesId = req.session.employeesId;

        if (!employeesId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const employee = await AddEmployee_Schema.findById(employeesId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({
            casualAllocated: 24,
            sickAllocated: 12,
            casualTaken: employee.casual_taken,
            sickTaken: employee.sick_taken
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};
// End

// Reset employee password
const resetEmployeePassword = async (req, res) => {
    const { email, newpassword } = req.body
    try {
        const employee = await Signup_Schema.findOne({ email })
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const password = await newpassword
        employee.newpassword = password
        await employee.save()
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password', error)
        res.status(500).json({ message: 'Error resetting password' })
    }
}
// Reset employee ends


// Logout page
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Unable to log out');
        }
        res.clearCookie('connect.sid');
        res.sent(200); // Send a 200 OK status
    });
};







// Employee Pages ends

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// HR pages starts

// Hr signup starts
const newHrSignup = (req, res) => {

    const HrSignup = new HrSignup_Schema({
        fullname: req.body.fullname,
        employeeid: req.body.employeeid,
        email: req.body.email,
        newpassword: req.body.newpassword
    })
    HrSignup.save()
        .then(data => {
            res.json({ 'data': data })
        })
        .catch(err => {
            res.json({ 'err': err })
        })
}
// Hr signup ends

// HR login starts
function HRLogin(req, res) {
    const { password, fullname } = req.body;

    HrSignup_Schema.findOne({ fullname })
        .then(data => {
            if (data === null) {
                res.json({
                    err: 'err',
                    status: 405,
                    message: "User not found"
                });
            }
            else if (data.newpassword !== password) {
                res.json({
                    err: 'err',
                    status: 405,
                    message: "Invalid Password"
                })
            }
            else {
                res.json({
                    data: 'data',
                    status: 200,
                    message: "You are logged in successfully"
                })
            }
        })
        .catch(err => {
            res.json({ err })
        });
}
// HR login Ends

// Reset HR password
const resetHrPassword = async (req, res) => {
    const { email, newpassword } = req.body
    try {
        const hr = await HrSignup_Schema.findOne({ email })
        if (!hr) {
            return res.status(404).json({ message: 'HR not found' });
        }
        const password = await newpassword
        hr.newpassword = password
        await hr.save()
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password', error)
        res.status(500).json({ message: 'Error resetting password' })
    }
}
// Reset HR ends

// HR pages ends

// ------------------------------------------------------------------------------------------------------------------------------------------------------

// Admin pages starts

// Admin Signup start
const newAdminSignup = (req, res) => {

    const AdminSignup = new AdminSignup_Schema({
        fullname: req.body.fullname,
        employeeid: req.body.employeeid,
        email: req.body.email,
        newpassword: req.body.newpassword
    })
    AdminSignup.save()
        .then(data => {
            res.json({ 'data': data })
        })
        .catch(err => {
            res.json({ 'err': err })
        })
}
// Admin signup ends

//Post Add employee starts
const newAddEmployee = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        const AddEmployee = new AddEmployee_Schema({
            employee_name: req.body.employee_name,
            employee_id: req.body.employee_id,
            date_of_birth: req.body.date_of_birth,
            designation: req.body.designation,
            profile_picture: req.file ? req.file : null,
            date_of_joining: req.body.date_of_joining,
            house_number: req.body.house_number,
            street_name: req.body.street_name,
            city: req.body.city,
            landmark: req.body.landmark,
            zip: req.body.zip,
            district: req.body.district,
            state: req.body.state,
            country: req.body.country,
            primary_phone: req.body.primary_phone,
            secondary_phone: req.body.secondary_phone,
            email: req.body.email,
            pan_no: req.body.pan_no,
            aadhar_no: req.body.aadhar_no,
            pf_no: req.body.pf_no,
            bank: req.body.bank,
            ifsc_code: req.body.ifsc_code,
            account_no: req.body.account_no,
            course: req.body.course,
            passout_year: req.body.passout_year,
            institute: req.body.institute,
            course_1: req.body.course_1,
            passout_year_1: req.body.passout_year_1,
            institute_1: req.body.institute_1,
            course_2: req.body.course_2,
            passout_year_2: req.body.passout_year_2,
            institute_2: req.body.institute_2,
        })
        AddEmployee.save()
            .then(data => {
                res.json({ 'data': data })
            })
            .catch(err => {
                res.json({ 'err': err })
            })
    })
}
// Add employee ends

// Update employee start (findByIdAndUpdate)
const UpdateEmployee = (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        const updatedData = {
            employee_name: req.body.employee_name,
            employee_id: req.body.employee_id,
            date_of_birth: req.body.date_of_birth,
            designation: req.body.designation,
            profile_picture: req.file ? req.file : null,
            date_of_joining: req.body.date_of_joining,
            house_number: req.body.house_number,
            street_name: req.body.street_name,
            city: req.body.city,
            landmark: req.body.landmark,
            zip: req.body.zip,
            district: req.body.district,
            state: req.body.state,
            country: req.body.country,
            primary_phone: req.body.primary_phone,
            secondary_phone: req.body.secondary_phone,
            email: req.body.email,
            pan_no: req.body.pan_no,
            aadhar_no: req.body.aadhar_no,
            pf_no: req.body.pf_no,
            bank: req.body.bank,
            ifsc_code: req.body.ifsc_code,
            account_no: req.body.account_no,
            course: req.body.course,
            passout_year: req.body.passout_year,
            institute: req.body.institute,
            course_1: req.body.course_1,
            passout_year_1: req.body.passout_year_1,
            institute_1: req.body.institute_1,
            course_2: req.body.course_2,
            passout_year_2: req.body.passout_year_2,
            institute_2: req.body.institute_2,
        };

        AddEmployee_Schema.findByIdAndUpdate(req.params.id, updatedData, { new: true })
            .then((data) => {
                if (!data) {
                    return res.status(404).json({ message: 'Employee not found' })
                }
                res.json({
                    msg: "Employees data acquired",
                    data: data,
                    status: 200
                })
            })
            .catch((err) => {
                res.json({
                    msg: "Erron in finding employee data",
                    err: err,
                    status: 500
                })
            })
    })
}
// Update employee ends


// Empoyee Task Create
const newEmployeeTask = async (req, res) => {
    try {
        const employee = await EditEmployee_Schema.findOne({ email: req.body.email })
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' })
        }
        const EmployeeTask = new EmployeeTask_Schema({
            employeesId: employee._id,
            email: req.body.email,
            employee_name: req.body.employee_name,
            date_of_submission: req.body.date_of_submission,
            heading: req.body.heading,
            task_text: req.body.task_text,
        })
        const data = await EmployeeTask.save()
        res.json({ 'data': data })
    } catch (err) {
        res.status(500).json({ 'err': err.message })
    }
}
// End

//Post Pay salary start
const newPaySalary = (req, res) => {
    const PaySalary = new PaySalary_Schema({
        employee_name: req.body.employee_name,
        employee_id: req.body.employee_id,
        notes: req.body.notes,
        date_of_payment: req.body.date_of_payment,
        pf_no: req.body.pf_no,
        account_no: req.body.account_no,
        bank_name: req.body.bank_name,
        ifsc_code: req.body.ifsc_code,
        totalWorkingDays: req.body.totalWorkingDays,
        leaves: req.body.leaves,
        absent: req.body.absent,
        no_of_days_worked: req.body.no_of_days_worked,
        basicPay: req.body.basicPay,
        deductions: req.body.deductions,
        additions: req.body.additions,
        netSalary: req.body.netSalary,
        employeesId: req.body.employeesId || req.session.employeesId
    })
    PaySalary.save()
        .then(data => {
            res.json({ 'data': data })
        })
        .catch(err => {
            res.json({ 'err': err })
        })
}
// Pay salary ends

// Admin login starts
function AdminLogin(req, res) {
    const { password, fullname } = req.body;

    AdminSignup_Schema.findOne({ fullname })
        .then(data => {
            if (data === null) {
                res.json({
                    err: 'err',
                    status: 405,
                    message: "User not found"
                });
            }
            else if (data.newpassword !== password) {
                res.json({
                    err: 'err',
                    status: 405,
                    message: "Invalid Password"
                })
            }
            else {
                res.json({
                    data: 'data',
                    status: 200,
                    message: "You are logged in successfully"
                })
            }
        })
        .catch(err => {
            res.json({ err })
        });
}
// Admin login ends

// Get all employes details for Admin and HR starts
const AllEmployee = (req, res) => {

    AddEmployee_Schema.find()
        .then((data) => {
            res.json({
                msg: "Employee data aqured",
                data: data,
                status: 200
            })
        })
        .catch((err) => {
            res.json({
                msg: "cannot acquire data",
                err: err,
                status: 400
            })
        })
}
// Get all employes details for Admin and HR ends

// Get high priority tickets start (Here we find the data using type to filter)

const getHighPriorityTickets = (req, res) => {
    EmployeeTickets_Schema.find({ type: "High Priority" })
        .then((data) => {
            res.json({
                msg: "HighPriorityTickets data aqured",
                data: data,
                status: 200
            })
        })
        .catch(((err) => [
            res.json({
                msg: "High Priority data cant be aquired",
                err: err,
                status: 400
            })
        ]))
}
// Get high priority tickets ends

// Get Medium priority tickets start (Here we find the data using type to filter)
const getMediumPriorityTickets = (req, res) => {
    EmployeeTickets_Schema.find({ type: "Medium Priority" })
        .then((data) => {
            res.json({
                msg: "Medium PriorityTickets data aqured",
                data: data,
                status: 200
            })
        })
        .catch(((err) => [
            res.json({
                msg: "Medium Priority data cant be aquired",
                err: err,
                status: 400
            })
        ]))
}
// Get Medium priority tickets ends

// Get Low priority tickets start (Here we find the data using type to filter)
const getLowPriorityTickets = (req, res) => {
    EmployeeTickets_Schema.find({ type: "Low Priority" })
        .then((data) => {
            res.json({
                msg: "Low PriorityTickets data aqured",
                data: data,
                status: 200
            })
        })
        .catch(((err) => [
            res.json({
                msg: "Low Priority data cant be aquired",
                err: err,
                status: 400
            })
        ]))
}
// Get Low priority tickets ends

// View one  employes starts (findById)
const getEmployeeById = (req, res) => {

    AddEmployee_Schema.findById(req.params.id)
        .then((data) => {
            if (!data) {
                return res.status(404).json({ message: 'Employee not found' })
            }
            res.json({
                msg: "Employee data aqured",
                data: data,
                status: 200
            })
        })
        .catch((err) => {
            res.json({
                msg: "cannot acquire data",
                err: err,
                status: 400
            })
        })
}
// View one Employee ends



//Delete employee starts (findByIdAndDelete )
// const employeeFindByIdAndDelete = (req, res) => {
//     const { id } = req.params

//     AddEmployee_Schema.findByIdAndDelete(id)
//         .then(() => {
//             res.json({
//                 msg: "Deleted",
//                 status: 200
//             })
//         })
//         .catch((err) => {
//             res.json({
//                 msg: 'cant delete data',
//                 err: err,
//                 status400
//             })
//         })
// }
const employeeFindByIdAndDelete = async (req, res) => {
    try {
        const employeeId = req.params.id;

        // Find and delete the employee
        const employee = await AddEmployee_Schema.findByIdAndDelete(employeeId);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Find and delete associated signup data
        await Signup_Schema.findOneAndDelete({ employeesId: employeeId });
        res.status(200).json({ message: 'Employee and associated data deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete employee ends

// Get individual details for salary starts(findById)
const SalaryIndividually = (req, res) => {
    const _id = req.params.id
    AddEmployee_Schema.findById(_id)
        .then((data) => {
            res.json({
                msg: "Employee data acquired",
                data: data,
                status: 200
            })
        })
        .catch((err) => {
            res.json({
                msg: "cannot find employee data",
                err: err,
                status: 400
            })
        })
}
// Get individual details for salary ends

// Get all employee transaction history start
const AllEmployeeTransactionHistory = (req, res) => {
    PaySalary_Schema.find()
        .then((data) => {
            res.json({
                msg: 'Employee payment history acquired',
                data: data,
                status: 200
            })
        })
        .catch((err) => {
            res.json({
                msg: 'Failed to acquire employee payment history',
                err: err,
                status: 400
            })
        });
}
// Get all employee transaction history ends

// Get all leave requests starts
const getEmployeeLeaveRequest = async (req, res) => {
    try {
        const leaveRequest = await EmployeeLeaveApplay_Schema.find({ status: 'pending' });
        res.json({ data: leaveRequest });
    } catch (error) {
        res.state(500).json({ error })
    }
}
// End

// post approved leave requests start
const postApprovedLeaveRequest = async (req, res) => {
    try {
        const { id } = req.body;
        const leaveRequest = await EmployeeLeaveApplay_Schema.findById(id);
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' })
        }
        leaveRequest.status = 'approved';
        await leaveRequest.save();
        res.json({ message: 'Leave approved successfully' })
    } catch (error) {
        res.state(500).json({ error })
    }
}
// End

// Post rejected leave request start
const postRejectedLeaveRequest = async (req, res) => {
    try {
        const { id } = req.body;
        const leaveRequest = await EmployeeLeaveApplay_Schema.findById(id);
        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' })
        }
        leaveRequest.status = 'rejected';
        await leaveRequest.save();
        res.json({ message: 'Leave request rejected successfully' })

    } catch (error) {
        res.status(500).json({ error })
    }
}
// End

// Get approve leave request
const getApprovedLeaveRequest = async (req, res) => {
    try {
        const leaveRequest = await EmployeeLeaveApplay_Schema.find({ status: 'approved' })
        res.json({ data: leaveRequest })
    } catch (error) {
        res.status(500).json({ error })
    }
}
// Ends

// Get rejected leave request
const getRejectedLeaveRequest = async (req, res) => {
    try {
        const leaveRequest = await EmployeeLeaveApplay_Schema.find({ status: 'rejected' });
        res.json({ data: leaveRequest });
    } catch (error) {
        res.status(500).json({ error });
    }
};
// End

// Reset Admin password
const resetAdminPassword = async (req, res) => {
    const { email, newpassword } = req.body
    try {
        const admin = await AdminSignup_Schema.findOne({ email })
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const password = await newpassword
        admin.newpassword = password
        await admin.save()
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password', error)
        res.status(500).json({ message: 'Error resetting password' })
    }
}
// Reset Admin ends

// Admin pages ends

// ----------------------------------------------------------------

module.exports = {
    newManagement,
    newHrSignup,
    newAdminSignup,
    login,
    HRLogin,
    AdminLogin,
    newAddEmployee,
    AllEmployee,
    UpdateEmployee,
    newPaySalary,
    SalaryIndividually,
    employeeFindByIdAndDelete,
    getEmployeeById,
    AllEmployeeTransactionHistory,
    newEmployeeLeaveApply,
    getEmployeeLeaveRequest,
    newEmployeeTickets,
    getHighPriorityTickets,
    getMediumPriorityTickets,
    getLowPriorityTickets,
    getEmployeeDetails,
    getEmployeeSalaryhistory,
    updateLeaveBalance,
    getLeaveBalance,
    postApprovedLeaveRequest,
    postRejectedLeaveRequest,
    getApprovedLeaveRequest,
    getRejectedLeaveRequest,
    newEmployeeTask,
    getemployeetask,
    updateTaskDone,
    getEmployeeLeaveStatus,
    logout,
    resetEmployeePassword,
    resetAdminPassword,
    resetHrPassword,
};