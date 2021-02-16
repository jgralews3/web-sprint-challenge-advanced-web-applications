import React from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth'

const FetchColors = () => {
    return axiosWithAuth()
      .get("http://localhost:5000/api/colors")
      .then(res => res)
      .catch(err => console.log("fetchColors error: ", err.response.data))
  }

export default FetchColors