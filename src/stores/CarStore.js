import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import CarData from '../data/CarData'
import carActions from '../actions/CarActions'

class CarStore extends EventEmitter {
  create (car) {
    CarData.create(car)
      .then(data => this.emit(this.eventTypes.CAR_CREATED, data))
  }

  delete (id) {
    CarData.delete(id)
      .then(data => this.emit(this.eventTypes.CAR_DELETED, data))
  }

  all (page, search) {
    page = page || 1
    search = search || ''
    CarData.all(page, search)
      .then(data => this.emit(this.eventTypes.CARS_RETRIEVED, data))
  }

  allUserCars () {
    CarData.userCars()
      .then(data => this.emit(this.eventTypes.USER_CARS_RETRIEVED, data))
  }

  getCar (id) {
    CarData.getCar(id)
      .then(data => this.emit(this.eventTypes.CAR_DETAILS_RETRIEVED, data))
  }

  createReview (review, id) {
    CarData.createReview(review, id)
      .then(data => this.emit(this.eventTypes.REVIEW_CREATED, data))
  }

  like (id) {
    CarData.likeCar(id)
      .then(data => this.emit(this.eventTypes.CAR_LIKED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case carActions.types.CREATE_CAR: {
        this.create(action.car)
        break
      }
      case carActions.types.DELETE_CAR: {
        this.delete(action.id)
        break
      }
      case carActions.types.ALL_CARS: {
        this.all(action.page, action.search)
        break
      }
      case carActions.types.ALL_USER_CARS: {
        this.allUserCars()
        break
      }
      case carActions.types.CAR_DETAILS: {
        this.getCar(action.id)
        break
      }
      case carActions.types.CREATE_REVIEW: {
        this.createReview(action.review, action.id)
        break
      }
      case carActions.types.LIKE_CAR: {
        this.like(action.id)
        break
      }
      default: break
    }
  }
}

let carStore = new CarStore()
carStore.eventTypes = {
  CAR_CREATED: 'car_created',
  CAR_DELETED: 'car_deleted',
  CARS_RETRIEVED: 'car_retrived',
  USER_CARS_RETRIEVED: 'user_cars_retrieved',
  CAR_DETAILS_RETRIEVED: 'car_details_retrieved',
  REVIEW_CREATED: 'review_created',
  CAR_LIKED: 'car_liked'
}

dispatcher.register(carStore.handleAction.bind(carStore))

export default carStore
