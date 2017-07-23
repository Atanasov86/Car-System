import React from 'react'

const CarReviewForm = (props) => (
  <div className='container'>
    <div className='row'>
      <div className='col-md-offset-4 col-md-4'>
        <h3>Leave your review</h3>
        {props.error ? (
          <div className='alert alert-danger'>{props.error}</div>
          ) : (<div />)}
        <div className='form-group'>
          <label for='sel1'>Select your rating:</label>
          <select onChange={props.onChange} className='form-control' id='sel1'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>
        <div className='input-group'>
          <textarea className='form-control custom-control' rows='3' onChange={props.onChange} />
          <span className='input-group-addon btn btn-primary' onClick={props.onSave}>Send</span>
        </div>
      </div>
    </div>
  </div>
)

export default CarReviewForm
