class Utils {
  constructor () {
    const d = document
    this.casePage = 'index.html'
    this.loginPage = 'login.html'

    this.REPO_PERSIST = 'persist'
    this.REPO_DELETE = 'delete'
    this.REPO_GETDATA = 'get'

    this.api = {
      login: '/auth/login',
      case: '/cases/next-case',
      review: '/cases/review-case/',
      conditions: '/conditions'
    }
  }
    getUserData = (type = 'all') => {
      let userData = this.repository('get', '')
      userData = JSON.parse(userData)
      if (type === 'user') {
        return userData.user
      }
      if (type === 'token') {
        return userData.token
      }
      if (type === 'all') {
        return userData
      }
    }
    repository = (action, data) => {
      let requestedData = null
      if (typeof data !== 'string') {
        console.log('must to be a string data')
        return false
      }
      if (action === this.REPO_PERSIST) {
        localStorage.setItem('gyant-app:data', data)
      }
      if (action === this.REPO_DELETE) {
        localStorage.removeItem('gyant-app:data')
      }
      if (action === this.REPO_GETDATA) {
        requestedData = localStorage.getItem('gyant-app:data')
      }
      return requestedData || true
    }
    navigate = (to) => {
      return window.location.replace(this.buildUrl(to))
    }
    buildUrl = (targetLocation) => {
      const locationArr = window.location.href.split('/')
      const nexLocation = () => {
        locationArr[locationArr.length - 1] = targetLocation
        return locationArr.join('/')
      }
      return nexLocation()
    }
    currentPlace = () => {
      const locationArr = window.location.href.split('/')
      return locationArr[locationArr.length - 1]
    }
}
