import { render, screen, fireEvent } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";

import OpenResponseQ from "../../screens/questionTypes/OpenResponseQ";

const data = require("../data.json");
const question =
  data.data[0].attributes.category[0].quiz.data.attributes.questions[3];
const mockFn = jest.fn();

describe("<OpenResponseQ />", () => {
  const tree = renderer
    .create(<OpenResponseQ question={question} handleAnswer={mockFn} />)
    .toJSON();
  it("renders with children", () => {
    expect(tree.children.length).toBeGreaterThan(0);
  });
});

describe("handleAnswer()", () => {
  it("returns true with correct answer in text field", () => {
    render(<OpenResponseQ question={question} handleAnswer={mockFn} />);
    fireEvent.changeText(
      screen.getByPlaceholderText("Enter your answer here"),
      question.answer,
    );
    fireEvent.press(screen.getByText("Submit"));
    expect(mockFn).toBeCalledWith(true);
  });
});
