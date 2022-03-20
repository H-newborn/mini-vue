class Compile {
  constructor(el, vm) {
    this.vm = vm
    this.el = document.querySelector(el)
    this.fragment = null
    this.init()
  }

  init() {
    if (this.el) {
      this.fragment = this.nodeToFragment(this.el);
      // 编译
      this.compileElement(this.fragment);
      this.el.appendChild(this.fragment);
    } else {
      // console.log('Dom元素不存在');
      throw new Error('Dom元素不存在')
    }
  }

  nodeToFragment(el) {
    let fragment = document.createDocumentFragment();
    let child = el.firstChild;
    while (child) {
      // 将Dom元素移入fragment中
      fragment.appendChild(child);
      child = el.firstChild
    }
    return fragment;
  }

  compileElement(el) {
    let childNodes = el.childNodes;
    let reg = /\{\{(.*)\}\}/;

    for (let i = 0; i < childNodes.length; i++) {
      let node = childNodes[i]
      let text = node.textContent;
      console.log(node.nodeType)
      if (this.isElementNode(node)) {
        this.compile(node) 
      } else if (this.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
        this.compileText(node, reg.exec(text)[1]);
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node);  // 继续递归遍历子节点
      }
    }
  }

  compile(node) {
    let nodeAttrs = node.attributes;
    // console.log(nodeAttrs, 'nodeAttr');
    for (let i = 0; i < nodeAttrs.length; i++) {
      let attr = nodeAttrs[i]
      // console.log(attr, 'attr');
      let attrName = attr.name;
        if (this.isDirective(attrName)) {
            let exp = attr.value;
          let dir = attrName.substring(2);
          console.log(dir);
            if (this.isEventDirective(dir)) {  // 事件指令
                this.compileEvent(node, exp, dir);
            } else {  // v-model 指令
                this.compileModel(node, this.vm, exp, dir);
            }
            node.removeAttribute(attrName);
        }

    }
  }

  compileText(node, exp) {
    let self = this;
    let initText = this.vm[exp];
    this.updateText(node, initText);  // 将初始化的数据初始化到视图中
    new Watcher(this.vm, exp, function (value) { // 生成订阅器并绑定更新函数
      self.updateText(node, value);
    });
  }

  compileEvent(node, exp, dir) {
    let eventType = dir.split(':')[1];
    console.log(eventType, 'eventType');
    let cb = this.vm.methods && this.vm.methods[exp];
    if (eventType && cb) {
        node.addEventListener(eventType, cb.bind(this.vm), false);
    }
  }

  compileModel(node, vm, exp, dir) {
    let self = this;
    let val = this.vm[exp];
    this.modelUpdater(node, val);
    new Watcher(this.vm, exp, function (value) {
        self.modelUpdater(node, value);
    });

    node.addEventListener('input', function(e) {
        let newValue = e.target.value;
        if (val === newValue) {
            return;
        }
        self.vm[exp] = newValue;
        val = newValue;
    });
  }
  updateText(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  }
  modelUpdater(node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
  isTextNode(node) {
    return node.nodeType == 3;
  }
  isDirective(attr) {
    return attr.indexOf('v-') == 0;
  }
  isElementNode(node) {
    return node.nodeType == 1;
  }
  isEventDirective(dir) {
    return dir.indexOf('on:') === 0;
  }
}
