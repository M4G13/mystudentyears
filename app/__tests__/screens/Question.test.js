import { getScore, getNumCorrect } from "../../common.js";

describe("calculateScore()", () => {
  const answers = [false, true, false, false];
  const score = getScore(answers);
  const correctAmount = getNumCorrect(answers);
  it("returns correct % score", () => {
    expect(score).toBe(25);
  });
  it("returns correct point score", () => {
    expect(correctAmount).toBe(1);
  });
});
