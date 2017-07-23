import Auth from '../components/user/Auth'
const baseUrl = 'http://localhost:5000'

const getOptions = () => ({
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const applyAuthorizationHeader = (options, authenticated) => {
  if (authenticated) {
    let token = Auth.getToken()
    options.headers.Authorization = `bearer ${token}`
  }
}

const handleJsonResponse = res => res.json()

class Data {
  static post (url, data, authenticated) {
    let options = getOptions()
    options.method = 'POST'
    options.body = JSON.stringify(data)

    applyAuthorizationHeader(options, authenticated)

    return window.fetch(`${baseUrl}${url}`, options)
      .then(handleJsonResponse)
  }

  static get (url, authenticated) {
    let options = getOptions()
    options.method = 'GET'

    applyAuthorizationHeader(options, authenticated)

    return window.fetch(`${baseUrl}${url}`, options)
      .then(handleJsonResponse)
  }
}

export default Data
