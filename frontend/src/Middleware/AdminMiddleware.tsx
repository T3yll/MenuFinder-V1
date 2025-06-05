// components/routes/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAdmin } from '../services/auth.service';

const AdminMiddleware = ({ children }: { children: JSX.Element }) => {
    isAdmin().then((result) => {
        if (!result) {
        return <Navigate to="/login" replace />;
        }
    });
 return children;
};

export default AdminMiddleware;
