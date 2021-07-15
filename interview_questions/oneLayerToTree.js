// 扁平数据
const input = [{
  name: '文本1',
  parent: null,
  id: 1,
}, {
  name: '文本2',
  id: 2,
  parent: 1
}, {
  name: '文本3',
  parent: 2,
  id: 3,
}, {
  name: '文本4',
  id: 4,
  parent: null
}]

// 树状数据
// [{
//   name: '文本1',
//   id: 1,
//   children: [{
//     name: '文本2',
//     id: 2,
//     children: [{
//       name: '文本3',
//       id: 3
//     }]
//   }]
// }]


// Answer

const result = [];
const childMap = {};
const inputMap = {};


input.forEach((item) => {
  if(item.parent !== 0 && !item.parent) {
    result.push(item);
  } else {
    childMap[item.parent] = childMap[item.parent] || [];
    childMap[item.parent].push(item.id);
  }
  inputMap[item.id] = item;
})

const handle = (item) => {
  delete item.parent;
  if (childMap[item.id] && childMap[item.id].length > 0) {
    item.children = childMap[item.id].map((id) => {
      return handle(inputMap[id]);
    })
  } 
  return item;
}

result.map((item) => {
  return handle(item);
})

console.dir(result,  {depth:null})
