import React from 'react'
import carStore from '../../../stores/CarStore'
import carActions from '../../../actions/CarActions'
import CarListing from '../../cars/list/CarListing'
import FormHelpers from '../../common/forms/FormHelpers'
import toastr from 'toastr'

class UserProfilePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      cars: []
    }

    this.handleUserCarsRetrieved = this.handleUserCarsRetrieved.bind(this)
    carStore.on(
      carStore.eventTypes.USER_CARS_RETRIEVED,
      this.handleUserCarsRetrieved)
    carStore.on(
      carStore.eventTypes.CAR_DELETED,
      this.handleDeteledCarData)
  }

  handleUserCarsRetrieved (cars) {
    this.setState({ cars })
  }

  handleDeteledCarData (data) {
    if (!data.success) {
      let firstError = FormHelpers.getErrorMsg(data)
      toastr.error(firstError)
    } else {
      toastr.success(data.message)
      carActions.allUserCars()
    }
  }

  handleDeleteCar (id) {
    carActions.deleteCar(id)
  }

  componentDidMount () {
    carActions.allUserCars()
  }

  componentWillUnmount () {
    carStore.removeListener(
      carStore.eventTypes.USER_CARS_RETRIEVED,
      this.handleUserCarsRetrieved)
    carStore.removeListener(
      carStore.eventTypes.CAR_DELETED,
      this.handleDeteledCarData)
  }

  render () {
    let cars = 'No founded cars'

    if (this.state.cars.length !== 0) {
      cars = this.state.cars.map(car => (
        <CarListing key={car.id} {...car} onClick={this.handleDeleteCar.bind(this)} />
    ))
    }
    return (
      <div className='container'>
        <div className='row'>
          <h3>All my cars</h3>
          {cars}
        </div>
      </div>
    )
  }
}

export default UserProfilePage
