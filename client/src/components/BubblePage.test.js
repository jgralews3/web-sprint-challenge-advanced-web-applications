import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";
// import {FetchColors as mockFetchColors} from '../api/fetchColors'
import {axiosWithAuth} from '../utils/axiosWithAuth'

const FetchColorsTest = () => {
  return axiosWithAuth()
    .get("http://localhost:5000/api/colors")
    .then(res => setColorList(res.data))
    .catch(err=> console.log(err))
};

const mockFetchColors = FetchColorsTest()
jest.mock(mockFetchColors)

const data = {
  data: {
    code: {hex: "#f0f8ff"},
    color: "aliceblue",
    id: 1
  }
}

test("Fetches data and renders the bubbles", async () => {
  mockFetchColors.mockResolvedValueOnce(data);
    // const {getByText} = render(<BubblePage />)
    // expect(getByText(/colors/i)).toBeInTheDOM;
});
