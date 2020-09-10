export const add = () => {
  return {
    type: 'INCREMENT'
  }
}
export const remove = () => {
  return {
    type: 'DECREMENT'
  }
}
export const showModal = (_modalType, _modalProps) => {
  return {
    type: 'SHOW_MODAL',
    modalType: _modalType,
    modalProps: _modalProps
  }
}
export const hideModal = (_modalType) => {
  return {
    type: 'HIDE_MODAL',
    modalType: _modalType
  }
}

export const setData = (_data, _type) => {
  return {
    type: _type,
    data: _data
  }
}