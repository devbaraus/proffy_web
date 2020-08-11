import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'
import Landing from '../pages/Landing'
import TeacherList from '../pages/TeacherList'
import TeacherForm from '../pages/TeacherForm'
import Notify from '../pages/Notify'
import TeacherProfile from '../pages/TeacherProfile'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      <Route path="/profile" component={TeacherProfile} />
      <Route path="/success" component={Notify} />
      {/*<Redirect path="*" to="/" />*/}
    </BrowserRouter>
  )
}

export default AppRoutes
