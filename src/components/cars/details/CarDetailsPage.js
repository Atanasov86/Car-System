import React from 'react'
import CarReviews from '../review/CarReviews'
import carActions from '../../../actions/CarActions'
import carStore from '../../../stores/CarStore'
import toastr from 'toastr'

class CarDetailsPage extends React.Component {
  constructor (props) {
    super(props)

    const id = this.props.match.params.id

    this.state = {
      id: id,
      car: {},
      reviews: [],
      liked: false,
      error: ''
    }

    this.handleCarRetrieved = this.handleCarRetrieved.bind(this)
    this.handleLikeData = this.handleLikeData.bind(this)

    carStore.on(
      carStore.eventTypes.CAR_DETAILS_RETRIEVED,
      this.handleCarRetrieved)
    carStore.on(
      carStore.eventTypes.CAR_LIKED,
      this.handleLikeData)
  }

  handleCarRetrieved (car) {
    this.setState({ car })
  }

  handleLikeData (data) {
    if (!data.success) {
      this.setState({
        liked: true
      })
      toastr.error(data.message)
    } else {
      this.setState({
        liked: true
      })
      toastr.success(data.message)
    }
    console.log(data)
  }

  handleLikeClick (event) {
    event.preventDefault()
    carActions.likeCar(this.state.car.id)
  }

  componentDidMount () {
    carActions.getCarById(this.state.id)
  }

  componentWillUnmount () {
    carStore.removeListener(
      carStore.eventTypes.CAR_DETAILS_RETRIEVED,
      this.handleCarRetrieved)

    carStore.removeListener(
      carStore.eventTypes.CAR_LIKED,
      this.handleLikeData)
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
            <button disabled={this.state.liked} className='btn btn-block btn-primary' onClick={this.handleLikeClick.bind(this)}>
              <i className='fa fa-thumbs-up'>Like</i>
            </button>
          </div>

          <CarReviews
            reviews={this.state.reviews}
            error={this.state.error}
            carId={this.state.id}
          />
        </div>
      </div>
    )
  }
}

export default CarDetailsPage
