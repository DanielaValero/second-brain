// Given an integer, reverse the order of the digits.
import reverseString from './reverseString';

export default function reverseInteger(num: number): number {
  const parsedToString = num.toString();
  const reversedNumber = reverseString(parsedToString);
  let sign = 1;
  if (Math.sign(num) < 0) {
    sign = -1;
  }
  return Number.parseInt(reversedNumber) * sign;
}