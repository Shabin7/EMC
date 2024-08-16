import React, { useEffect, useState } from 'react';
import Sidebar from '../../Component/Employee/Sidebar';
import Navbar from '../../Component/Employee/Navbar';
import axios from 'axios';
const EmployeeSalary = () => {
    const [details, setDetail] = useState([])
    const [selectedDetail, setSlectedDetail] = useState('')
    useEffect(() => {
        axios
            .get('http://localhost:3001/employee/salaryhistory', { withCredentials: true })
            .then((res => {
                setDetail(res.data)
                console.log('data recived', res.data);
            }))
            .catch((err) => {
                console.error('Error in reciving data', err);
            })
    }, [])
    const handleSelectedDetail = (detail) => {
        setSlectedDetail(detail)
    }

    return (
        <div className="d-flex  bg-secondary-subtle" id="wrapper">
            {/* Sidebar starts here */}
            <Sidebar />
            {/* Sidebar ends here */}
            <div className='w-100' id="page-content-wrapper">
                {/* Navigation bar starts here */}
                <Navbar />
                {/* Navigation bar Ends here */}
                <h3 className="my-4 mx-2 p-2 rounded text-center bg-white shadow">Salary Summary</h3>
                <div className='m-3'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Date of Payment</th>
                                <th scope="col">No of days Worked</th>
                                <th scope="col">Net Salary</th>
                                <th scope="col" className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{new Date(detail.date_of_payment).toLocaleDateString()}</td>
                                    <td>{detail.no_of_days_worked}</td>
                                    <td>{detail.netSalary}</td>
                                    <td >
                                        <button type="button" className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            onClick={() => handleSelectedDetail(detail)}
                                        >More info</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal  start*/}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='text-center'>
                                <h4>Hermes System</h4>
                                <p className='m-0'>1234 Innovation Drive</p>
                                <p className='m-0'> Suite 567</p>
                                <p className='m-0'>Tech City, CA 90210</p>
                                <p >United States</p>
                                <h5 >Pay Slip</h5>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <div className='d-flex flex-column text-start fw-bold'>
                                    <p>Employee Name: {selectedDetail.employee_name}</p>
                                    <p>Employee ID: {selectedDetail.employee_id} </p>
                                </div>
                                <div className='d-flex flex-column text-end'>
                                    <p>Pay period: {new Date(selectedDetail.date_of_payment).toLocaleDateString()}</p>
                                    <p>Worked Days:{selectedDetail.no_of_days_worked}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                                <div className='text-start'>
                                    <h4>Earning</h4>
                                    <p>Basic pay</p>
                                    <p>Additions</p>

                                </div>
                                <div className='text-end' >
                                    <h4>Amount</h4>
                                    <p>{selectedDetail.basicPay}</p>
                                    <p>{selectedDetail.additions}</p>
                                    <hr></hr>
                                    <div className='d-flex'>
                                        <p className='pe-4'>Total Earnings</p>
                                        <p>{selectedDetail.basicPay + selectedDetail.additions}</p>
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div className='text-start'>
                                    <h4>Deduction</h4>
                                    <p>Deduction</p>

                                </div>
                                <div className='text-end'>
                                    <h4>Amount</h4>
                                    <p>{selectedDetail.deductions}</p>
                                    <hr></hr>
                                    <div className='d-flex'>
                                        <p className='pe-4'>Total Deduction</p>
                                        <p>{selectedDetail.deductions}</p>
                                    </div>
                                    <div className='d-flex flex justify-content-end text-success'>
                                        <p className='pe-4'>Net Pay</p>
                                        <p className=''>{selectedDetail.netSalary}</p>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-info" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Model Ends */}

        </div>
    )
}

export default EmployeeSalary