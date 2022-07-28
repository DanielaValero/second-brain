// A palindrome is a word or phrase that reads the same backward as forward. Write a function that checks for this.

import reverseString from './reverseString';

export default function isPalindrome(sentence: string): Boolean {
  let reversed = reverseString(sentence);
  
  return reversed === sentence;
}



