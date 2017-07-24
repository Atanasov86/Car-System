import React from 'react'
import { Link } from 'react-router-dom'

class CarListing extends React.Component {
  _onClick () {
    this.props.onClick(this.props.id)
  }

  render () {
    return (
      <div key={this.props.id} className='thumbnail col-md-5 col-md-offset-1'>
        <img src={this.props.image} alt={this.props.model} />
        <div className='caption'>
          <h4 className='pull-right'>{this.props.price} lv.</h4>
          <h3>{this.props.make}</h3>
          <h4>
            Model:
            <Link to={`/cars/details/${this.props.id}`}>{this.props.model}</Link>
          </h4>
        </div>
        {this.props.hidden ? (<div />)
        : (<input
          type='submit'
          data-Id={this.props.id}
          className='btn btn-danger'
          value='Delete car'
          onClick={this._onClick.bind(this)} />
          )}
      </div>
    )
  }
}
export default CarListing
