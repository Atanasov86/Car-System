import Data from './Data'

const baseUrl = '/cars'

class CarData {
  static create (car) {
    return Data.post(`${baseUrl}/create/`, car, true)
  }

  static delete (id) {
    return Data.post(`${baseUrl}/delete/${id}`, {}, true)
  }

  static all (page, search) {
    page = page || 1
    search = search || ''

    return Data.get(`${baseUrl}/all?page=${page}&search=${search}`)
  }

  static userCars () {
    return Data.get(`${baseUrl}/mine`, true)
  }

  static getCar (id) {
    return Data.get(`${baseUrl}/details/${id}`, true)
  }

  static createReview (id, review) {
    return Data.post(`${baseUrl}/details/${id}/reviews/create`, review, true)
  }

  static allReviews (id) {
    return Data.get(`${baseUrl}/details/${id}/reviews`, true)
  }

  static likeCar (id) {
    return Data.post(`${baseUrl}/details/${id}/like`, {}, true)
  }
}

export default CarData
