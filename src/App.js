import React, { useEffect, useReducer } from 'react'
// import { tableData } from './data';
import Home from './Pages/Home/Home';
import { TableProvider, tableReducer } from './reducer';
import { FETCH_TABLE_DATA } from './Utils/types';
import axios from "axios";

function App() {
  const [store, dispatch] = useReducer(tableReducer, []);
  const baseURL = "https://mocki.io/v1/fd3cb8c5-b477-44fb-9de4-d00b8ab133e6";
  useEffect(() => {
    axios.get(baseURL).then((response) => {
    dispatch({ type: FETCH_TABLE_DATA, data: response.data });
    console.log(response.data);
    });
  }, [])
  return (
    <TableProvider value={{ store, dispatch }}>
      <div className="page">
        <Home />
      </div>
    </TableProvider>
  );
}

export default App;
