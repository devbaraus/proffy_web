import React, { useContext } from "react";

import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import Notify from "../pages/Notify";
import { AuthContext } from "../contexts/auth";

function AuthRoutes() {
    console.log(useContext(AuthContext).user)
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/success" component={Notify} />
            {/*<Route path="*" component={Login}/>*/}
            <Redirect path='*' exact to="/" />
        </BrowserRouter>
    );
}

export default AuthRoutes;
