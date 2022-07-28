import reverseInteger from "../src/reverseInteger";


describe("Integer Reversal", () => {
  it("Should reverse integer", () => {
  expect(reverseInteger(1234)).toBe(4321);
  expect(reverseInteger(-1200)).toBe(-21);
  });
 });