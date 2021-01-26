class Auth {
  constructor (utils) {
    this.utils = utils
    const d = document

    if (this.utils.currentPlace().startsWith(this.utils.casePage)) {
      this.userName = d.getElementById('userName').textContent = this.utils.getUserData('user')
      this.logoutBtn = d.getElementById('sessionLogout')
      this.logoutBtn.addEventListener('click', this.logout)
    }

    if (this.utils.currentPlace().startsWith(this.utils.loginPage)) {
      this.form = d.getElementById('loginForm')
      this.form.addEventListener('submit', this.submitForm)
    }

    if (!this.utils.currentPlace().startsWith(this.utils.loginPage) && !this.utils.currentPlace().startsWith(this.utils.casePage)) {
      return this.utils.navigate(this.utils.loginPage)
    }
  }

  submitForm = (evt) => {
    evt.preventDefault()
    const htmlCollection = Array.from(evt.target.children)
    const emailValue = htmlCollection.find((htmlNode) => (htmlNode.id === 'inputEmail')).value
    const passwordValue = htmlCollection.find((htmlNode) => (htmlNode.id === 'inputPassword')).value
    const login = {
      email: emailValue,
      password: passwordValue
    }
    this.remoteLogin(login)
  }

  remoteLogin = async (login) => {
    const result = await fetch(this.utils.api.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    if (result.status !== 200) {
      alert('User or password invalid')
      return false
    }
    const jsonResponse = await result.json()

    if (!this.utils.repository('persist', JSON.stringify(jsonResponse))) {
      return false
    }
    this.utils.navigate(this.utils.casePage)
  }
  logout = () => {
    if (this.utils.repository('delete', '')) {
      return this.utils.navigate(this.utils.loginPage)
    }
  }
}
