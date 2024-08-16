import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarAdmin from '../../Component/Admin/SidebarAdmin';
import NavbarAdmin from '../../Component/Admin/NavbarAdmin';

const RejectedLeaveRequest = () => {
    const [rejectedLeaves, setRejectedLeaves] = useState([])
    const [leaveDetail, setLeaveDetail] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/admin/rejectedLeave')
            .then((res) => {
                setRejectedLeaves(res.data.data)
            })
            .catch((err) => {
                console.error('Error in fetching rejected leaves', err)
            })
    }, [])
    return (
        <div className='d-flex bg-secondary-subtle ' id='wrapper'>
            <SidebarAdmin />
            <div className='w-100' id='page-content-wrapper'>
                <NavbarAdmin />
                <h3 className='my-4 mx-2 p-2 rounded text-center bg-white shadow text-danger'>Rejected Leave Request</h3>

                <div className='table-responsive m-1 rounded'>
                    <table className="table table-danger table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Leave type</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rejectedLeaves.map((leave, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{leave.employee_name}</td>
                                    <td>{leave.employee_id}</td>
                                    <td>{leave.typeOfLeave}</td>
                                    <td>{new Date(leave.from).toLocaleDateString()}</td>
                                    <td>{new Date(leave.to).toLocaleDateString()}</td>
                                    <td className='text-center'>
                                        <button type='button' className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => setLeaveDetail(leave)} > View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal Starts */}
            <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Leave Detail</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Employee Name: {leaveDetail.employee_name}</p>
                            <p>Employee ID: {leaveDetail.employee_id}</p>
                            <p>Designation: {leaveDetail.designation}</p>
                            <p>From: {new Date(leaveDetail.from).toLocaleDateString()}</p>
                            <p>To: {new Date(leaveDetail.to).toLocaleDateString()}</p>
                            <p>Type Of Leave: {leaveDetail.typeOfLeave}</p>
                            <p>Reason: {leaveDetail.reason}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Ends */}
        </div>
    )
}

export default RejectedLeaveRequest