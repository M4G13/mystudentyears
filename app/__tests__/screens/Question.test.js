import { calculateScore } from "../../screens/Question";

describe("calculateScore()", () => {
  const answers = [false, true, false, false];
  const totalQuestions = answers.length;
  const { score, correctAmount } = calculateScore(answers, totalQuestions);
  it("returns correct % score", () => {
    expect(score).toBe(25);
  });
  it("returns correct point score", () => {
    expect(correctAmount).toBe(1);
  });
});
