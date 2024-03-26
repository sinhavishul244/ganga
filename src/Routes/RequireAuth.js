import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavBar from "../components/NavBar";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find(role => {
            // console.log("roles check")
            // console.log(role?.roleId)
            // console.log(allowedRoles[0])
            return allowedRoles?.includes(role.roleId)
        })
            ? <> <NavBar /><Outlet /></>
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;