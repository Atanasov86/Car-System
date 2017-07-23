import React from 'react'
import Input from '../../common/forms/Input'
import FormHelpers from '../../common/forms/FormHelpers'
import CarListing from '../../cars/list/CarListing'
import qs from 'query-string'
import carActions from '../../../actions/CarActions'
import carStore from '../../../stores/CarStore'

class ListAllCarsPage extends React.Component {
  constructor (props) {
    super(props)

    let query = qs.parse(this.props.location.search)
    let search = query.search || ''

    let page = parseInt(query.page, 10) || 1

    this.state = {
      cars: [],
      page: page,
      search: {
        query: search
      }
    }

    this.handleCarRetrieved = this.handleCarRetrieved.bind(this)

    carStore.on(
      carStore.eventTypes.CARS_RETRIEVED,
      this.handleCarRetrieved)
  }

  componentDidMount () {
    carActions.allCars(this.state.page, this.state.search.query)
  }

  componentWillUnmount () {
    carStore.removeListener(
      carStore.eventTypes.CARS_RETRIEVED,
      this.handleCarRetrieved)
  }

  handleCarRetrieved (data) {
    this.setState({
      cars: data
    })
  }

  goToPrevPage () {
    let page = this.state.page
    let search = this.state.search.query
    page--
    if (page < 1) {
      page = 1
    }

    this.setState({
      page,
      search: {
        query: search
      }
    })

    this.props.history.push(`/cars/all?page=${page}&search=${search}`)
    carActions.allCars(page, search)
  }

  goToNextPage () {
    let page = this.state.page
    let search = this.state.search.query
    page++
    if (this.state.cars.length < 10) {
      return
    }

    this.setState({
      page: page,
      search: {
        query: search
      }
    })

    this.props.history.push(`/cars/all?page=${page}&search=${search}`)
    carActions.allCars(page, search)
  }

  handleSearchChange (event) {
    FormHelpers.handleFormChange.bind(this)(event, 'search')
  }

  handleSearchClick (event) {
    event.preventDefault()
    let search = this.state.search

    this.setState({
      search
    })
    this.props.history.push(`/cars/all?page=1&search=${search.query}`)
    carActions.allCars(1, search.query)
  }

  filterCar (search) {
    let cars = this.state.cars

    let filteredCars = cars.filter(c => {
      return c.make.toLowerCase().indexOf(search.toLowerCase()) !== -1
    })

    return filteredCars
  }

  render () {
    let cars = 'No founded cars'

    if (this.state.cars.length !== 0) {
      cars = this.state.cars.map(car => (
        <CarListing key={car.id} {...car} />
    ))
    }

    return (
      <div className='container'>
        <div className='row'>
          <h2>All Cars</h2>
          <div className='row'>
            <div className='col-md-offset-4 col-md-4'>
              <Input name='query'
                placeholder='Search'
                value={this.state.search.query}
                onChange={this.handleSearchChange.bind(this)} />
              <input type='submit'
                className='btn btn-success btn-lg'
                value='Search'
                onClick={this.handleSearchClick.bind(this)} />
            </div>
          </div>
          <div className='row'>
            <div className='pagination'>
              <ul className='pager'>
                <button className='btn btn-default' onClick={this.goToPrevPage.bind(this)}>&lt;&lt; Prev</button>
                <button className='btn btn-default' onClick={this.goToNextPage.bind(this)}>Next &gt;&gt;</button>
              </ul>
            </div>
          </div>
          {cars}
        </div>
        <div className='row'>
          <div className='pagination'>
            <button className='btn btn-default' onClick={this.goToPrevPage.bind(this)}>&lt;&lt; Prev</button>
            <button className='btn btn-default' onClick={this.goToNextPage.bind(this)}>Next &gt;&gt;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ListAllCarsPage
