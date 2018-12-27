---
title: ES6(jspang)
date: 2018-12-25 16:16:12
tags: ES6
categories: ES6
---
>本文来自于jspang大佬，跟着大佬的博客手撸了一遍。
## let 和 const

## 解构赋值

### 数组解构

```js
let [a, b, c] = [1, 2, 3]
console.log(a) // 1
console.log(b) // 2
console.log(c) // 3
```

### 对象解构

```js
let { foo, bar } = { foo: 'hello', bar: 'world' }
console.log(foo) // hello
console.log(bar) // world
```

### 字符串解构

```js
let [a, b, c, d, e] = 'hello'
console.log(a) // h
console.log(b) // e
console.log(c) // l
console.log(d) // l
console.log(e) // o
```

## 扩展运算符和 rest 运算符

### 扩展运算符

```js
function fn(...arg) {
  console.log(arg[0])
  console.log(arg[1])
  console.log(arg[2])
  console.log(arg[3])
}
fn(1, 2, 3) //1,2,3,undefined
```

数组赋值

```js
let arr1 = ['hello', 'world']
let arr2 = [...arr1]
// arr2=arr1 不是真正的赋值，是对堆栈的引用
```

### rest 运算符

```js
function fn(first, ...arg) {
  for (let val of arg) {
    console.log(val)
  }
}
fn(1, 2, 3, 4) // 2,3,4
```

## 字符串模板

```js
let world='world'
let blog=`hello${world}
```

### 对运算的支持

```js
let a = 1
let b = 2
let result = `${a + b}` // 3
```

### 字符串查找

- 查找是否存在

```js
let text = 'world'
let blog = 'hello world'
blog.includes(text) // true
```

- 判断开头是否存在

```js
let text = 'hello'
let blog = 'hello world'
blog.startsWith(text) // true
```

- 判断结尾是否存在

```js
let text = 'world'
let blog = 'hello world'
blog.endsWith(text) // true
```

- 复制字符串

```js
let text = 'world'
text.repeat(3) // worldworldworld
```

## 数字操作

### 整数取值范围操作

```js
let a = Math.pow(2, 53) - 1
console.log(a) // 9007199254740991
```

- 最大安全整数

```js
console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991
```

- 最小安全整数

```js
console.log(Number.MIN_SAFE_INTEGER) // -9007199254740991
```

### 数字判断和转换

- 数字验证

```js
Number.isFinite(11 / 4) // true
Number.isFinite('hello') // false
```

- NaN 验证

```js
Number.isNaN(NaN) // true
```

- 整数判断

```js
Number.isInteger(12) // true
Number.isInteger(1.2) // false
```

- 安全整数判断

```js
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
```

## 新增的数组知识

### JSON 数组格式转换

> 这就是一个标准的 JSON 数组格式，跟普通的 JSON 对比是在最后多了一个 length 属性。只要是这种特殊的 json 格式都可以轻松使用 ES6 的语法转变成数组。

```js
let json = {
  '0': '前',
  '1': '后',
  '2': '全',
  length: 3
}
let arr = Array.from(json)
console.log(arr) // ["前", "后", "全"]
```

### Array.of()方法

> 把一堆文本或者变量转换成数组

```js
let arr = Array.of('前', '后', '全')
console.log(arr) // ["前", "后", "全"]
```

### find()实例方法

> find 方法是从数组全查找。在 find 方法全我们需要传入一个匿名函数，函数需要传入三个参数：value：表示当前查找的值。index：表示当前查找的数组索引。arr：表示当前数组。在函数全如果找到符合条件的数组元素就进行 return，并停止查找。

```js
let arr = [1, 2, 3, 4, 5]
console.log(arr.find((value, index, arr) => value > 3)) // 4
```

### fill()实例方法

> fill()也是一个实例方法，它的作用是把数组进行填充，它接收三个参数，第一个参数是填充的变量，第二个是开始填充的位置，第三个是填充到的位置。

```js
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
arr.fill('hello', 2, 5)
console.log(arr) // [0, 1, "hello", "hello", "hello", 5, 6, 7, 8, 9]
```

### 数组遍历

- for...of 循环
  > 打印内容

```js
let arr = ['前', '后', '全']
for (let val of arr) {
  console.log(val)
}
```

> 打印索引

```js
let arr = ['前', '后', '全']
for (let index of arr.keys()) {
  console.log(index)
}
```

> 打印内容+索引

```js
let arr = ['前', '后', '全']
for (let [index, val] of arr.entries()) {
  console.log(index + ':' + val)
}
```

- entries( )实例方法

```js
let arr = ['前', '后', '全']
let list = arr.entries()
console.log(list.next().value) // [0, "前"]
console.log(list.next().value) // [1, "后"]
console.log(list.next().value) // [2, "全"]
```

## 箭头函数

## 数组和函数补漏

### 对象的函数解构

```js
let json = {
  a: '前',
  b: '后'
}
function fn({ a, b }) {
  console.log(a, b)
}
fn(json) // 前 后
```

### 数组的函数解构

```js
let arr = ['前', '后', '全']
function fn(a, b, c) {
  console.log(a, b, c)
}
fn(...arr) // 前 后 全
```

### in 的用法

> in 是用来判断对象或者数组全是否存在某个值的。

- 对象判断

```js
let obj = {
  a: 'hello',
  b: 'world'
}
console.log('a' in obj) //true
```

- 数组判断

```js
let arr = ['hello', 'world']
console.log(0 in arr) //true
```

### 数组遍历

> forEach 循环的特点是会自动省略为空的数组元素，相当于直接给我们筛空了。当是有时候也会给我们帮倒忙。

- forEach

```js
let arr = ['前', '后', '全']
arr.forEach((val, index) => console.log(index, val))
```

- filter

```js
let arr = ['前', '后', '全']
arr.filter(val => console.log(val))
```

- some

```js
let arr = ['前', '后', '全']
arr.some(val => console.log(val))
```

- map
  > map 可以向上面一样做循环，在这里起到一个替换的作用

```js
let arr = ['前', '后', '全']
console.log(arr.map(val => '中'))
```

## ES6 对象

## Symbol

## Set

> Set 和 Array 的区别是 Set 不允许内部有重复的值，如果有只显示一个，相当于去重。虽然 Set 很像数组，但是他不是数组。

```js
let setArr = new Set([1, 2, 3, 4])
console.log(setArr) // Set(4) {1, 2, 3, 4}
```

size 属性

```js
let setArr = new Set([1, 2, 3, 4])
console.log(setArr.size) // 4
```

### Set 的增删查

- 追加 add

```js
let setArr = new Set([1, 2, 3, 4])
setArr.add(5)
console.log(setArr) // Set(4) {1, 2, 3, 4, 5}
```

- 删除 delete

```js
let setArr = new Set([1, 2, 3, 4])
setArr.add(5)
setArr.delete(5)
console.log(setArr) // Set(4) {1, 2, 3, 4}
```

- 查找 has

```js
let setArr = new Set([1, 2, 3, 4])

console.log(setArr) // Set(4) {1, 2, 3, 4}
console.log(setArr.has(1)) // true
```

清空 clear

```js
let setArr = new Set([1, 2, 3, 4])
setArr.clear()
console.log(setArr) // Set(0) {}
```

set 的 for...of 循环

```js
let setArr = new Set([1, 2, 3, 4])
for (let val of setArr) {
  console.log(val)
}
```

set 的 forEach 循环

```js
let setArr = new Set([1, 2, 3, 4])
setArr.forEach(val => console.log(val))
```
weakSet的声明
>这里需要注意的是，如果你直接在new 的时候就放入值，将报错.WeakSet里边的值也是不允许重复的
```js
let weakObj = new WeakSet()
let obj = { a: '前', b: '后' }
weakObj.add(obj)
console.log(weakObj)
```
## Map数据结构
>Map的灵活性要更好，你可以把它看成一种特殊的键值对，但你的key可以设置成数组，值也可以设置成字符串，让它不规律对应起来。
```js
let json = {
  a:'前',
  b:'后'
}
var map=new Map()

map.set(json,'全')
console.log(map)
console.log(map.get(json))

```
### map的增删查
- 增加set
```js
map.set(json,'全')
```
- 取值get
```js
console.log(map.get(json))
```
- 删除delete
```js
map.delete(json);
console.log(map)
```
- size属性
```js
console.log(map.size)
```
- 查找has

```js
console.log(map.has(json))
```
- 清空 clear
```js
map.clear()
```
总结：map在现在开发中已经经常使用，它的灵活性和高效性是我们喜欢的。开发中试着去使用map吧，你一定会喜欢上它的。

## 用Proxy进行预处理
>在运行函数前初始化一些数据，在改变对象值后做一些善后处理。这些都算钩子函数，Proxy的存在就可以让我们给函数加上这样的钩子函数，你也可以理解为在执行方法前预处理一些代码。你可以简单的理解为他是函数或者对象的生命周期。

### 声明Proxy
>我们用new的方法对Proxy进行声明。可以看一下声明Proxy的基本形式。
```js
new Proxy({},{})
```
需要注意的是这里是两个花括号，第一个花括号就相当于我们方法的主体，后边的花括号就是Proxy代理处理区域，相当于我们写钩子函数的地方。

现在把上边的obj对象改成我们的Proxy形式。
```js
var pro = new Proxy({
    add: function (val) {
        return val + 10;
    },
    name: 'I am Jspang'
}, {
        get:function(target,key,property){
            console.log('come in Get');
            return target[key];
        }
    });
console.log(pro.name);
```

可以在控制台看到结果，先输出了come in Get。相当于在方法调用前的钩子函数。


### get属性

get属性是在你得到某对象属性值时预处理的方法，他接受三个参数

target：得到的目标值
key：目标的key值，相当于对象的属性
property：这个不太常用，用法还在研究中，还请大神指教。

### set属性

set属性是值你要改变Proxy属性值时，进行的预先处理。它接收四个参数。

target:目标值。
key：目标的Key值。
value：要改变的值。
receiver：改变前的原始值。

```js
let pro=new Proxy({
  add(val){
    return val+10
  },
  name:'hello world'
},{
  get(target,key,property){
    console.log('come in Get')
    return target[key]
  },
  set(target,key,value,receiver){
    console.log(`set ${key} = ${value}`)
    return target[key]=value
  }
})
console.log(pro.name)
pro.name='你好世界'
console.log(pro.name)
```
![](https://user-gold-cdn.xitu.io/2018/12/12/167a1c05fa893316?w=184&h=99&f=png&s=3287)

## promise

> ES6 中的 promise 的出现给我们很好的解决了回调地狱的问题，在使用 ES5 的时候，在多层嵌套回调时，写完的代码层次过多，很难进行维护和二次开发，ES6 认识到了这点问题，现在 promise 的使用，完美解决了这个问题。那我们如何理解 promise 这个单词在 ES5 中的作用那，你可以想象他是一种承诺，当它成功时执行一些代码，当它失败时执行一些代码。它更符合人类的行为思考习惯，而不在是晦涩难懂的冰冷语言。

```js
function step1(resolve, reject) {
  console.log('开始洗菜')
  if (state == 1) {
    resolve('洗菜-完成')
  } else {
    reject('洗菜-失败')
  }
}

function step2(resolve, reject) {
  console.log('开始吃饭')
  if (state == 2) {
    resolve('吃饭-完成')
  } else {
    reject('吃饭-失败')
  }
}

function step3(resolve, reject) {
  console.log('开始洗碗')
  if (state == 3) {
    resolve('洗碗-完成')
  } else {
    reject('洗碗-失败')
  }
}

let state = 1
new Promise(step1)
  .then(val => {
    console.log(val)
    state++
    return new Promise(step2)
  })
  .then(val => {
    console.log(val)
    state++
    return new Promise(step3)
  })
  .then(val => {
    console.log(val)
    return val
  })
```

## Class

> 我们在 ES5 中经常使用方法或者对象去模拟类的使用，虽然可以实现功能，但是代码并不优雅，ES6 为我们提供了类的使用。需要注意的是我们在写类的时候和 ES5 中的对象和构造函数要区分开来，不要学混了。

### 类的声明

> 我们已经声明了一个类，并在类里声明了 name 方法，现在要实例化类，并使用类中的方法。

```js
class Student {
  name(val) {
    console.log(val)
    return val
  }
}
let Tom = new Student()
Tom.name('Tom)
```

### 类的多方法声明

> 这里需要注意的是两个方法中间不要写逗号了，还有这里的 this 指类本身，还有要注意 return 的用法。

```js
class Student {
  name(val) {
    console.log(val)
    return val
  }
  skill(val) {
    console.log(this.name('Tom' + ' skill ' + val))
  }
}
let Tom = new Student()
Tom.name('Tom)
Tom.skill('web')
```

### 类的传参

> 在类的参数传递中我们用 constructor( )进行传参。传递参数后可以直接使用 this.xxx 进行调用.

```js
class Student {
  name(val) {
    console.log(val)
    return val
  }
  skill(val) {
    console.log(this.name('Tom' + ' skill ' + val))
  }
  constructor(a, b) {
    this.a = a
    this.b = b
  }
  add() {
    return this.a + this.b
  }
}
let Tom = new Student(1, 2)
console.log(Tom.add())
```

我们用 constructor 来约定了传递参数，然后用作了一个 add 方法，把参数相加。这和以前我们的传递方法有些不一样，所以需要小伙伴们多注意下。

### class 的继承

```js
class Student {
  name(val) {
    console.log(val)
    return val
  }
  skill(val) {
    console.log(this.name('Tom' + ' skill ' + val))
  }
  constructor(a, b) {
    this.a = a
    this.b = b
  }
  add() {
    return this.a + this.b
  }
}
class Man extends Student {}

let Jack = new Man(12, 23)
Jack.name('Jack')
Jack.skill('java')
console.log(Jack.add())
```

## 模块化

> 在 ES5 中我们要进行模块华操作需要引入第三方类库，随着前后端分离，前端的业务日渐复杂，ES6 为我们增加了模块话操作。模块化操作主要包括两个方面。

- export :负责进行模块化，也是模块的输出。
- import : 负责把模块引，也是模块的引入操作。

### export 的用法：

> export 可以让我们把变量，函数，对象进行模块话，提供外部调用接口，让外部进行引用。先来看个最简单的例子，把一个变量模块化。我们新建一个 temp.js 文件，然后在文件中输出一个模块变量。

```js
export var a = 'tom'
```

然后可以在 index.js 中以 import 的形式引入。

```js
import { a } from './temp.js'
console.log(a)
```

这就是一个最简单的模块的输出和引入。

### 多变量的输出

这里声明了 3 个变量，需要把这 3 个变量都进行模块化输出，这时候我们给他们包装成对象就可以了。

```js
var a = 'tom'
var b = 'jack'
var c = 'web'
```

export {a,b,c}

### 函数的模块化输出

```js
export function add(a, b) {
  return a + b
}
```

as 的用法 有些时候我们并不想暴露模块里边的变量名称，而给模块起一个更语义话的名称，这时候我们就可以使用 as 来操作。

```js
var a = 'tom'
var b = 'jack'
var c = 'web'
export { x as a, y as b, z as c }
```

export default 的使用 加上 default 相当是一个默认的入口。在一个文件里 export default 只能有一个。我们来对比一下 export 和 export default 的区别

1.export

```js
export var a = 'tom'
export function add(a, b) {
  return a + b
}
```

对应的导入方式

```js
import {a,add} form './temp' //也可以分开写
```

2.export defalut

```js
export default var a='tom'
```

对应的引入方式

```js
import str from './temp'
```
