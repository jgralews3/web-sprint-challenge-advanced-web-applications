import React from "react";
import { render, wait } from "@testing-library/react";
import BubblePage from "./BubblePage";

const token = "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

test("Fetches data and renders the bubbles", async () => {
  const {getByText} = render(<BubblePage />);
  await wait(() => {
    const bubbles = getByText(/bubbles/i);
    expect(bubbles.textContent).toBe("bubbles");
  });
});