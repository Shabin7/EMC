import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get('http://localhost:3001/employee/employeeprofile', { withCredentials: true })
            .then((res) => {
                setEmployee(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching employee details', err);
                setLoading(false);
            });
    }, []);

    return (
        <EmployeeContext.Provider value={{ employee, loading }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export { EmployeeContext, EmployeeProvider };
