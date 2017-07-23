import React from 'react'
import Input from '../../common/forms/Input'

const LoginForm = (props) => (
  <div className='container'>
    <div className='row'>
      <div className='col-md-offset-4 col-md-4'>
        <div className='form-login'>
          <h4>Welcome to login page</h4>
          {props.error ? (
            <div className='alert alert-danger'>{props.error}</div>
          ) : (<div />)}
          <Input type='email' name='email' placeholder='Email' value={props.user.email} onChange={props.onChange} />
          <Input type='password' name='password' value={props.user.password} placeholder='Password' onChange={props.onChange} />
          <div className='wrapper'>
            <span className='group-btn'>
              <input type='submit' className='btn btn-success btn-lg' value='Login' onClick={props.onSave} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default LoginForm
