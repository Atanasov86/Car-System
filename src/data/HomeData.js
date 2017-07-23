import Data from './Data'

const baseUrl = '/stats'

class HomeData {
  static getStats () {
    return Data.get(baseUrl, false)
  }
}

export default HomeData
