import React, { useEffect, useState } from 'react';
import SidebarHr from '../../Component/HR/SidebarHr';
import NavbarHr from '../../Component/HR/NavbarHr';
import axios from 'axios';

const HrAllEmployees = () => {
  const [detail, setDetail] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/hr/allemployees')
      .then((res => {
        setDetail(res.data.data)
      }))
      .catch((err => {
        setDetail(err)
      }))
  }, [])
  return (
    <div className='d-flex bg-secondary-subtle' id='wrapper'>
      <SidebarHr />
      <div className='w-100' id='page-content-wrapper'>
        <NavbarHr />
        <h3 className="my-4 mx-2 p-2 rounded text-center bg-white shadow">Employee Details</h3>

        <div className="container-fluid">

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Employee Name</th>
                <th scope="col">Designation</th>
                <th scope="col">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {detail.map((a) => (
                <tr key={a._id}>
                  <th scope="row">{a.employee_name}</th>
                  <td>{a.designation}</td>
                  <td>{new Date(a.date_of_joining).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default HrAllEmployees