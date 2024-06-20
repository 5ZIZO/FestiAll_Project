import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../components/api/api';
import { Navigate, Outlet } from 'react-router-dom';
import checkSignIn from '../components/authentication/checkSignIn';

export const AdminRouters = () => {
    const [currentUserInfo, setCurrentUserInfo] = useState(null);

    useEffect(() => {
        async function getUserData() {
        try {
            const userData = await getCurrentUser();
            console.log('userData:', userData.email);
            setCurrentUserInfo(userData.email);
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
    }

    getUserData();
    checkSignIn();
    }, [checkSignIn]);

    if (!currentUserInfo) {
        return null;
    }

    return <>{currentUserInfo === 'admin@admin.admin' ? <Outlet /> : <Navigate to="/" />}</>;
};