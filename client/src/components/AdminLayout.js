import React from 'react';
import AdminComponent from './AdminComponent/AdminComponent';
import {Outlet} from "react-router-dom";

const AdminLayout = ({children}) => {
    return (
        <div className="container-fluid admin-page">
            <div className="row">
                {/* Cột trái - sidebar */}
                <div className="col-3 sidebar p-3">
                    <AdminComponent />
                </div>

                {/* Cột phải - hiển thị form route con */}
                <div className="col-9 content p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;