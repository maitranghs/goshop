
const initialState = {
  todo: 'todo'
}

export const reducer = (state=initialState, action) => {
  const { type, payload } = action
  switch(type) {
    case 'TODO':
      return { ...state, todo: payload }
    default:
      return state
  }
};