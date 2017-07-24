import React from 'react'

const CarReviewList = (props) => (
  <div className='col-md-offset-2 col-md-8'>
    <div className='panel panel-primary'>
      <div className='panel-heading'>
        <h3 className='panel-title'>Added by {props.review.user} with rating {props.review.rating}</h3>
      </div>
      <div className='panel-body'>
        {props.review.comment}
      </div>
    </div>
  </div>
)

export default CarReviewList
