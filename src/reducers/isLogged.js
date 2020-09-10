const isLogged = (logged = false, action) => {
  switch(action.type){
    case 'SIGN_IN':
      return !logged
    default:
      return logged
  }
}
export default isLogged