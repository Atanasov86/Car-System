import React from 'react'
import FormHalper from '../../common/forms/FormHelpers'
import reviewActions from '../../../actions/ReviewAction'
import ReviewStore from '../../../stores/ReviewStore'
import CarReviewForm from './CarReviewForm'
import CarReviewList from './CarReviewList'
import toastr from 'toastr'

class CarReviews extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      newReview: {
        rating: 0,
        comment: ''
      },
      reviews: [],
      error: ''
    }

    this.handleReviewsRetrieved = this.handleReviewsRetrieved.bind(this)
    this.handleReviewAdded = this.handleReviewAdded.bind(this)

    ReviewStore.on(
      ReviewStore.eventTypes.REVIEWS_RETRIEVED,
      this.handleReviewsRetrieved)

    ReviewStore.on(
      ReviewStore.eventTypes.REVIEW_CREATED,
      this.handleReviewAdded)
  }

  componentDidMount () {
    reviewActions.allReviews(this.props.carId)
  }

  componentWillUnmount () {
    ReviewStore.removeListener(
      ReviewStore.eventTypes.REVIEW_CREATED,
      this.handleReviewAdded)

    ReviewStore.removeListener(
      ReviewStore.eventTypes.REVIEWS_RETRIEVED,
      this.handleReviewsRetrieved)
  }

  handleReviewsRetrieved (reviews) {
    this.setState({
      reviews
    })
  }

  handleReviewAdded (data) {
    if (!data.success) {
      let firstError = FormHalper.getErrorMsg(data)
      this.setState({
        error: firstError
      })
    } else {
      const reviews = this.state.reviews
      reviews.push(data.review)
      this.setState({
        reviews
      })
      toastr.success(data.message)
    }
  }

  handleReviewChange (event) {
    FormHalper.handleFormChange.bind(this)(event, 'newReview')
  }

  handleReviewSave (event) {
    event.preventDefault()
    // validate
    const rating = parseInt(this.state.newReview.rating, 10)
    if (!rating || rating < 1 || rating > 5) {
      this.setState({
        error: 'Rating must be between 1 and 5.'
      })
      return
    }

    reviewActions.createReview(this.props.carId, this.state.newReview)
  }

  render () {
    let reviews = ''

    if (this.state.reviews.length > 0) {
      reviews = this.state.reviews.map((review, index) => (
        <CarReviewList key={index} review={review} />
      ))
    }
    return (
      <div className='row'>
        <h3>Leave your review</h3>
        <CarReviewForm
          error={this.state.error}
          review={this.state.newReview}
          onChange={this.handleReviewChange.bind(this)}
          onSave={this.handleReviewSave.bind(this)}
        />
        {reviews}
      </div>
    )
  }
}

export default CarReviews
