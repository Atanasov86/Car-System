import dispatcher from '../dispatcher'

const carActions = {
  types: {
    CREATE_CAR: 'CREATE_CAR',
    ALL_CARS: 'ALL_CARS',
    CAR_DETAILS: 'CAR_DETAILS',
    CREATE_REVIEW: 'CREATE_REVIEW'
  },
  createCar (car) {
    dispatcher.dispatch({
      type: this.types.CREATE_CAR,
      car
    })
  },
  allCars (page, search) {
    page = page || 1
    search = search || ''
    dispatcher.dispatch({
      type: this.types.ALL_CARS,
      page,
      search
    })
  },
  getCarById (id) {
    dispatcher.dispatch({
      type: this.types.CAR_DETAILS,
      id
    })
  },
  createReview (review, id) {
    dispatcher.dispatch({
      type: this.types.CREATE_REVIEW,
      review,
      id
    })
  }
}

export default carActions
