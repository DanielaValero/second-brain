import isPalindrome from '../src/isPalindrome';

describe("Palindrome", () => {
  it("Should return true", () => {
    expect(isPalindrome("Cigar? Toss it in a can. It is so tragic")).toBe(false)
  }); 
  
  it("Should return false", () => {
   expect(isPalindrome("sit ad est love")).toBe(false)
  });
 });