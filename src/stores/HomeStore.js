import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import HomeData from '../data/HomeData'
import homeActions from '../actions/HomeActions'

class HomeStore extends EventEmitter {
  getStats () {
    HomeData.getStats()
      .then(data => this.emit(this.eventTypes.STATS_RETRIEVED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case homeActions.types.GET_STATS : {
        this.getStats()
        break
      }

      default: break
    }
  }
}

let homeStore = new HomeStore()
homeStore.eventTypes = {
  STATS_RETRIEVED: 'stats_retrieved'
}

dispatcher.register(homeStore.handleAction.bind(homeStore))

export default homeStore
