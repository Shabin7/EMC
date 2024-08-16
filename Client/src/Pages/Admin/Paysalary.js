// To make payment by either HR or Admin
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import SidebarAdmin from '../../Component/Admin/SidebarAdmin';
import NavbarAdmin from '../../Component/Admin/NavbarAdmin';
import { validateForm } from '../../Utils/Validation';

const Paysalary = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        employee_name: "",
        employee_id: "",
        designation: "",
        date_of_payment: "",
        no_of_days_worked: "",
        pf_no: "",
        account_no: "",
        bank: "",
        ifsc_code: "",
        totalWorkingDays: "",
        leaves: "",
        absent: "",
        deductions: "",
        additions: "",
        netSalary: "",
        basicPay: "",
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:3001/admin/getEmployeeById/${id}`)
            .then((res) => {
                const data = res.data.data
                setForm({
                    ...data,
                    employeesId: id,
                })
                console.log('form valaue is', res.data);


            })
            .catch((err) => {
                alert('error in getting Employee details')
                console.error('Error in getting Employee details', err)
            })
    }, [id])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const requiredFields = [
            'employee_name', 'employee_id', 'designation', 'date_of_payment',
            'no_of_days_worked', 'pf_no', 'account_no', 'bank', 'ifsc_code',
            'totalWorkingDays', 'leaves', 'absent', 'deductions', 'additions',
            'netSalary', 'basicPay'
        ];
        const errors = validateForm(form, requiredFields);
        setErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }
        axios
            .post('http://localhost:3001/admin/indiviualsalarypay', form)
            .then((res) => {
                console.log(res);
                alert(' Salary paid successfully')
                navigate('/allsalary')
            })
            .catch((err) => {
                console.error(err);
                alert('error in paying salary')
            })
    }

    return (
        <div className="d-flex  bg-secondary-subtle" id="wrapper">
            {/* Sidebar starts */}
            <SidebarAdmin />
            {/* Sidebar ends */}
            <div className='w-100' id="page-content-wrapper">

                {/* Navbar starts */}
                <NavbarAdmin />
                {/* Navbar ends */}

                {/* Payment starts here */}
                <form className="row g-3 m-0 bg-secondary-subtle" onSubmit={handleSubmit}>
                    <h3 className="text-center pt-4">Pay Salary</h3>
                    <hr></hr>
                    <div className="row g-3 justify-content-between">
                        <div className="col-md-3">
                            <label htmlFor="employee_name4" className="form-label">Employee Name</label>
                            <input type="text" className="form-control" id="employee_name4"
                                readOnly
                                name='employee_name'
                                value={form.employee_name}
                                onChange={handleChange} />
                            {errors.employee_name && <small className="text-danger">{errors.employee_name}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="employeeid4" className="form-label">EmployeeID</label>
                            <input type="text" className="form-control" id="employeeid4"
                                readOnly
                                name='employee_id'
                                value={form.employee_id}
                                onChange={handleChange} />
                            {errors.employee_id && <small className="text-danger">{errors.employee_id}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="projectname4" className="form-label">Designation</label>
                            <input type="text" className="form-control" id="projectname4"
                                readOnly
                                name='designation'
                                value={form.designation}
                                onChange={handleChange} />
                            {errors.designation && <small className="text-danger">{errors.designation}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="projectname4" className="form-label">Date of payment</label>
                            <input type="date" className="form-control" id="projectname4"
                                name='date_of_payment'
                                value={form.date_of_payment}
                                onChange={handleChange} />
                            {errors.date_of_payment && <small className="text-danger">{errors.date_of_payment}</small>}
                        </div>
                    </div>

                    <div className="row g-3 justify-content-between">
                        <div className="col-md-2">
                            <label htmlFor="noofdaysworked4" className="form-label">Total Working days</label>
                            <input type="number" className="form-control" id="noofdaysworked4"
                                name='totalWorkingDays'
                                value={form.totalWorkingDays}
                                onChange={handleChange} />
                            {errors.totalWorkingDays && <small className="text-danger">{errors.totalWorkingDays}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="amount4" className="form-label">Leaves</label>
                            <input type="number" className="form-control" id="amount4"
                                name='leaves'
                                value={form.leaves}
                                onChange={handleChange} />
                            {errors.leaves && <small className="text-danger">{errors.leaves}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="deduction4" className="form-label">Absent</label>
                            <input type="number" className="form-control" id="deduction4"
                                name='absent'
                                value={form.absent}
                                onChange={handleChange} />
                            {errors.absent && <small className="text-danger">{errors.absent}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="allowence4" className="form-label">No Of Days Worked</label>
                            <input type="number" className="form-control" id="allowence4"
                                name='no_of_days_worked'
                                value={form.no_of_days_worked}
                                onChange={handleChange} />
                            {errors.no_of_days_worked && <small className="text-danger">{errors.no_of_days_worked}</small>}
                        </div>
                    </div>

                    <div className="row g-3 justify-content-between">
                        <div className="col-md-2">
                            <label htmlFor="noofdaysworked4" className="form-label">Basic Pay</label>
                            <input type="number" className="form-control" id="noofdaysworked4"
                                name='basicPay'
                                value={form.basicPay}
                                onChange={handleChange} />
                            {errors.basicPay && <small className="text-danger">{errors.basicPay}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="amount4" className="form-label">Deductions</label>
                            <input type="number" className="form-control" id="amount4"
                                name='deductions'
                                value={form.deductions}
                                onChange={handleChange} />
                            {errors.deductions && <small className="text-danger">{errors.deductions}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="deduction4" className="form-label">Additions</label>
                            <input type="number" className="form-control" id="deduction4"
                                name='additions'
                                value={form.additions}
                                onChange={handleChange} />
                            {errors.additions && <small className="text-danger">{errors.additions}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="allowence4" className="form-label">Net Salary</label>
                            <input type="number" className="form-control" id="allowence4"
                                name='netSalary'
                                value={form.netSalary}
                                onChange={handleChange} />
                            {errors.netSalary && <small className="text-danger">{errors.netSalary}</small>}
                        </div>
                    </div>
                    <div className="row g-3 justify-content-between">
                        <div className="col-md-2">
                            <label htmlFor="pfno4" className="form-label">PF NO</label>
                            <input type="text" className="form-control" id="pfno4"
                                readOnly
                                name='pf_no'
                                value={form.pf_no}
                                onChange={handleChange} />
                            {errors.pf_no && <small className="text-danger">{errors.pf_no}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="accountno4" className="form-label">Account Number</label>
                            <input type="number" className="form-control" id="accountno4"
                                readOnly
                                name='account_no'
                                value={form.account_no}
                                onChange={handleChange} />
                            {errors.account_no && <small className="text-danger">{errors.account_no}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="bankname4" className="form-label">Bank Name</label>
                            <input type='text' className="form-control" id="bankname4"
                                readOnly
                                name='bank'
                                value={form.bank}
                                onChange={handleChange} />
                            {errors.bank && <small className="text-danger">{errors.bank}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="ifsccode4" className="form-label">IFSC Code</label>
                            <input type="text" className="form-control" id="ifsccode4"
                                readOnly
                                name='ifsc_code'
                                value={form.ifsc_code}
                                onChange={handleChange} />
                            {errors.ifsc_code && <small className="text-danger">{errors.ifsc_code}</small>}
                        </div>
                    </div>
                    <div className='container'><button className="btn btn-primary mt-2" type="submit">Initiate Payment</button></div>

                </form>
                {/* Payment Ends here    */}
            </div>
        </div>

    )
}

export default Paysalary