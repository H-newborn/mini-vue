import { Dep } from './Dep.js';

// 数组方法改写
const oldProto = Array.prototype;
const arrProto = Object.create(oldProto);
['push', 'pop'].forEach((methodName) => {
  arrProto[methodName] = function () {
    console.log('shitugengxin');
    oldProto[methodName].call(this, ...arguments);
  };
});

// 监听属性
export function observe(target) {
  if (typeof target !== 'object' || target == null) {
    return target;
  }

  if (Array.isArray(target)) {
    target.__proto__ = arrProto;
  }

  for (const key in target) {
    defineReactive(target, key, target[key]);
  }
}

// 定义响应式
function defineReactive(target, key, value) {
  // 深度监听
  observe(value);
  const dep = new Dep();

  Object.defineProperty(target, key, {
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return value;
    },
    set(newVal) {
      if (value === newVal) {
        return;
      }
      value = newVal;
      console.log('已经被监听了');
      dep.notify();
    },
  });
}

// <-- -------------- -->
// const data = {
//   // val1: 'aaa',
//   // val2: 'bbb',
//   obj: {
//     val: '123'
//   },
//   // arr: [1,2,3]
// }

// observe(data)

// 测试
// data.val1
// data.val2 = '235'

// data.obj.val = '345'

// data.arr.push('4')
