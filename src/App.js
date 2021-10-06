import React, { useEffect, useReducer } from 'react'
// import { tableData } from './data';
import Home from './Pages/Home/Home';
import { TableProvider, tableReducer } from './reducer';
import { FETCH_TABLE_DATA } from './Utils/types';
import axios from "axios";

function App() {
  const [store, dispatch] = useReducer(tableReducer, []);
  const baseURL = "https://mocki.io/v1/d6739a31-6de3-4123-aa4b-3d6a28f4aba8";
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
