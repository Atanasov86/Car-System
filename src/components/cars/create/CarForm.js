import React from 'react'
import Input from '../../common/forms/Input'

const CarForm = (props) => (
  <div className='container'>
    <div className='row'>
      <div className='col-md-offset-4 col-md-4'>
        <div className='form-login'>
          <h4>Welcome to login page</h4>
          {props.error ? (
            <div className='alert alert-danger'>{props.error}</div>
          ) : (<div />)}
          <Input type='text' name='make' placeholder='Make' value={props.car.make} onChange={props.onChange} />
          <Input type='text' name='model' value={props.car.model} placeholder='Model' onChange={props.onChange} />
          <Input type='number' name='year' value={props.car.year} placeholder='Year' onChange={props.onChange} />
          <Input type='text' name='engine' value={props.car.engine} placeholder='Engine' onChange={props.onChange} />
          <Input type='number' name='price' value={props.car.price} placeholder='Price' onChange={props.onChange} />
          <Input type='text' name='image' value={props.car.image} placeholder='Image' onChange={props.onChange} />
          <Input type='number' name='mileage' value={props.car.mileage} placeholder='Mileage' onChange={props.onChange} />
          <div className='wrapper'>
            <span className='group-btn'>
              <input type='submit' className='btn btn-success btn-lg' value='Add Car' onClick={props.onSave} />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CarForm
