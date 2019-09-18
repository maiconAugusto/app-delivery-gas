import React from 'react';
import Router from './router'
import axios from 'axios'

axios.defaults.baseURL = "https://app-delivery-gas-9d18d.firebaseio.com/"

const App = () => {
  return (
    <Router/>
  );
};
export default App;
