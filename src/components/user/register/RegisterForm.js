import React from 'react'
import Input from '../../common/forms/Input'

class RegisterForm extends React.Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-offset-4 col-md-4'>
            <div className='form-login'>
              <h4>Welcome to register page</h4>
              {this.props.error ? (
                <div className='alert alert-danger'>{this.props.error}</div>
              ) : (<div />)}
              <Input
                type='text'
                className='form-control input-lg chat-input'
                name='name'
                value={this.props.user.name}
                placeholder='Enter your Name'
                onChange={this.props.onChange} />
              <Input
                type='email'
                className='form-control input-lg chat-input'
                name='email'
                value={this.props.user.email}
                placeholder='Enter your Email'
                onChange={this.props.onChange} />
              <Input
                type='password'
                className='form-control input-lg chat-input'
                name='password'
                value={this.props.user.password}
                placeholder='Enter your Password'
                onChange={this.props.onChange} />
              <Input
                type='password'
                className='form-control input-lg chat-input'
                name='confirmPassword'
                value={this.props.user.confirmPassword}
                placeholder='Confirm your Password'
                onChange={this.props.onChange} />
              <input type='submit' className='btn btn-success btn-lg' onClick={this.props.onSave} value='Register' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterForm
