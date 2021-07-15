import MyPromise from '../promise';


new MyPromise((resolve) => {
  setTimeout(() => {
    console.log('1111')
  }, 1000)
  resolve();
}).then(() => {
  console.log('2222')
})

/*
  1111
  2222
*/
