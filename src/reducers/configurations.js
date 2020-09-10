
function statusMissions(state = {}, action) {
  switch (action.type) {
    case 'GET_STATUS_MISSIONS':
      return formatListConfigurations({ ...action.data })
    default:
      return state
  }
}
function typeMissions(state = {}, action) {
  switch (action.type) {
    case 'GET_TYPE_MISSIONS':
      return formatListConfigurations({ ...action.data })
    default:
      return state
  }
}
function formatListConfigurations(data){
  let arr = []
  for (let property in data) {
    if (data.hasOwnProperty(property)) {
      arr.push({
        id: property,
        name: data[property].name
      })
    }
  }
  return arr
}

export { statusMissions, typeMissions }