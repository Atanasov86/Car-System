import React from 'react'
import LoginFrom from './LoginForm'
import formHelpers from '../../common/forms/FormHelpers'
import userActions from '../../../actions/UserActions'
import userStore from '../../../stores/UserStore'
import Auth from '../Auth'
import toastr from 'toastr'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        email: 'test@test.com',
        password: '123456'
      },
      error: ''
    }
    this.handleUserLogin = this.handleUserLogin.bind(this)

    userStore.on(
      userStore.eventTypes.USER_LOGGED,
      this.handleUserLogin)
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_LOGGED,
      this.handleUserLogin)
  }

  handleUserChange (event) {
    formHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleUserForm (event) {
    event.preventDefault()

    // Validate Form
    userActions.login(this.state.user)
  }

  handleUserLogin (data) {
    if (!data.success) {
      this.setState({
        error: data.message
      })
    } else {
      let user = data.user
      user.email = this.state.user.email

      Auth.authenticateUser(data.token)
      Auth.saveUser(user)
      toastr.success(data.message)
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <LoginFrom
        user={this.state.user}
        error={this.state.error}
        onChange={this.handleUserChange.bind(this)}
        onSave={this.handleUserForm.bind(this)} />
    )
  }
}

export default LoginPage
