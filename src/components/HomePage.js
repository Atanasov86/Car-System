import React, { Component } from 'react'
import CarListing from './cars/list/CarListing'
import homeActions from '../actions/HomeActions'
import homeStore from '../stores/HomeStore'
import carActions from '../actions/CarActions'
import carStore from '../stores/CarStore'

class HomePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stats: {
        cars: 0,
        users: 0
      },
      cars: []
    }

    this.handleGetStats = this.handleGetStats.bind(this)
    this.handleGetCars = this.handleGetCars.bind(this)

    homeStore.on(
      homeStore.eventTypes.STATS_RETRIEVED,
      this.handleGetStats)
    carStore.on(
      carStore.eventTypes.CARS_RETRIEVED,
      this.handleGetCars)
  }

  handleGetStats (data) {
    this.setState({
      stats: {
        cars: data.cars,
        users: data.users
      }
    })
  }

  handleGetCars (data) {
    this.setState({
      cars: data
    })
  }

  componentWillUnmount () {
    homeStore.removeListener(
      homeStore.eventTypes.STATS_RETRIEVED,
      this.handleGetStats)

    carStore.removeListener(
      carStore.eventTypes.CARS_RETRIEVED,
      this.handleGetCars)
  }

  componentDidMount () {
    homeActions.getStats()
    carActions.allCars()
  }

  render () {
    const cars = this.state.cars.map(car => (
      <CarListing key={car.id} {...car} />
    ))

    return (
      <div className='container'>
        <div className='row'>
          <span>Total number of user is {this.state.stats.users}</span>
          <br />
          <span>Total number of cars is {this.state.stats.cars}</span>
        </div>
        <div className='row'>
          {cars}
        </div>
      </div>
    )
  }
}

export default HomePage
