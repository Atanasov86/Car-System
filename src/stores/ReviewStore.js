import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import reviewActions from '../actions/ReviewAction'
import CarData from '../data/CarData'

class ReviewStore extends EventEmitter {
  create (id, review) {
    CarData.createReview(id, review)
      .then(data => this.emit(this.eventTypes.REVIEW_CREATED, data))
  }

  allReviews (id) {
    CarData.allReviews(id)
      .then(data => this.emit(this.eventTypes.REVIEWS_RETRIEVED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case reviewActions.types.CREATE_REVIEW: {
        this.create(action.id, action.review)
        break
      }
      case reviewActions.types.ALL_REVIEWS: {
        this.allReviews(action.id)
        break
      }
      default: break
    }
  }
}

let reviewStore = new ReviewStore()
reviewStore.eventTypes = {
  REVIEW_CREATED: 'review_created',
  REVIEWS_RETRIEVED: 'reviews_retrieved'
}

dispatcher.register(reviewStore.handleAction.bind(reviewStore))

export default reviewStore
