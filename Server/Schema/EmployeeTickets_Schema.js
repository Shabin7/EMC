const mongoose = require('mongoose');
const EmployeeTickets_Schema = mongoose.Schema({
    employeesId: {type:mongoose.Schema.Types.ObjectId, ref:'edit_employee',required:true},
    employee_name: String,
    employee_id: Number,
    subject: String,
    type: String,
    explain: String
})
module.exports = mongoose.model("employee_tickets", EmployeeTickets_Schema);