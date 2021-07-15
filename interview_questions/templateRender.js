const template = '嗨，{{ info.name.value }}您好，今天是星期{{ day.value }}, 也是星期 {{ info.name.value}}';

const data = {
  info: {
    name: {
      value: '张三'
    }
  },
  day: {
    value: '三'
  }
};



const render = (template, data) => {
  const reg = /\{\{(.*?)\}\}/;
  let result = [];
  let string = template;
  while((result = reg.exec(string)) !== null) {
    const paramsArray = result[1].trim().split('.');
    const subData = paramsArray.reduce((atom, key) => {
      if(atom) {
        return atom[key];
      }
      return atom;
    }, data)
    string = string.replace(reg, subData);
  }
  
  console.log(string)
}

render(template, data); // 嗨，张三您好，今天是星期三