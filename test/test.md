# 模态框 - Modal

模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。

* **title**：模态框的标题。
* **subTitle**：模态框的副标题。
* **visible**：控制模态框的显隐，`true`或者`false`。

```html
<div>xxx</div>

<script>
  export default {
    data() {
      return {
        modalVisible: false
      }
    },
    methods: {
      shutModal () {
        this.modalVisible = false;
      }
    }
  }
</script>
```

## 第二段

模态框（Modal）是覆盖在父窗体上的子窗体。通常，目的是显示来自一个单独的源的内容，可以在不离开父窗体的情况下有一些互动。子窗体可提供信息、交互等。

* **title**：模态框的标题。
* **subTitle**：模态框的副标题。
* **visible**：控制模态框的显隐，`true`或者`false`。

```html
<div>12222222222</div>

<script>
  export default {
    data() {
      return {
        modalVisible: false
      }
    },
    methods: {
      shutModal () {
        this.modalVisible = false;
      }
    }
  }
</script>
```