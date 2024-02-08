import { render, screen, fireEvent } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";

import MultiChoiceQ from "../../screens/questionTypes/MultiChoiceQ";

const data = require("../data.json");
const question = data[0].category[0].quiz.questions[0];
const mockFn = jest.fn();

describe("<MultiChoiceQ />", () => {
  const tree = renderer
    .create(<MultiChoiceQ question={question} handleAnswer={mockFn} />)
    .toJSON();
  it("renders with children", () => {
    expect(tree.children.length).toBeGreaterThan(0);
  });
});

describe("handleAnswer()", () => {
  it("returns true with correct button", () => {
    render(<MultiChoiceQ question={question} handleAnswer={mockFn} />);
    fireEvent.press(screen.getByText(question.options[2].text));
    fireEvent.press(screen.getByText("Submit"));
    expect(mockFn).toBeCalledWith(true);
  });
  it("returns false with incorrect button", () => {
    render(<MultiChoiceQ question={question} handleAnswer={mockFn} />);
    fireEvent.press(screen.getByText(question.options[0].text));
    fireEvent.press(screen.getByText("Submit"));
    expect(mockFn).toBeCalledWith(false);
  });
});
