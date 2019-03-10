import { SET_DEPARTMENTS } from './type'

export const setDepartments = ({ departments }) => ({
  type: SET_DEPARTMENTS,
  payload: {
    departments
  }
})