import React, { useEffect, useState } from 'react'
import Sidebar from '../../Component/Employee/Sidebar'
import Navbar from '../../Component/Employee/Navbar'
import axios from 'axios'
function EmployeeProfile() {
    const [details, setDetails] = useState('')
    useEffect(() => {
        axios
            .get('http://localhost:3001/employee/employeeprofile', { withCredentials: true })
            .then((res => {
                setDetails(res.data)
                console.log(res.data);
            }))
            .catch((err => {
                console.error('Error in fetching employee details', err)
            }))
    }, [])
    const profilePictureSrc = details.profile_picture ? `http://localhost:3001/${details.profile_picture.filename}` : 'default_profile_picture_url';
    return (
        <div className="d-flex bg-secondary-subtle" id='wrapper'>
            {/* Sidebar starts */}
            <Sidebar />
            {/* Sidebar ends */}

            <div className='w-100' id='page-content-wrapper'>
                {/*Navbar starts  */}
                <Navbar />
                {/*Navbar starts  */}

                {/* Content starts here */}
                <h3 className="my-4 mx-2 p-2 rounded text-center bg-white shadow">Profile</h3>
                <div className='d-flex justify-content-between m-3 bg-white p-2 rounded'>
                    <div className='w-50'>
                        <img className='rounded-circle img-fluid shadow' style={{height:'150px', width:'150px'}} src={profilePictureSrc} alt='profile' />
                        <div >
                            <h4 className='text-success text-uppercase m-2'>{details.employee_name}</h4>
                            <h6 className='fw-bold'><i className="bi bi-suitcase-lg m-2"></i> {details.designation}</h6>
                        </div>

                    </div>
                    <div className='text-center p-5 w-50'>
                        <p><i className="bi bi-envelope-fill text-primary"></i> <span className='fw-bold '>Email ID:</span>  {details.email}</p>
                        <p><i className="bi bi-telephone-fill text-primary"></i> <span className='fw-bold '>Phone:</span> {details.primary_phone}</p>
                        <p><i class="bi bi-calendar3-event-fill text-primary"> </i><span className='fw-bold'>Date of joining: </span> {new Date(details.date_of_joining).toLocaleDateString()}</p>
                    </div>
                </div>
                <div className='d-flex'>
                    <div className='w-100 ms-3 me-3 p-3 bg-white rounded'>
                        <p className='fs-5 text-body-secondary text-center shadow rounded'> Address</p>
                        <p> <span className='fw-bold '>House no: </span> {details.house_number} </p>
                        <p><span className='fw-bold '>Street name: </span>{details.street_name} </p>
                        <p><span className='fw-bold '>City: </span> {details.city} </p>
                        <p><span className='fw-bold '>Landmark: </span> {details.landmark}</p>
                        <p><span className='fw-bold '>Zip: </span> {details.zip} </p>
                        <p><span className='fw-bold '>District: </span> {details.district} </p>
                        <p><span className='fw-bold '>State: </span> {details.state} </p>
                        <p><span className='fw-bold '>Country: </span>{details.country} </p>
                    </div>
                    {/* <div className='w-50 me-3 ms-1 p-3 bg-white rounded'>
                        <p className='fs-5 text-body-secondary text-center shadow rounded'>Present Adress</p>
                        <p >House no: {details.house_number} </p>
                        <p>Street name: {details.street_name} </p>
                        <p>City: {details.city} </p>
                        <p>Landmark: </p>
                        <p>Zip: </p>
                        <p>District: </p>
                        <p>State: </p>
                        <p>Country </p>
                    </div> */}
                </div>
                <div className='d-flex'>
                    <div className='w-50 mt-3 ms-3 me-1 p-3 bg-white rounded text-center'>
                        <p className='fs-5 text-body-secondary text-center shadow '>Educational Details</p>
                        <h6 className='text-center fw-bold'>Course 1</h6>
                        <p><span className='fw-bold '>Course Name: </span> {details.course}</p>
                        <p><span className='fw-bold '>Passout Year: </span>{details.passout_year}</p>
                        <p><span className='fw-bold '>Institute: </span>{details.institute}</p>
                        <h6 className='text-center fw-bold'>Course 2</h6>
                        <p><span className='fw-bold '>Course Name: </span> {details.course_1}</p>
                        <p><span className='fw-bold '>Passout Year: </span>{details.passout_year_1}</p>
                        <p><span className='fw-bold '>Institute: </span>{details.institute_1}</p>
                        <h6 className='text-center fw-bold'>Course 3</h6>
                        <p><span className='fw-bold '>Course Name: </span>{details.course_2}</p>
                        <p><span className='fw-bold '>Passout Year: </span> {details.passout_year_2}</p>
                        <p><span className='fw-bold '>Institute: </span>{details.institute_2}</p>
                    </div>
                    <div className='w-50 mt-3 me-3 ms-1 p-3 bg-white rounded text-center'>
                        <p className='fs-5 text-body-secondary text-center shadow rounded'>Other Statutory information</p>
                        <h6 className='text-center fw-bold'>ID Details</h6>
                        <p><span className='fw-bold '>Aadhar no: </span>{details.aadhar_no}</p>
                        <p><span className='fw-bold '>PAN no: </span> {details.pan_no}</p>
                        <p><span className='fw-bold '>PF no: </span>{details.pf_no}</p>
                        <h6 className='text-center fw-bold'>Bank Details</h6>
                        <p><span className='fw-bold '>Bank name: </span>{details.bank}</p>
                        <p><span className='fw-bold '>Account no: </span> {details.account_no}</p>
                        <p><span className='fw-bold '>IFSC Code: </span>{details.ifsc_code}</p>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default EmployeeProfile