import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import FetchColors from '../api/fetchColors'
import { axiosWithAuth } from "../utils/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  console.log(colorList)

  // const fetchColors = () => {
  //   axiosWithAuth()
  //     .get("http://localhost:5000/api/colors")
  //     .then(res => {setColorList(res.data)})
  //     .catch(err => console.log("fetchColors error: ", err.response.data))
  // }

  useEffect(() => {
    FetchColors()
    .then(res=> {setColorList(res.data)})
    .catch(err=> console.log(err));
    }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList}/>
      <Bubbles colors={colorList} />
    </>
  );
}

export default BubblePage
