import React from 'react'
import FormHelpers from '../../common/forms/FormHelpers'
import CarReviewForm from '../details/CarReviewForm'
import carActions from '../../../actions/CarActions'
import carStore from '../../../stores/CarStore'

class DetailsPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      car: {},
      newReview: '',
      reviews: [],
      error: ''
    }

    this.handleCarRetrieved = this.handleCarRetrieved.bind(this)

    carStore.on(
      carStore.eventTypes.CAR_DETAILS_RETRIEVED,
      this.handleCarRetrieved)
  }

  handleCarRetrieved (car) {
    this.setState({car})
  }

  handleReviewChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'newReview')
  }

  handleReviewForm (event) {
    event.preventDefault()
    const id = this.props.match.params.id
    //validate 
    carActions.createReview(this.state.newReview, id)
  }

  componentDidMount () {
    const id = this.props.match.params.id
    carActions.getCarById(id)
  }

  componentWillunmount () {
    carStore.removeListener(
      carStore.eventTypes.CAR_DETAILS_RETRIEVED,
      this.handleCarRetrieved)
  }

  render () {
    return (
      <div>
        <div key={this.state.car.id} className='thumbnail col-md-6 col-md-offset-3'>
          <img src={this.state.car.image} alt={this.state.car.model} />
          <div className='caption'>
            <h4>Manufacturer: {this.state.car.make}</h4>
            <h4>Model: {this.state.car.model}</h4>
            <h4>Year: {this.state.car.year}</h4>
            <h4>Engine: {this.state.car.engine}</h4>
            <h4>Mileage: {this.state.car.mileage}</h4>
            <h4>Price: {this.state.car.price} lv. at day</h4>
          </div>
        </div>
        <CarReviewForm
          reviews={this.state.reviews}
          error={this.state.error}
          onChange={this.handleReviewChange.bind(this)}
          onSave={this.handleReviewForm.bind(this)} />
      </div>

    )
  }
}

export default DetailsPage
