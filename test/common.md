## Markdown简介

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— [维基百科](https://zh.wikipedia.org/wiki/Markdown)

<br>

<a href="/">link markup test</a>

[markdown link](./component/)

### 笔记标题
**马克飞象**会自动使用文档内出现的第一个标题作为笔记标题。例如本文，就是第一行的 `欢迎使用马克飞象`。

### 快捷编辑
保存在印象笔记中的笔记，右上角会有一个红色的编辑按钮，点击后会回到**马克飞象**中打开并编辑该笔记。
>**注意：**目前用户在印象笔记中单方面做的任何修改，马克飞象是无法自动感知和更新的。所以请务必回到马克飞象编辑。

### 数据同步
**马克飞象**通过**将Markdown原文以隐藏内容保存在笔记中**的精妙设计，实现了对Markdown的存储和再次编辑。既解决了其他产品只是单向导出HTML的单薄，又规避了服务端存储Markdown带来的隐私安全问题。这样，服务端仅作为对印象笔记 API调用和数据转换之用。

>**隐私声明：用户所有的笔记数据，均保存在印象笔记中。马克飞象不存储用户的任何笔记数据。**

### 表格
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |


### Demo

```html
<style>
.wrapper {
  backgroun: red
}
</style>

<template>
  <div class="wrapper">
    <button @click="incr(-1)">decrease</button>
    <input type="text" readonly :value="count">
    <button @click="incr(+1)">increase</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    incr(delta) {
      this.count += delta
    }
  }
}
</script>
```

### Demo 2

```javascript
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    incr(delta) {
      this.count += delta
    }
  }
}
```

```html
<c-button>默认按钮</c-button>
<c-button primary>主操作按钮</c-button>
<c-button disabled>禁用按钮</c-button>
```