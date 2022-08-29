# Frontend TypeScript Framework

A simple framework for building frontend web applications in TypeScript.

## Including The Framework

The code is treated slightly different than other projects due to how TypeScript is compiled.

### Including In HTML

The framework has to be included in the project as a module whilst being compiled with source maps. The script has to be designed to initialize itself since the HTML document can't access the module structure. For example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Some page</title>
  <script defer type="module" src="dist/index.js"></script>
</head>
<body>
  <p>Hello World!</p>
</body>
</html>
```

### Importing In TypeScript

The TypeScript imports have to include `.js` at the end of the path to make it compatible with the module system of browsers. For example:

```ts
import { HTMLElement } from "./elements/HTMLElement.js";
```

## Features

This environment comes with a large `HTMLElement` file. Most methods in here are simplified alternatives of the native `HTMLElement` methods but with better types. However, this class also comes with a few modifications. These are:

* head
* body
* create
* createChild
* getAncestorById
* getAncestorByTag
* getAncestorByClass

### Head & Body

The `head` and `body` properties are shortcuts to the `document.head` and `document.body` and are statically included in the `HTMLElement` class as instances of it.

```typescript
const head = HTMLElement.head;
const body = HTMLElement.body;

console.log(head instanceof HTMLElement); // true
console.log(body instanceof HTMLElement); // true
```

### Create & CreateChild

These methods are similar to the `createElement` method. The difference is that they can be created with a list of initial properties. In the case of createChild, the element is appended to the instance of `HTMLElement`.

Example usages:

```ts
const div = HTMLElement.create("div", {
  id: "my-div",
  className: "my-div with classes",
  innerHTML: "<p>Hello World</p>"
});

div.createChild("p", {
  innerText: "Second paragraph"
});
```

### GetAncestorById & GetAncestorByTag & GetAncestorByClass

These methods are used to find an ancestor element with a certain id, tag or class in the tree structure of the HTML body.

Example usages:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Some page</title>
  <script defer type="module" src="dist/index.js"></script>
</head>
<body>
  <div id="my-div">
    <div class="some-div">
      <span>
        <p id="my-leaf">Hello World</p>
      </span>
    </div>
  </div>
</body>
</html>
```

```ts
const leaf = HTMLElement.getById("my-leaf");
const span = leaf.getAncestorByTag("span");
const someDiv = leaf.getAncestorByClass("some-div");
const myDiv = leaf.getAncestorById("my-div");
```
