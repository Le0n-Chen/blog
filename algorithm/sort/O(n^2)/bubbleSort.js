const bubbleSort = (arr) => {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j+1]) {
        /* Also we can use this to swap value
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        */
        arr[j] = arr[j] ^ arr[j+1];
        arr[j+1] = arr[j] ^ arr[j+1];
        arr[j] = arr[j] ^ arr[j+1];
      }
    }
  }
  return arr;
}

export default bubbleSort;