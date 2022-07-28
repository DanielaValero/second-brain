import maxChar from '../src/maxChar';

describe("Max Character", () => {
  it("Should return max character", () => {
   expect(maxChar("Hello World!")).toBe( "l");
  });
 });