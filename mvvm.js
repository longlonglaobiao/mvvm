import Compile from "./src/compile.js";

export default class Mvue extends EventTarget {
  constructor(options) {
    super();
    this.$options = options;
    this.$options.data = this.proxy(this.$options.data);
    this.elNode = document.querySelector(this.$options.el);
    this.compile = new Compile(this.elNode, this.$options.data);
  }
  proxy(obj) {
    return new Proxy(obj, {
      get(target, key) {
        console.log("getting........");
        return target[key];
      },
      set(target, key, value) {
        target[key] = value;
        console.log("setting.........");
        let event = new CustomEvent(key);
        document.dispatchEvent(event);
        return true;
      },
    });
  }
}
