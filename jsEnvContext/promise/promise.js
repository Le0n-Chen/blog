const MyPromise = function(fn) {
  let callback = [];
  let _value;
  let status = 'pending';
  const _resolve = function(value) {
    _value = value;
    setTimeout(function () {
      callback.forEach(function(callback) {
        callback(_value);
      }) 
    }, 0)
    status = 'resolved';
  }
  
  this.then = function(fn) {
    if (status === 'resolved') {
      fn && fn(_value);
      return this;
    } else {
      callback.push(fn);
      return this;
    }
  }

  fn && fn(_resolve);
}

// export default MyPromise;
// 当前版本：要么两个then同时注册 settimeout同步执行， 要么轮着then执行
// Promise A+版本： 先注册第一个， 然后执行第一个then的同步代码，链式调用的第二个then要等第一个then的同步代码执行完毕才能被注册
new MyPromise((resolve, reject) => {
  console.log("外部promise");
  setTimeout(() => {
    resolve();
  },100)
})
.then(() => {
  console.log("外部第一个then");
  new MyPromise((resolve, reject) => {
    console.log("内部promise")
    resolve();
    
  })
    .then(() => {
      console.log("内部第一个then");
    })
    .then(() => {
      console.log("内部第二个then");
    });
})
.then(() => {
  console.log("外部第二个then");
});
