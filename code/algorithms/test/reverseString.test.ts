import reverseString from "../src/reverseString"


  test("Should reverse string", () => {
   expect(reverseString("Hello World!")).toBe("!dlroW olleH");
  });
