import { render, screen, fireEvent } from "@testing-library/react-native";
import React from "react";
import renderer from "react-test-renderer";

import RankOrderQ from "../../screens/questionTypes/RankOrderQ";

const data = require("../data.json");
const question =
  data.data[0].attributes.category[0].quiz.data.attributes.questions[2];
const mockFn = jest.fn();

describe("<RankOrderQ />", () => {
  const tree = renderer
    .create(<RankOrderQ question={question} handleAnswer={mockFn} />)
    .toJSON();
  it("renders with children", () => {
    expect(tree.children.length).toBeGreaterThan(0);
  });
});

describe("handleAnswer()", () => {
  it("is called on click submit", () => {
    render(<RankOrderQ question={question} handleAnswer={mockFn} />);
    fireEvent.press(screen.getByText("Submit"));
    expect(mockFn).toHaveBeenCalled();
  });
});
