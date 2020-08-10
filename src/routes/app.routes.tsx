import React from "react";

import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import Landing from "../pages/Landing";
import TeacherList from "../pages/TeacherList";
import TeacherForm from "../pages/TeacherForm";
import Notify from "../pages/Notify";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
            <Route path="/success" component={Notify}/>
            <Redirect path='*' exact to="/"/>
        </BrowserRouter>
    );
}

export default AppRoutes;
