import React from 'react'
import CarForm from './CarForm'
import FormHelper from '../../common/forms/FormHelpers'
import carActions from '../../../actions/CarActions'
import carStore from '../../../stores/CarStore'
import validator from 'validator'
import toastr from 'toastr'

class CreateCarPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      car: {
        make: 'Mitsubishi',
        model: 'Lancer',
        year: 2008,
        engine: '2.0 Diesel',
        price: 100,
        image: 'http://carsrelease2014-2015.com/wp-content/uploads/2014/04/2014-mitsubishi-lancer-evolution-ralliart-4-door-sedan-tc-sst-mr-angular-front-exterior-view_100436225_l.jpg',
        mileage: ''
      },
      error: ''
    }

    this.handleCarCreation = this.handleCarCreation.bind(this)

    carStore.on(
      carStore.eventTypes.CAR_CREATED,
      this.handleCarCreation
    )
  }

  componentWillUnmount () {
    carStore.removeListener(
      carStore.eventTypes.CAR_CREATED,
      this.handleCarCreation
    )
  }

  handleCarCreation (data) {
    if (!data.success) {
      let firstError = FormHelper.getErrorMsg(data)
      this.setState({
        error: firstError
      })
    } else {
      toastr.success(data.message)
      this.props.history.push('/cars/all')
    }
  }

  handleCarChange (event) {
    FormHelper.handleFormChange.bind(this)(event, 'car')
  }

  handleCarForm (event) {
    event.preventDefault()
    // Validate form
    if (!this.validateCar()) {
      return
    }
    carActions.createCar(this.state.car)
  }

  validateCar () {
    const car = this.state.car
    let isValidForm = true
    let error = ''

    if (validator.isEmpty(car.make) || car.make.length < 3) {
      error = 'Make cannot be empty and at least more than 3 symbols.'
      isValidForm = false
    }

    if (validator.isEmpty(car.model) || car.model < 3) {
      error = 'Model cannot be empty and at least more than 3 symbols.'
      isValidForm = false
    }

    if (car.year < 1950 || car.year > 2050) {
      error = 'Year must be between 1950 and 2050.'
      isValidForm = false
    }

    if (validator.isEmpty(car.engine) || car.engine.length < 1) {
      error = 'Engine must be more than 1 symbol.'
      isValidForm = false
    }

    if (car.price < 0) {
      error = 'Price must be a positive number.'
      isValidForm = false
    }

    if (validator.isEmpty(car.image)) {
      error = 'Image URL is required.'
      isValidForm = false
    }

    if (error) {
      this.setState({ error })
    }

    return isValidForm
  }

  render () {
    return (
      <div>
        <h4>Create car Page</h4>
        <CarForm
          car={this.state.car}
          error={this.state.error}
          onChange={this.handleCarChange.bind(this)}
          onSave={this.handleCarForm.bind(this)} />
      </div>
    )
  }
}

export default CreateCarPage
