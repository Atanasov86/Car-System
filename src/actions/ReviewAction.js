import dispatcher from '../dispatcher'

const reviewActions = {
  types: {
    CREATE_REVIEW: 'CREATE_REVIEW',
    ALL_REVIEWS: 'ALL_REVIEWS'
  },
  createReview (id, review) {
    dispatcher.dispatch({
      type: this.types.CREATE_REVIEW,
      id,
      review
    })
  },
  allReviews (id) {
    dispatcher.dispatch({
      type: this.types.ALL_REVIEWS,
      id
    })
  }
}

export default reviewActions
