import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../user/Auth'
import userStore from '../../stores/UserStore'

class Navbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: Auth.getUser().name
    }

    this.handleUserLoggedIn = this.handleUserLoggedIn.bind(this)

    userStore.on(
      userStore.eventTypes.USER_LOGGED,
      this.handleUserLoggedIn)
  }

  handleUserLoggedIn (data) {
    if (data.success) {
      this.setState({
        username: data.user.name
      })
    }
  }
  render () {
    return (
      <div className='navbar navbar-inverse navbar-fixed-top' role='navigation'>
        <div className='container'>
          <div className='navbar-header'>
            <Link className='navbar-brand' to='/'> Car System
            </Link>
          </div>
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li>
                <Link to='/'>Home</Link>
              </li>
            </ul>
            {!Auth.isUserAuthenticated() ? (
              <ul className='nav navbar-nav'>
                <li>
                  <Link to='/auth/login'>Login</Link>
                </li>
                <li>
                  <Link to='/auth/register'>Register</Link>
                </li>
              </ul>
                ) : (
                  <ul className='nav navbar-nav'>
                    <li>
                      <Link to='/cars/create'>Add Car</Link>
                    </li>
                    <li>
                      <Link to='/cars/all'>All Cars</Link>
                    </li>
                  </ul>
                )}
            {Auth.isUserAuthenticated() ? (
              <div className='collapse navbar-collapse'>
                <ul className='nav navbar-nav navbar-right' >
                  <li><Link to='/auth/profile'>{this.state.username}</Link></li>
                  <li><Link to='/auth/logout'>Logout</Link></li>
                </ul>
              </div>
            ) : (<div />)}
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar
