export default function reverseString(originalString: string): string {
  const arr: Array<string> = originalString.split('')
  const reversed = arr.reverse();
  const reversedString = reversed.join("");
  return reversedString;
}