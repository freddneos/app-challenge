class Case {
  constructor (utils) {
    this.utils = utils
    const d = document
    this.nextButton = d.getElementById('nextCase')
    this.nextButton.addEventListener('click', this.postReview)
    this.case = d.getElementById('TextCase')
    this.caseId = d.getElementById('caseId')
    this.conditionId = d.getElementById('conditionId')
    this.doneModal = d.getElementById('hiddenDoneModal')

    if (this.islogged()) {
      this.getCase()
    }
  }
  islogged = () => {
    let data = this.utils.repository('get', '')
    data = JSON.parse(data)
    if (!data.token) {
      this.utils.navigate(this.utils.loginPage)
      return false
    }
    return true
  }

  getCase = async () => {
    const fetchResult = await this.remoteGetCase()
    if (fetchResult.message) {
      this.doneModal.click()
    }
    this.case.value = fetchResult.data.description
    this.caseId.value = fetchResult.data.id

    return true
  }

  remoteGetCase = async () => {
    let token = this.utils.getUserData('token')
    token = JSON.stringify({
      token
    })
    const result = await fetch(this.utils.api.case, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: token
    })
    if (result.status !== 200) {
      return false
    }
    let jsonResponse = await result.json()
    return jsonResponse
  }

  postReview = async () => {
    if (await this.remotePostReview()) {
      window.location.reload()
    }
  }

  remotePostReview = async () => {
    let token = this.utils.getUserData('token')

    const data = JSON.stringify({
      token,
      conditionId: this.conditionId.value
    })
    const result = await fetch(this.utils.api.review + this.caseId.value, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    if (result.status !== 200) {
      console.log('Error on api')
      return false
    }
    let jsonResponse = await result.json()
    return jsonResponse
  }
}
