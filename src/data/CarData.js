import Data from './Data'

const baseUrl = '/cars'

class CarData {
  static create (car) {
    return Data.post(`${baseUrl}/create/`, car, true)
  }

  static all (page, search) {
    page = page || 1
    search = search || ''

    return Data.get(`${baseUrl}/all?page=${page}&search=${search}`)
  }

  static getCar (id) {
    return Data.get(`${baseUrl}/details/${id}`, true)
  }

  static createReview (review, id) {
    return Data.post(`${baseUrl}/details/${id}/reviews/create`, true)
  }
}

export default CarData
