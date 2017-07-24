import React from 'react'
import RegisterForm from './RegisterForm'
import userActions from '../../../actions/UserActions'
import userStore from '../../../stores/UserStore'
import formHelpers from '../../common/forms/FormHelpers'
import validator from 'validator'
import toastr from 'toastr'

class RegisterPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        email: 'test@test.com',
        password: '123456',
        confirmPassword: '123456',
        name: 'Test'
      },
      error: ''
    }

    this.handleUserRegistration = this.handleUserRegistration.bind(this)

    userStore.on(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration)
  }

  componentWillUnmount () {
    userStore.removeListener(
      userStore.eventTypes.USER_REGISTERED,
      this.handleUserRegistration)
  }

  handleUserChange (event) {
    formHelpers.handleFormChange.bind(this)(event, 'user')
  }

  handleUserRegistration (data) {
    if (!data.success) {
      let firstError = formHelpers.getErrorMsg(data)
      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push('/auth/login')
    }
  }

  handleUserForm (event) {
    event.preventDefault()

    if (!this.validateUser()) {
      return
    }
    userActions.register(this.state.user)
  }

  validateUser () {
    const user = this.state.user
    let formIsValid = true
    let error = ''

    if (!validator.equals(user.password, user.confirmPassword)) {
      error = 'Password and confirm password do not match.'
      formIsValid = false
    }

    if (user.password < 4 || user.password <= 0) {
      error = 'Password should be at least 4 symbols'
      formIsValid = false
    }

    if (user.name.length <= 0) {
      error = 'Please provide your name.'
      formIsValid = false
    }

    if (!validator.isEmail(user.email) || validator.isEmpty(user.email)) {
      error = 'Your email address is invalid'
      formIsValid = false
    }

    if (error) {
      this.setState({error})
    }

    return formIsValid
  }

  render () {
    return (
      <RegisterForm
        user={this.state.user}
        error={this.state.error}
        onChange={this.handleUserChange.bind(this)}
        onSave={this.handleUserForm.bind(this)} />
    )
  }
}

export default RegisterPage
