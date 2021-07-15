import allSortsAlgorithm from '../index';
import testData from '../__test__/sourceData';

Object.keys(allSortsAlgorithm).map((key) => {
  const testDataCopy = JSON.parse(JSON.stringify(testData))// avoid splice function that will change origin array
  const result = testDataCopy.map((testDataItem) => {
    return allSortsAlgorithm[key](testDataItem.input).reduce((result, item, index) => {
      if(item !== testDataItem.output[index]) {
        return false;
      }
      return result;
    }, true)
  })
  console.log(`${key}: ${result}`);
  return result;
})