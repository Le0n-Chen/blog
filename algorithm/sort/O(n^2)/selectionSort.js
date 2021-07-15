const selectionSort = (arr) => {
  let minValueIndex;
  let loopLength = arr.length;
  let result = [];
  for(let i=0; i<loopLength; i++) {
    let minValue;
    for(let j=0; j<arr.length; j++) {
      if(minValue === undefined || arr[j] < minValue) {
        minValue = arr[j];
        minValueIndex = j;
      }
    }
    result.push(minValue);
    arr.splice(minValueIndex, 1);
  }
  return result;
}

export default selectionSort;