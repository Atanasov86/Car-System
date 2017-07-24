import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import HomePage from '../../HomePage'
import LoginPage from '../../user/login/LoginPage'
import RegisterPage from '../../user/register/RegisterPage'
import LogoutPage from '../../user/LogoutPage'
import CreateCarPage from '../../cars/create/CreateCarPage'
import ListAllCars from '../../cars/list/ListAllCarPage'
import CarDetailsPage from '../../cars/details/CarDetailsPage'
import UserProfilePage from '../../user/profile/UserProfilePage'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={HomePage} />
    <Route path='/auth/login' component={LoginPage} />
    <Route path='/auth/register' component={RegisterPage} />
    <PrivateRoute path='/auth/logout' component={LogoutPage} />
    <PrivateRoute path='/cars/create' component={CreateCarPage} />
    <PrivateRoute path='/cars/all' component={ListAllCars} />
    <PrivateRoute path='/cars/details/:id' component={CarDetailsPage} />
    <PrivateRoute path='/cars/details/:id/reviews/create' component={CarDetailsPage} />
    <PrivateRoute path='/cars/details/:id/like' component={CarDetailsPage} />
    <PrivateRoute path='/cars/mine' component={UserProfilePage} />
  </Switch>
)

export default Routes
