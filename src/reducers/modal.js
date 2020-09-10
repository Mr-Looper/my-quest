const initialState = {
  modalType: null,
  modalProps: {}
}

function modal(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
        action: 'SHOW'
      }
    case 'HIDE_MODAL':
      return {
        modalType: action.modalType,
        modalProps: {},
        action: 'HIDE'
      }
    default:
      return state
  }
}

export default modal