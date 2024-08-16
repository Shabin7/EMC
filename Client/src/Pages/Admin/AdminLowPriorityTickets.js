import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../Component/Admin/SidebarAdmin';
import NavbarAdmin from '../../Component/Admin/NavbarAdmin';
import axios from 'axios';

const AdminLowPriorityTickets = () => {
    // Css Styling Starts Here
    const textSpace = {
        textIndent: '3em'
    }
    // Css Styling Ends Here
    const [detail, setDetail] = useState([])
    useEffect(() => {
        axios
            .get('http://localhost:3001/admin/lowprioritytickets')
            .then((res => {
                setDetail(res.data.data)
            }))
            .catch((err => {
                setDetail(err)
            }))
    }, [])

    return (
        <div className='d-flex bg-secondary-subtle' id='wrapper'>
            <SidebarAdmin />
            <div className='w-100' id='page-content-wrapper'>
                < NavbarAdmin />
                <h3 className='my-4 mx-2 p-2 rounded text-center bg-white text-success shadow'>Low Priority Tickets</h3>
                {detail.map((ticket,index)=>(                
                <div key={index} className=' p-1 m-2 bg-white shadow rounded'>
                    <p className='fs-5 fw-bolder text-center bg-success p-1 rounded'>Subject: {ticket.subject}</p>
                    <p className='text-primary fw-bolder'>Employee Name: {ticket.employee_name}</p>
                    <p className='text-primary-emphasis fw-bold'>Employee ID: {ticket.employee_id}</p>
                    <p className='text-primary-emphasis fw-semibold'>Detailed info:</p>
                    <p className='text-wrap text-break' style={textSpace}>{ticket.explain}</p>
                </div>
                ))}

            </div>
        </div>
    )
}

export default AdminLowPriorityTickets