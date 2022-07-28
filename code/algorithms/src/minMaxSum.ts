function doubleLoopN2 (arr: number[]): string {
  let maxSum = 0;
  let minSum = Number.MAX_VALUE;
  
  
 for (let out = 0; out < arr.length; out++) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      if (i !== out) {
        sum += arr[i] 
      }
    }
    if (sum!== 0) {
      if (sum < minSum) {
        minSum = sum;
      } 
      
      if (sum > maxSum) {
        maxSum = sum;
      }
    }
  }
  
return `${minSum} ${maxSum}`;
}

function recursiveSum(arr: number[]): string {
  let maxSum = 0;
  let minSum = Number.MAX_VALUE;
  const innerFun = (arr: number[], s: number, index: number, current: number):number => {
    let sum = s;
    if (current !== index && !isNaN(arr[index])) {
      
      sum = s + arr[index];
      console.log('s + arr[index]', s , arr[index], sum)
    }
    const i = index + 1;
    const curr=index;
    if (i < arr.length) {
      innerFun(arr, sum, i, curr);
    } else {
      console.log('in sum', sum, s)
      return sum;
    }
  }
  
    
    const outerFn = (arr: number[], index: number)  => {
      let sum = 0;
      const s = innerFun(arr,sum,index,index);

      console.log('out sum', sum, s)

      if (sum!== 0 && !isNaN(sum)) {
          if (sum < minSum) {
            minSum = sum;
          } 
      
          if (sum > maxSum) {
            maxSum = sum;
          }

          console.log(sum, minSum, maxSum);
      }

      const i = index + 1;
      if (i < arr.length) {
        outerFn(arr, i)
      }
      

       return

  }
    
  outerFn(arr, 0)
  return `${minSum} ${maxSum}`;
}

export default function miniMaxSum(arr: number[]): string {
  // double loop, and sum everything but the number in the index of the outer array
  // store directly the min and max.
  // return doubleLoopN2(arr)
  
  // with recursion?
  //console.log(recursiveSum(arr));

  return recursiveSum(arr);
}
