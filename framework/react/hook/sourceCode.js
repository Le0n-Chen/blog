const MyReact = (function() {
  let currentHookDepList = [];
  let currentHookDepListIndex = 0;
  return {
    render: (component) => {
      const result = component();
      console.log(result.render())
      currentHookDepListIndex = 0;
      return result;
    },
    useState: (initValue) => {
      currentHookDepList[currentHookDepListIndex] = currentHookDepList[currentHookDepListIndex] || initValue;
      currentHookDepListIndex ++;
      function setValue(value) {
        currentHookDepList[currentHookDepListIndex] = value;
      }
      return [currentHookDepList[currentHookDepListIndex - 1], setValue];
    },
    useEffect: (fun, depArray) => {
      const isDepArrayEmpty = !depArray;
      const isDepArrayNoChanged = currentHookDepList[currentHookDepListIndex] && currentHookDepList[currentHookDepListIndex].every((item, index) => {
        return item === depArray[index];
      })
      if (!isDepArrayEmpty && !isDepArrayNoChanged) {
        fun && fun();
        currentHookDepList[currentHookDepListIndex] = depArray;
      }
      currentHookDepListIndex ++;
    }
  }
})();


const MyComponent = () => {
  const [count, setCount] = MyReact.useState(0);
  MyReact.useEffect(() => {
    console.log('trigger')
  }, [count])
  return {
    click: () => setCount(10),
    render: () => console.log(count)
  };
}

MyReact.render(MyComponent); // trigger 0
MyComponent().click();
MyReact.render(MyComponent); // trigger 10
MyComponent().click();
MyReact.render(MyComponent); // 10
MyComponent().click();
MyReact.render(MyComponent); // 10
