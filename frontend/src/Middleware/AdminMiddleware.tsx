// components/routes/AdminRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../services/auth.service';

const AdminMiddleware = ({ children }: { children: JSX.Element }) => {
    const [checking, setChecking] = useState(true);
    const [admin, setAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        isAdmin().then((result) => {
            setAdmin(result);
            setChecking(false);
        });
    }, []);

    if (checking) {
        return <div>Loading...</div>;
    }

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminMiddleware;
