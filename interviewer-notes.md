
# 1. Техническая часть.

## JavaScript

### Вопрос 1:

**Какие значения будут у `b` и `obj2`?**

```javascript
var a = 99;
var b = a;
a += 1;
// Какое значение у b?

var obj = { prop1: 99 };
var obj2 = obj;
obj.prop1 += 1;
// Какое значение у obj2?

obj.prop2 = 50;
// Какое значение у obj2?
```

### Вопрос 2:

**Какой результат выполнит `checkHeight`?**

```javascript
function checkHeight(data) {
    if (data === { height: 180 }) {
        console.log("You have a 180 height!");
    } else if (data == { height: 180 }) {
        console.log("You are still have a 180 height!");
    } else {
        console.log(`Hmm.. You don't have a height I guess`);
    }
}

checkHeight({ height: 180 });
```

### Вопрос 3:

**Что произойдёт после клика на текст "Click me"?**

```html
<div onclick="console.log('div')">
    <p onclick="console.log('p')">
        Click me
    </p>
</div>
```

### Вопрос 4:

**Какие результаты выведет `console.log()`?**

#### 4.1
```javascript
for(let i = 0; i < 10; i++) { }
console.log(i);
```

#### 4.2
```javascript
test();
console.log(a)
function test(){
    console.log(a)
}
var a = 10;
```

### Вопрос 5:

**Какая из следующих строк вернёт 6?**

```javascript
function sum(x, y, z) {
    return x + y + z;
}

// A: sum([...1, 2, 3])
// B: sum([...[1, 2, 3]])
// C: sum(...[1, 2, 3])
// D: sum([1, 2, 3])
```

### Вопрос 6:

**Какие результаты выведут два `console.log()`?**

```javascript
var fullname = 'John Doe';
var obj = {
    fullname: 'Colin Ihrig',
    prop: {
        fullname: 'Aurelio De Rosa',
        getFullname: function() {
            return this.fullname;
        }
    }
};

var obj2 = {
    fullname: 'Mike Ferrari',
};

console.log(obj.prop.getFullname());
var test = obj.prop.getFullname;
console.log(test());
```

### Вопрос 7: Event Loop|Цикл событий

**Порядок выполнения кода:**

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout');
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
    })
    .then(() => {
        console.log('Promise 2');
    });

console.log('End');
```

### Вопрос 8:

**Порядок выполнения кода:**

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
    })
    .then(() => {
        console.log('Promise 2');
    });

setTimeout(() => {
    console.log('Timeout 2');
}, 0);

console.log('End');
```

### Вопрос 9:

**Асинхронные функции и цикл событий:**

```javascript
async function asyncFunction() {
    console.log('Async function start');
    await new Promise((resolve) => setTimeout(resolve, 0));
    console.log('Async function end');
}

console.log('Start');
asyncFunction();
console.log('End');
```

### Вопрос 10:

**Взаимодействие микрозадач и макрозадач:**

```javascript
console.log('Start');

setTimeout(() => {
    console.log('Timeout 1');
    Promise.resolve()
        .then(() => {
            console.log('Promise 1 inside Timeout 1');
        })
        .then(() => {
            console.log('Promise 2 inside Timeout 1');
        });
}, 0);

Promise.resolve()
    .then(() => {
        console.log('Promise 1');
    })
    .then(() => {
        console.log('Promise 2');
    });

setTimeout(() => {
    console.log('Timeout 2');
}, 0);

console.log('End');
```

---

## Практическое задание

### Исправить слабые места в коде приложения

---

# 2. AI-часть
