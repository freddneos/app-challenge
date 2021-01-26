class Condition {
  constructor (utils) {
    this.utils = utils
    const d = document
    this.condList = d.getElementById('conditionsList')
    this.items = d.getElementById('lisToChange')
    this.nextButtonOnCon = d.getElementById('nextAncor')
    this.conditionId = d.getElementById('conditionId')
    this.conditionValue = d.getElementById('conditionValue')
    this.condList.addEventListener('click', this.listClicked)
    this.getConditions()
  }

  listClicked = (evt) => {
    this.conditionId.value = evt.target.id
    this.conditionValue.innerText = evt.target.innerText
    this.enableNextButton()
  }

  enableNextButton = () => {
    this.nextButtonOnCon.disabled = false
  }

  getConditions = async () => {
    let data = await this.remoteGetConditions()
    let dataToAppend = ''
    data.map((cond) => {
      dataToAppend += `<a class="list-group-item list-group-item-action" id="${cond._id}" data-toggle="list"> ${cond.description}<span class='float-right'>${cond.code}</span></a> \n`
    })
    this.condList.innerHTML = dataToAppend
    return true
  }
  remoteGetConditions = async () => {
    const result = await fetch(this.utils.api.conditions, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (result.status !== 200) {
      console.log('Error on api')
      return false
    }
    let jsonResponse = await result.json()
    return jsonResponse
  }
}
