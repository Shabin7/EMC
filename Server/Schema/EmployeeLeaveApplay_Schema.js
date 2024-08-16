const mongoose = require('mongoose')
const EmployeeLeaveApplay_Schema = mongoose.Schema({
    employeesId: { type: mongoose.Schema.Types.ObjectId, ref: 'edit_employee', required: true },
    employee_name: String,
    employee_id: Number,
    designation: String,
    from: Date,
    to: Date,
    typeOfLeave: String,
    reason: String,
    status: { type: String, default: 'pending' }
})
module.exports = mongoose.model('employee_leave_applay', EmployeeLeaveApplay_Schema)