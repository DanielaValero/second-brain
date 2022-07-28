/* 
  Given a number as an input, print out every integer from 1 to that number. 
  However, when 
  - the integer is divisible by 2, print out “Fizz”; 
  - when it’s divisible by 3, print out “Buzz”; 
  - when it’s divisible by both 2 and 3, print out “Fizz Buzz”. 
 */

export default function fizzBuzz(num: number): Array<string> {
  let arr = [];

  for (let index = 1; index <= num; index++) {

    const isMod2 = index % 2 === 0;
    const isMod3 = index % 3 === 0;

    if (isMod2 && isMod3) {
      arr.push('Fizz Buzz')
    } else if (isMod2) {
      arr.push('Fizz');
    } else if (isMod3) {
      arr.push('Buzz');
    }  else {
      arr.push(index)
    }


    
  }

  return arr;
}