import React from 'react'
import Input from '../../common/forms/Input'

const CarReviewForm = (props) => (
  <div className='col-md-offset-3 col-md-6 mb-20'>
    {props.error ? (
      <div className='alert alert-danger'>{props.error}</div>
      ) : (<div />)}
    <div className='form-group'>
      <label htmlFor='sel1'>Select your rating:</label>
      <Input
        name='rating'
        type='number'
        placeholder='Rating'
        value={props.review.rating}
        onChange={props.onChange}
      />
    </div>
    <div className='input-group'>
      <textarea className='form-control custom-control'
        rows='3'
        name='comment'
        placeholder='Leave your comment'
        value={props.review.comment}
        onChange={props.onChange} />
      <span className='input-group-addon btn btn-primary' onClick={props.onSave}>Add Review</span>
    </div>
  </div>
)

export default CarReviewForm
