const quickSort = (arr) => {
  if (arr.length < 2) return arr;
  const baseIndex = 0
  const baseValue = arr[baseIndex];
  let leftArr = [];
  let rightArr = [];
  for (let i = 1; i<arr.length; i++) {
    if (arr[i] < baseValue) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }
  return quickSort(leftArr).concat([baseValue], quickSort(rightArr));
}

export default quickSort;