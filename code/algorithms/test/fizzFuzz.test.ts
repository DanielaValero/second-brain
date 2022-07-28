import fizzBuzz from '../src/fizzBuzz'

let output;
describe("Fizz Buzz", () => {
  beforeEach(() => (output = fizzBuzz(30)));

  
  it("Should output number", () => {
    expect(output[0]).toBe(1);
  });
  it("Should output Fizz", () => {
    expect(output[1]).toBe("Fizz");
  });
  it("Should output Buzz", () => {
    expect(output[2]).toBe("Buzz");
  });
  it("Should output Fizz Buzz", () => {
    expect(output[5]).toBe("Fizz Buzz");
  });
});