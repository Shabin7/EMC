import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SidebarAdmin from '../../Component/Admin/SidebarAdmin';
import NavbarAdmin from '../../Component/Admin/NavbarAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import { validateForm } from '../../Utils/Validation';

const EditEmployees = () => {
    const [form, setForm] = useState({
        employee_name: "",
        employee_id: "",
        date_of_birth: "",
        designation: "",
        profile_picture: null,
        date_of_joining: "",
        house_number: "",
        street_name: "",
        city: "",
        landmark: "",
        zip: "",
        district: "",
        state: "",
        country: "",
        primary_phone: "",
        secondary_phone: "",
        email: "",
        pan_no: "",
        aadhar_no: "",
        pf_no: "",
        bank: "",
        ifsc_code: "",
        account_no: "",
        course: "",
        passout_year: "",
        institute: "",
        course_1: "",
        passout_year_1: "",
        institute_1: "",
        course_2: "",
        passout_year_2: "",
        institute_2: "",
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    useEffect(() => {
        axios
            .get(`http://localhost:3001/admin/getEmployeeById/${id}`)
            .then((res) => {
                const data = res.data.data
                setForm({
                    ...data,
                    date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().split('T')[0] : "",
                    date_of_joining: data.date_of_joining ? new Date(data.date_of_joining).toISOString().split('T')[0] : "",
                })

                console.log(res.data.data);
            })
            .catch((err) => {
                alert("error in loading employee");
                console.error('Error in fatching employee details', err);
            })
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const requiredFields = [
            'employee_name', 'employee_id', 'date_of_birth', 'designation', 'profile_picture', 'date_of_joining', 'house_number',
            'street_name', 'city', 'landmark', 'zip', 'district', 'state', 'country', 'primary_phone', 'secondary_phone', 'email', 'pan_no',
            'aadhar_no', 'pf_no', 'bank', 'ifsc_code', 'account_no', 'course', 'passout_year', 'institute', 'course_1', 'passout_year_1',
            'institute_1', 'course_2', 'passout_year_2', 'institute_2'
        ]
        const errors = validateForm(form, requiredFields)
        setErrors(errors)
        if (Object.keys(errors).length > 0) {
            return;
        }
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }
        axios
            .put(`http://localhost:3001/admin/editemployees/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log(res);
                alert("Employee Updated")
                navigate('/allemployees')

            })
            .catch((error) => {
                console.log(error);
                alert("Error in editing employee")
            })
    }

    return (
        <div className="d-flex  bg-secondary-subtle" id="wrapper">

            {/* Sidebar starts here */}
            <SidebarAdmin />
            {/* Sidebar ends here */}
            <div className='w-100' id="page-content-wrapper">

                {/* Navbar starts */}
                <NavbarAdmin />
                {/* Navbar ends */}

                {/* Form Body starts here  */}
                <div className='container'>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div>
                            <h4 className="text-center p-4">Edit Employee Profile</h4>
                            <hr></hr>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="emploueename4" className="form-label">Employee Name:</label>
                            <input type="text" className="form-control" id="emploueename4"
                                name='employee_name'
                                value={form.employee_name}
                                onChange={handleChange} />
                            {errors.employee_name && <small className="text-danger">{errors.employee_name}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="employeeid4" className="form-label">Employee ID</label>
                            <input type="number" className="form-control" id="employeeid4"
                                name='employee_id'
                                value={form.employee_id}
                                onChange={handleChange} />
                            {errors.employee_id && <small className="text-danger">{errors.employee_id}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="dateofbirth4" className="form-label">Date of birth</label>
                            <input type="date" className="form-control" id="dateofbirth4"
                                name='date_of_birth'
                                value={form.date_of_birth}
                                onChange={handleChange} />
                            {errors.date_of_birth && <small className="text-danger">{errors.date_of_birth}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="designation4" className="form-label">Designation</label>
                            <select className="form-select" aria-label="Default select example" id='designation4'
                                name='designation'
                                value={form.designation}
                                onChange={handleChange}>
                                <option value='' disabled>Choose</option>
                                <option>Frontend Developer</option>
                                <option>Backend Developer</option>
                                <option>Fullstack Developer</option>
                                <option>Tester</option>
                            </select>
                            {errors.designation && <small className="text-danger">{errors.designation}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="formFile" className="form-label">Upload Profile Picture</label>
                            <input className="form-control" type="file" id="formFile"
                                name='profile_picture'
                                onChange={handleChange} />
                            {errors.profile_picture && <small className="text-danger">{errors.profile_picture}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="unknown4" className="form-label">Date of Joining</label>
                            <input type="date" className="form-control" id="unknown4"
                                name='date_of_joining'
                                value={form.date_of_joining}
                                onChange={handleChange} />
                            {errors.date_of_joining && <small className="text-danger">{errors.date_of_joining}</small>}
                        </div>

                        <p className="fw-bolder mb-0 mt-5 ps-4">Permanent Adress</p>
                        <div className="col-md-3">
                            <label htmlFor="housenumber4" className="form-label">House Number</label>
                            <input type="text" className="form-control" id="housenumber4"
                                name='house_number'
                                value={form.house_number}
                                onChange={handleChange} />
                            {errors.house_number && <small className="text-danger">{errors.house_number}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="streetname4" className="form-label">Street Name</label>
                            <input type="text" className="form-control" id="streetname4"
                                name='street_name'
                                value={form.street_name}
                                onChange={handleChange} />
                            {errors.street_name && <small className="text-danger">{errors.street_name}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="city4" className="form-label">City</label>
                            <input type="text" className="form-control" id="city4"
                                name='city'
                                value={form.city}
                                onChange={handleChange} />
                            {errors.city && <small className="text-danger">{errors.city}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="landmark4" className="form-label">Land Mark</label>
                            <input type="text" className="form-control" id="landmark4"
                                name='landmark'
                                value={form.landmark}
                                onChange={handleChange} />
                            {errors.landmark && <small className="text-danger">{errors.landmark}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="zip4" className="form-label">ZIP</label>
                            <input type="text" className="form-control" id="zip4"
                                name='zip'
                                value={form.zip}
                                onChange={handleChange} />
                            {errors.zip && <small className="text-danger">{errors.zip}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="district4" className="form-label">District</label>
                            <input type="text" className="form-control" id="district4"
                                name='district'
                                value={form.district}
                                onChange={handleChange} />
                            {errors.district && <small className="text-danger">{errors.district}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="state4" className="form-label">State</label>
                            <input type="text" className="form-control" id="state4"
                                name='state'
                                value={form.state}
                                onChange={handleChange} />
                            {errors.state && <small className="text-danger">{errors.state}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="country4" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country4"
                                name='country'
                                value={form.country}
                                onChange={handleChange} />
                            {errors.country && <small className="text-danger">{errors.country}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="primaryphone4" className="form-label">Primary Phone</label>
                            <input type="number" className="form-control" id="primaryphone4"
                                name='primary_phone'
                                value={form.primary_phone}
                                onChange={handleChange} />
                            {errors.primary_phone && <small className="text-danger">{errors.primary_phone}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="secondaryphone4" className="form-label">Secondary Phone</label>
                            <input type="number" className="form-control" id="secondaryphone4"
                                name='secondary_phone'
                                value={form.secondary_phone}
                                onChange={handleChange} />
                            {errors.secondary_phone && <small className="text-danger">{errors.secondary_phone}</small>}
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="secondaryemail4" className="form-label">Email ID</label>
                            <input type="email" className="form-control" id="secondaryemail4"
                                name='email'
                                value={form.email}
                                onChange={handleChange} />
                            {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>

                        <p className="fw-bolder mb-0 mt-5 ps-4 ">Other Statutory information</p>
                        <div className="col-md-2">
                            <label htmlFor="panno4" className="form-label">PAN No</label>
                            <input type="text" className="form-control" id="panno4"
                                name='pan_no'
                                value={form.pan_no}
                                onChange={handleChange} />
                            {errors.pan_no && <small className="text-danger">{errors.pan_no}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="aadharno4" className="form-label">Aadhar No</label>
                            <input type="number" className="form-control" id="aadharno4"
                                name='aadhar_no'
                                value={form.aadhar_no}
                                onChange={handleChange} />
                            {errors.aadhar_no && <small className="text-danger">{errors.aadhar_no}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="pfno4" className="form-label">PF No</label>
                            <input type="text" className="form-control" id="pfno4"
                                name='pf_no'
                                value={form.pf_no}
                                onChange={handleChange} />
                            {errors.pf_no && <small className="text-danger">{errors.pf_no}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="bank4" className="form-label">Bank</label>
                            <input type="text" className="form-control" id="bank4"
                                name='bank'
                                value={form.bank}
                                onChange={handleChange} />
                            {errors.bank && <small className="text-danger">{errors.bank}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="ifsccode4" className="form-label">IFSC Code</label>
                            <input type="text" className="form-control" id="ifsccode4"
                                name='ifsc_code'
                                value={form.ifsc_code}
                                onChange={handleChange} />
                            {errors.ifsc_code && <small className="text-danger">{errors.ifsc_code}</small>}
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="accountno4" className="form-label">Account No</label>
                            <input type="number" className="form-control" id="accountno4"
                                name='account_no'
                                value={form.account_no}
                                onChange={handleChange} />
                            {errors.account_no && <small className="text-danger">{errors.account_no}</small>}
                        </div>

                        <p className="fw-bolder mb-0 mt-5 ps-4 ">Educational Details</p>
                        <p className="ps-4">Higher Education</p>
                        <div className="col-md-4">
                            <label htmlFor="course4" className="form-label">Course</label>
                            <input type="text" className="form-control" id="course4"
                                name='course'
                                value={form.course}
                                onChange={handleChange} />
                            {errors.course && <small className="text-danger">{errors.course}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="passout4" className="form-label">Passout Year</label>
                            <input type="text" className="form-control" id="passout4"
                                name='passout_year'
                                value={form.passout_year}
                                onChange={handleChange} />
                            {errors.passout_year && <small className="text-danger">{errors.passout_year}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="institute4" className="form-label">Institute</label>
                            <input type="text" className="form-control" id="institute4"
                                name='institute'
                                value={form.institute}
                                onChange={handleChange} />
                            {errors.institute && <small className="text-danger">{errors.institute}</small>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="course5" className="form-label">Course</label>
                            <input type="text" className="form-control" id="course5"
                                name='course_1'
                                value={form.course_1}
                                onChange={handleChange} />
                            {errors.course_1 && <small className="text-danger">{errors.course_1}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="passout5" className="form-label">Passout Year</label>
                            <input type="text" className="form-control" id="passout5"
                                name='passout_year_1'
                                value={form.passout_year_1}
                                onChange={handleChange} />
                            {errors.passout_year_1 && <small className="text-danger">{errors.passout_year_1}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="institute5" className="form-label">Institute</label>
                            <input type="text" className="form-control" id="institute5"
                                name='institute_1'
                                value={form.institute_1}
                                onChange={handleChange} />
                            {errors.institute_1 && <small className="text-danger">{errors.institute_1}</small>}
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="course6" className="form-label">Course</label>
                            <input type="text" className="form-control" id="course6"
                                name='course_2'
                                value={form.course_2}
                                onChange={handleChange} />
                            {errors.course_2 && <small className="text-danger">{errors.course_2}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="passout6" className="form-label">Passout Year</label>
                            <input type="text" className="form-control" id="passout6"
                                name='passout_year_2'
                                value={form.passout_year_2}
                                onChange={handleChange} />
                            {errors.passout_year_2 && <small className="text-danger">{errors.passout_year_2}</small>}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="institute6" className="form-label">Institute</label>
                            <input type="text" className="form-control" id="institute6"
                                name='institute_2'
                                value={form.institute_2}
                                onChange={handleChange} />
                            {errors.institute_2 && <small className="text-danger">{errors.institute_2}</small>}
                        </div>

                        <div className="col-6">
                            <button type="submit" className="btn btn-primary bg-success" ><i className="bi bi-upload"></i> Update</button>
                        </div>
                        <div className="col-6">
                            <button type="reset" className="btn btn-primary bg-warning"><i className="bi bi-arrow-clockwise"></i> Reset</button>
                        </div>

                    </form>
                </div>

                {/* Form Body Ends here  */}

            </div>
        </div>
    )
}

export default EditEmployees