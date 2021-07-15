const insertionSort = (arr) => {
  let result=[];
  for(let i=0; i<arr.length; i++) {
    if (result.length === 0) {
      result.push(arr[i]);
    } else {
      for(let j=0; j<result.length; j++) {
        if (arr[i] < result[j]) {
          result.splice(j, 0, arr[i]);
          break;
        }
        if (j === result.length - 1) {
          result.push(arr[i]);
          break;
        }
      }
    }
  }
  return result;
}
export default insertionSort;