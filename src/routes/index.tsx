import React, {useContext, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import {AuthProvider, AuthContext} from "../contexts/auth";

const Routes = () => {
    const {signed} = useContext(AuthContext)

    return (
        <BrowserRouter>
            <AuthProvider>
                {
                    signed
                        ? <AppRoutes/>
                        : <AuthRoutes/>
                }
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Routes;
