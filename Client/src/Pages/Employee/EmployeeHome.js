import React from 'react'
import img2 from '../../img/Announcement.jpg'
import img3 from '../../img/Report.jpg'
import Sidebar from '../../Component/Employee/Sidebar'
import Navbar from '../../Component/Employee/Navbar'


function EmployeeHome() {


    return (
        <div className="d-flex  bg-secondary-subtle" id="wrapper">

            {/* Sidebar starts here */}
            <Sidebar />
            {/* Sidebar ends here */}

            <div id="page-content-wrapper">

                {/* Navigation bar starts here */}
                <Navbar />
                {/* Navigation bar Ends here */}
                <div className="row row-cols-1 row-cols-md-2 g-5 mx-4 mt-1 ">

                    <div className="col">
                        <div className="card">
                            <h3 className="text-center mt-4">Anouncement</h3>
                            <img src={img2} className="card-img-top px-1" alt="..." height="400 %" />
                            <div className="card-body">
                                <h5 className="card-title">Detailed info</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <h3 className="text-center mt-4">Events</h3>
                            <img src={img3} className="card-img-top px-1" alt="..." height="400 %" />
                            <div className="card-body">
                                <h5 className="card-title">Detailed info</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>



    )
}

export default EmployeeHome