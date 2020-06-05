// Kadane's algorithm
// O(n)

const max = (arr) => {

  let maxSum = 0;
  let maxEnd = 0;

  for (let i = 0; i < arr.length; i++) {
    maxEnd = maxEnd + arr[i]
    console.log("maxSum:", maxSum)

    if (maxEnd < 0) {
      maxEnd = 0
    }
    if (maxSum < maxEnd) {
      console.log("maxEnd:", maxEnd)
      maxSum = maxEnd
    }
  }

  return maxSum;
}

const arr = [4, 6, -3, 5, -2, 1];
console.log(max(arr));