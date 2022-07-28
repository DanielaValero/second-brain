import minMaxSum from "../src/minMaxSum";


describe("npm", () => {
  it("Should find the min and max sum of the intems in an array", () => {
  const input = [1, 2, 3, 4, 5]
  expect(minMaxSum(input)).toBe("10 14");
  });

  it("Should find the min and max sum of the intems in an array even if they are all the same number", () => {
    const input = [5, 5, 5, 5, 5]
    expect(minMaxSum(input)).toBe("20 20");
    });

  
 });