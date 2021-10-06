import { createContext, useContext } from 'react'

const TableContext = createContext()

export const TableProvider = TableContext.Provider

export function useTable() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("alert");
  }
  return context;
};

export function tableReducer(state = [], action) {
  switch (action.type) {
    case 'FETCH_TABLE_DATA':
      return action.data
    case 'SET_ACTIVE':
      state.forEach(el => {
        if (el.id === action.id) {
          el.isOpened = action.status;
        }
      })
      return [...state];
    case 'UPDATE_TABLE_DATA':
      state.forEach(el => {
        if (el.id === action.id) {
          el.description = action.data.description
          el.account = action.data.account
          el.createdBy = action.data.createdBy
          el.createdOn = action.data.createdOn
          el.currency = action.data.currency
        }
        return el;
      })
      console.log("Updated Row --", action.data);
      return state;
    case 'DELETE_TABLE_DATA':
      const res = state.filter(el => el.id !== action.id.id);
      console.log("Deleted Row --", action.id);
      return res
    default:
      return state;
  }
}