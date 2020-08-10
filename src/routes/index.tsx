import React from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useIsSigned } from "../contexts/auth";

const Routes = () => {
    return useIsSigned()
        ? <AppRoutes />
        : <AuthRoutes />

}

export default Routes;
