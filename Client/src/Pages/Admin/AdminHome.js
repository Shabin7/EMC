import React from 'react'
import SidebarAdmin from '../../Component/Admin/SidebarAdmin'
import NavbarAdmin from '../../Component/Admin/NavbarAdmin'

function AdminHome() {
  return (
    <div className="d-flex bg-secondary-subtle" id="wrapper">

      {/* Sidebar starts */}
      <SidebarAdmin />
      {/* Sidebar ends */}

      <div className='w-100' id="page-content-wrapper">

        {/* Navbar starts */}
        <NavbarAdmin />
        {/* Navbar ends */}

      </div>
    </div>
  )
}

export default AdminHome