---
pageClass: my-custom-class
---

# Test

## 1

```html
@demo
<button>Test Button</button>
<style>
  button {
    color: red;
  }
</style>
```

## 2

```html
@demo
<script>
  export default {
    render(h) {
      // JSX not yet supported
      return h('div', null, 222)
    }
  }
</script>
<style>
  button {
    color: red;
  }
</style>
```

## 3

```
<button>Test Button</button>
<style>
  button {
    color: red;
  }
</style>
```
