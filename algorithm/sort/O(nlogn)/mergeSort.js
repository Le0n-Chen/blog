const mergeSort = (arr) => {
  const midIndex = Math.floor(arr.length/2);
  let leftArr = arr.slice(0, midIndex);
  let rightArr = arr.slice(midIndex);
  if (leftArr.length < 2) {
    if(rightArr.length === 2) {
      rightArr = rightArr[0] > rightArr[1] ? [rightArr[1], rightArr[0]] : rightArr;
    }
    return mergeArr(leftArr, rightArr);
  } else {
    return mergeArr(mergeSort(leftArr), mergeSort(rightArr));
  }
}

const mergeArr = (arr1, arr2) => {
  let i = 0;
  let j = 0;
  let result = [];
  while(true) {
    if (i === arr1.length && j <arr2.length) {
      result.push(arr2[j]);
      j++;
      continue;
    } else if (i <arr1.length && j===arr2.length) {
      result.push(arr1[i]);
      i++;
      continue;
    } else if (i === arr1.length && j === arr2.length) {
      return result;
    }

    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++
    }
  }
}
export default mergeSort;