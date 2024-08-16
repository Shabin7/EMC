import React from 'react'
import SidebarHr from '../../Component/HR/SidebarHr'
import NavbarHr from '../../Component/HR/NavbarHr'

function HrHome() {
  return (
    <div class="d-flex  bg-secondary-subtle" id="wrapper">

        {/* Sidebar starts */}
        <SidebarHr/>
        {/* Sidebar ends */}

        <div className='w-100' id="page-content-wrapper">
            {/* Navbar starts */}
            <NavbarHr/>
            {/* Navbar ends */}

             {/* Payment starts here */}
             <form className="row g-3 m-0 bg-secondary-subtle">

                </form>
                {/* Payment Ends here    */}


        </div>

    </div>
  )
}

export default HrHome