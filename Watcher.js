// import Dep from "./dep"

// import { pushTarget, popTarget } from './Dep'

class Watcher {
  constructor(vm, exp, cb) {
    console.log('Watcher 创建了');
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get()
    console.log(this.value);
  }
  update() {
    this.run()
  }
  run() {
    let value = this.vm.data[this.exp];
    let oldVal = this.value;
    if(value !== oldVal) {
      this.value = value;
      this.cb.call(this.vm,value,oldVal);
    }
  }
  get() {
    // Dep.target = this
    pushTarget(this)
    let value = this.vm.data[this.exp]
    // Dep.target = null
    popTarget()
    return value
  }
}
