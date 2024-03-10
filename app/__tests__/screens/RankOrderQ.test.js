import { render, screen, fireEvent } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";

import RankOrderQ from "../../screens/questionTypes/RankOrderQ";

const data = require("../data.json");
const question = data[0].category[0].quiz.questions[2];
const mockFnTrue = jest.fn();

describe("<RankOrderQ />", () => {
  const tree = renderer
    .create(<RankOrderQ question={question} handleAnswer={mockFnTrue} />)
    .toJSON();
  it("renders with children", () => {
    expect(tree.children.length).toBeGreaterThan(0);
  });
});

describe("handleAnswer()", () => {
  it("Returns true with correct order", () => {
    render(<RankOrderQ question={question} handleAnswer={mockFnTrue} />);
    question.answers.forEach((q) => {
      fireEvent.press(screen.getByText(q.answer));
    });
    fireEvent.press(screen.getByText("Submit"));
    expect(mockFnTrue).toHaveBeenCalledWith(true);
  });
});
