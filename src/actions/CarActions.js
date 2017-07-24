import dispatcher from '../dispatcher'

const carActions = {
  types: {
    CREATE_CAR: 'CREATE_CAR',
    ALL_CARS: 'ALL_CARS',
    ALL_USER_CARS: 'ALL_USER_CARS',
    CAR_DETAILS: 'CAR_DETAILS',
    DELETE_CAR: 'DELETE_CAR',
    CREATE_REVIEW: 'CREATE_REVIEW',
    LIKE_CAR: 'LIKE_CAR'
  },
  createCar (car) {
    dispatcher.dispatch({
      type: this.types.CREATE_CAR,
      car
    })
  },
  deleteCar (id) {
    dispatcher.dispatch({
      type: this.types.DELETE_CAR,
      id
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
  allUserCars () {
    dispatcher.dispatch({
      type: this.types.ALL_USER_CARS
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
  },
  likeCar (id) {
    dispatcher.dispatch({
      type: this.types.LIKE_CAR,
      id
    })
  }
}

export default carActions
