import Data from './Data'

const baseUrl = '/auth'
class UserData {
  static register (user) {
    return Data.post(`${baseUrl}/signup`, user, false)
  }

  static login (user) {
    return Data.post(`${baseUrl}/login`, user, false)
  }
}

export default UserData
