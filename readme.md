## 项目概述

> 仿 vue 的双向数据绑定，主要思路是采用 代理 proxy 进行数据劫持（当然 Object.defineProperty 也可以）

### 使用方式

```js
let vm = new Mvue({
  el: "#app",
  data: {
    message: "测试数据",
    htmlData: "<p>哈哈哈</p>",
    msg: "..",
  },
});
```

> 指令系统目前只实现了 v-model 和 v-html

```html
<div v-html="htmlData">...</div>

<div>
  <input type="text" v-model="msg" value="测试数据" />
  <span>{{msg}}</span>
</div>
```

> 插值的使用跟 vue 一样（可以多层嵌套插值）

```html
<div>
  {{message}}
  <br />
  <span>{{message}}</span>
</div>
```
