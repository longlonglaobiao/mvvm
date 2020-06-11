export default class Compile {
  constructor(el, data) {
    this.data = data;
    this.complie1(el);
  }

  // 编译一下 el 下的各个元素
  complie1(el) {
    let that = this;
    let childNodes = el.childNodes;
    childNodes.forEach((item) => {
      if (item.nodeType === 1) {
        // 标签
        let attrs = item.attributes;
        [...attrs].forEach((attr) => {
          //console.log(attr.name);
          if (attr.name == "v-html") {
            item.innerHTML = that.data[attr.value];
            document.addEventListener(attr.value, function () {
              item.innerHTML = that.data[attr.value];
            });
          } else if (attr.name == "v-model") {
            that.data[attr.value] = item.value;
            item.addEventListener("input", (e) => {
              that.data[attr.value] = item.value;
            });
          }
        });
        this.complie1(item);
      } else if (item.nodeType === 3) {
        // 文本
        let key = this.reg(item.textContent);

        if (!!key) {
          that.textReplace(item, key);
          document.addEventListener(key, function () {
            that.textReplace(item, key);
          });
        }
      }
    });
  }

  // 正则匹配
  reg(str) {
    let _reg = /\{\{\s*(\S+)\s*\}\}/g;
    if (_reg.test(str)) {
      return RegExp.$1;
    }
  }

  // 文本替换
  textReplace(item, key) {
    item.textContent = this.data[key];
  }
}
