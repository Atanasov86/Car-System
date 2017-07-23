import React from 'react'
import { Link } from 'react-router-dom'

const CarListing = (props) => (
  <div key={props.id} className='thumbnail col-md-5 col-md-offset-1'>
    <img src={props.image} alt={props.model} />
    <div className='caption'>
      <h4 className='pull-right'>{props.price} lv.</h4>
      <h3>{props.make}</h3>
      <h4>
        Model:
        <Link to={`/cars/details/${props.id}`}>{props.model}</Link>
      </h4>
    </div>
  </div>
)

export default CarListing
