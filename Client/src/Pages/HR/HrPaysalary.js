// To make payment by either HR or Admin
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import SidebarHr from '../../Component/HR/SidebarHr';
import NavbarHr from '../../Component/HR/NavbarHr';

const HrPaysalary = () => {
    const [employee_name, setEmployee_Name] = useState();
    const [employee_id, setEmployee_Id] = useState();
    const [designation, setDesination] = useState();
    const [date_of_payment, setDate_Of_Payment] = useState();
    const [no_of_days_worked, setNo_Of_Days_Worked] = useState();
    const [pf_no, setPf_No] = useState();
    const [account_no, setAccount_No] = useState();
    const [bank, setBank] = useState();
    const [ifsc_code, setIfsc_Code] = useState();
    const [totalWorkingDays, setTotalWorkingDays] = useState();
    const [leaves, setLeaves] = useState();
    const [absent, setAbsent] = useState();
    const [deductions, setDeductions] = useState();
    const [additions, setAdditions] = useState();
    const [netSalary, setNetSalary] = useState();
    const [basicPay, setBasicPay] = useState();

    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:3001/hr/getEmployeeById/${id}`)
            .then((res) => {
                setEmployee_Name(res.data.data.employee_name);
                setEmployee_Id(res.data.data.employee_id);
                setPf_No(res.data.data.pf_no);
                setAccount_No(res.data.data.account_no);
                setBank(res.data.data.bank);
                setIfsc_Code(res.data.data.ifsc_code);
                setDesination(res.data.data.designation)

            })
            .catch((err) => {
                alert('error in getting Employee details')
                console.log(err);
            })
    }, [])

    const handleIndividualSalary = () => {
        const data = {
            employeesId: id,
            employee_name,
            employee_id,
            designation,
            date_of_payment,
            no_of_days_worked,
            pf_no,
            account_no,
            bank,
            ifsc_code,
            leaves,
            absent,
            totalWorkingDays,
            deductions,
            additions,
            netSalary,
            basicPay

        }
        axios
            .post('http://localhost:3001/hr/indiviualsalarypay', data)
            .then((res) => {
                console.log(res);
                alert('Employee salary paid')
                navigate('/allsalary')
            })
            .catch((err) => {
                console.log(err);
                alert('error in paying salary')
            })
    }

    return (
        <div className="d-flex  bg-secondary-subtle" id="wrapper">
            {/* Sidebar starts */}
            <SidebarHr />
            {/* Sidebar ends */}
            <div className='w-100' id="page-content-wrapper">
                {/* Navbar starts */}
                <NavbarHr />
                {/* Navbar ends */}

                {/* Payment starts here */}
                <form className="row g-3 m-0 bg-secondary-subtle ">
                    <h3 className="text-center pt-4">Pay Salary</h3>
                    <hr></hr>
                    <div className="row g-3 justify-content-between">
                        <div className="col-md-3">
                            <label for="employee_name4" className="form-label">Employee Name</label>
                            <input type="text" className="form-control" id="employee_name4"
                                value={employee_name}
                                onChange={(e => setEmployee_Name(e.target.value))} />
                        </div>
                        <div class="col-md-3">
                            <label for="employeeid4" className="form-label">EmployeeID</label>
                            <input type="text" className="form-control" id="employeeid4"
                                value={employee_id}
                                onChange={(e => setEmployee_Id(e.target.value))} />
                        </div>
                        <div className="col-md-3">
                            <label for="projectname4" className="form-label">Designation</label>
                            <input type="text" className="form-control" id="projectname4"
                                value={designation}
                                onChange={(e => setDesination(e.target.value))} />
                        </div>
                        <div className="col-md-3">
                            <label for="projectname4" className="form-label">Date of payment</label>
                            <input type="date" className="form-control" id="projectname4"
                                value={date_of_payment}
                                onChange={(e => setDate_Of_Payment(e.target.value))} />
                        </div>
                    </div>

                    <div className="row g-3 justify-content-between">
                        <div className="col-md-2">
                            <label for="noofdaysworked4" className="form-label">Total Working days</label>
                            <input type="number" className="form-control" id="noofdaysworked4"
                                value={totalWorkingDays}
                                onChange={(e => setTotalWorkingDays(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="amount4" className="form-label">Leaves</label>
                            <input type="number" className="form-control" id="amount4"
                                value={leaves}
                                onChange={(e => setLeaves(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="deduction4" className="form-label">Absent</label>
                            <input type="number" className="form-control" id="deduction4"
                                value={absent}
                                onChange={(e => setAbsent(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="allowence4" className="form-label">No Of Days Worked</label>
                            <input type="number" className="form-control" id="allowence4"
                                value={no_of_days_worked}
                                onChange={(e => setNo_Of_Days_Worked(e.target.value))} />
                        </div>
                    </div>

                    <div className="row g-3 justify-content-between">
                        <div className="col-md-2">
                            <label for="noofdaysworked4" className="form-label">Basic Pay</label>
                            <input type="number" className="form-control" id="noofdaysworked4"
                                value={basicPay}
                                onChange={(e => setBasicPay(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="amount4" className="form-label">Deductions</label>
                            <input type="number" className="form-control" id="amount4"
                                value={deductions}
                                onChange={(e => setDeductions(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="deduction4" className="form-label">Additions</label>
                            <input type="number" className="form-control" id="deduction4"
                                value={additions}
                                onChange={(e => setAdditions(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="allowence4" className="form-label">Net Salary</label>
                            <input type="number" className="form-control" id="allowence4"
                                value={netSalary}
                                onChange={(e => setNetSalary(e.target.value))} />
                        </div>
                    </div>
                    <div className="row g-3 justify-content-between">
                        <div className="col-md-2">
                            <label for="pfno4" className="form-label">PF No</label>
                            <input type="text" className="form-control" id="pfno4"
                                value={pf_no}
                                onChange={(e => setPf_No(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="accountno4" className="form-label">Account Number</label>
                            <input type="number" className="form-control" id="accountno4"
                                value={account_no}
                                onChange={(e => setAccount_No(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="bankname4" className="form-label">Bank Name</label>
                            <input type='text' className="form-control" id="bankname4"
                                value={bank}
                                onChange={(e => setBank(e.target.value))} />
                        </div>
                        <div className="col-md-2">
                            <label for="ifsccode4" className="form-label">IFSC Code</label>
                            <input type="text" className="form-control" id="ifsccode4"
                                value={ifsc_code}
                                onChange={(e => setIfsc_Code(e.target.value))} />
                        </div>
                    </div>
                    <button className="btn btn-primary m-2" type="button" onClick={handleIndividualSalary}>Initiate Payment</button>
                </form>
                {/* Payment Ends here    */}
            </div>
        </div>

    )
}

export default HrPaysalary