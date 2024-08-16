import React, { useEffect, useState } from 'react'
import Sidebar from '../../Component/Employee/Sidebar'
import Navbar from '../../Component/Employee/Navbar'
import axios from 'axios'

const EmployeeLeaveStatus = () => {
    const [details, setDetails] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/employee/leave/status', { withCredentials: true })
            .then((res) => {
                setDetails(res.data.data)
                console.log('data recived', res.data);
            })
            .catch((err) => {
                console.error('Error in getting details', err)
            })
    }, [])

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'approved':
                return 'text-success';
            case 'rejected':
                return 'text-danger';
            case 'pending':
                return 'text-primary';
            default:
                return '';
        }
    }
    return (
        <div className='d-flex bg-secondary-subtle' id='wrapper'>
            <Sidebar />
            <div className='w-100' id='page-content-wrapper'>
                <Navbar />
                <h3 className='my-4 mx-2 p-2 rounded text-center bg-white shadow'>Leave Status</h3>
                <div className='m-3'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>No</th>
                                <th scope='col'>Type of leave</th>
                                <th scope='col'>From</th>
                                <th scope='col'>To</th>
                                <th scope='col'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <th>{detail.typeOfLeave}</th>
                                    <th>{new Date(detail.from).toLocaleDateString()}</th>
                                    <th>{new Date(detail.to).toLocaleDateString()}</th>
                                    <th className={getStatusClass(detail.status)}>{detail.status}</th>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default EmployeeLeaveStatus