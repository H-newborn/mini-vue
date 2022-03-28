import Compile from './compiler.js'
import { observe } from './observe.js'

export default class SelfVue {
  constructor(options) {
    this.vm = this
    
    this.data = options.data
    this.methods = options.methods

    Object.keys(this.data).forEach(key => {
      this.proxyKeys(key)
    })

    observe(options.data);

    new Compile(options.el, this.vm)

    return this;
  }

  proxyKeys(key) {
    let self = this
    Object.defineProperty(this, key, {
      get() {
        return self.data[key]
      },
      set(newVal) {
        self.data[key] = newVal
      }
    })
  }
}
