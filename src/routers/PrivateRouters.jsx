import React from 'react'
import useAuthStore from '../store/store'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouters = () => {
    const isSignedIn = useAuthStore(state => state.isSignedIn);
    console.log("isSignedIn => ", isSignedIn);

    return (
        <>
            {isSignedIn ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}

export default PrivateRouters