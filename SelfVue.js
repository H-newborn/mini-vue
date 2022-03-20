// import observe from './observe'
// import Watcher from './Watcher';

// class SelfVue {
//   constructor(data, el, exp) {
//     // debugger
//     this.data = data;

//     Object.keys(data).forEach(key => {
//       console.log(this);
//       this.proxyKeys(key)
//     })
//     observe(data);

//     el.innerHTML = this.data[exp];

//     new Watcher(this, exp, function (value) {
//       el.innerHTML = value;
//     });
//     return this;
//   }

//   proxyKeys(key) {
//     let self = this
//     Object.defineProperty(this, key, {
//       get() {
//         return self.data[key]
//       },
//       set(newVal) {
//         self.data[key] = newVal
//       }
//     })
//   }
// }

class SelfVue {
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
