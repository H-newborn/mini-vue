import { pushTarget, popTarget } from './Dep.js';

export default class Watcher {
  constructor(vm, exp, cb) {
    console.log('Watcher 创建了');
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
    console.log(this.value);
  }

  update() {
    this.run();
  }

  run() {
    const value = this.vm.data[this.exp];
    const oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm, value, oldVal);
    }
  }

  get() {
    // Dep.target = this
    pushTarget(this);
    const value = this.vm.data[this.exp];
    // Dep.target = null
    popTarget();
    return value;
  }
}
