import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SidebarHr from '../../Component/HR/SidebarHr'
import NavbarHr from '../../Component/HR/NavbarHr'

const HrAllTransactionHistory = () => {
    const [detail, setDetail] = useState([])
    const [selectedTransaction, setSelectedTransaction] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/hr/alltransactionhistory')
            .then((res => {
                setDetail(res.data.data)
            }))
            .catch((err) => {
                setDetail(err)
            })

    }, [])
    const handleInfoClick = (transaction) => {
        setSelectedTransaction(transaction)
    }
    return (
        <div className='d-flex bg-secondary-subtle ' id='wrapper'>
            <SidebarHr />
            <div className='w-100' id='page-content-wrapper'>
                <NavbarHr />
                <h3 className='my-4 mx-2 p-2 rounded text-center bg-white shadow'>Transaction History</h3>

                <div className='table-responsive m-2'>
                    <table className="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date of Payment</th>
                                <th scope="col">Net Pay</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        {detail.map((item, index) => (
                            <tbody>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.employee_name}</td>
                                    <td>{new Date(item.date_of_payment).toLocaleDateString()}</td>
                                    <td>{item.netSalary}</td>
                                    <td>
                                        <button className="btn btn-outline-info" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleInfoClick(item)} >
                                            <i className="bi bi-info-circle"></i> info</button>
                                        {/* Modal  start*/}
                                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-md">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Details</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className='d-flex justify-content-between'>
                                                            <div className='d-flex flex-column text-start fw-bold'>
                                                                <p>Employee Name: {selectedTransaction.employee_name}</p>
                                                                <p>Employee ID: {selectedTransaction.employee_id} </p>
                                                            </div>
                                                            <div className='d-flex flex-column text-end'>
                                                                <p>Pay period: {new Date(selectedTransaction.date_of_payment).toLocaleDateString()}</p>
                                                                <p>Worked Days:{selectedTransaction.totalWorkingDays}</p>
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
                                                                <p>{selectedTransaction.basicPay}</p>
                                                                <p>{selectedTransaction.additions}</p>
                                                                <hr></hr>
                                                                <div className='d-flex text-success'>
                                                                    <p className='pe-4'>Total Earnings</p>
                                                                    <p>{selectedTransaction.basicPay + selectedTransaction.additions}</p>
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
                                                                <p>{selectedTransaction.deductions}</p>
                                                                <hr></hr>
                                                                <div className='d-flex text-danger'>
                                                                    <p className='pe-4'>Total Deduction</p>
                                                                    <p>{selectedTransaction.deductions}</p>
                                                                </div>
                                                                <div className='d-flex flex justify-content-end text-success fw-bold'>
                                                                    <p className='pe-4'>Net Pay</p>
                                                                    <p className=''>{selectedTransaction.netSalary}</p>
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
                                    </td>
                                </tr>
                            </tbody>

                        ))}

                    </table>
                </div>
            </div>
        </div>
    )
}

export default HrAllTransactionHistory