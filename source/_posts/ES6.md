---
title: ES6
date: 2018-12-24 16:17:13
tags: ES6
categories: ES6
copyright: true
---
## 1.变量声明let和const
### 预解析机制 : var有变量提升的机制
```js
function fn(){
    var a=1
    console.log(a)
}
fn()  //1

//以上代码等同于：
function fn(){
    var a
    a=1
    console.log(a)
}
fn()  //1
```
把声明赋值和打印的语句顺序交换
```js
function fn(){
    console.log(a)
    var a=1
}
fn()  //undefined

//以上代码等同于：
function fn(){
    var a
    console.log(a)
    a=1
}
fn()  //undefined
```
ES5的解析：从上到下解析，遇到var关键字，就把该声明提前到函数的最顶部，如果不在函数内就提升到全局作用域的最顶部，赋值留在原位，因为先声明了变量a，然后打印，最后再赋值，所以结果就是undefined。
但是使用let和const就可以解决变量提升的问题，let代表变量，const代表常量。
```js
let
function fn(){
    let a=1
    console.log(a)
}
fn()  //1
```
把声明赋值和打印的语句顺序交换
```js
function fn(){
    console.log(a)
    let a=1
}
fn()  //Error: a is not defined
```
let不存在变量提升的机制，不会被声明到最顶部，所以未声明就打印，会报错：变量未定义。
```js
const
const PI=3.14
PI=3.1415926  //Error: Assignment to constant variable.
```
const的声明必须赋值，赋值之后不可修改。那要怎么修改const的值呢？
实际上是const的指向不可修改，但是可以通过更改地址中的内容来修改了const的值。
```js
const stu={ name:　'小明' }
//正确,改变地址中的内容
stu.name='小红'
//报错,改变了const的指向
stu={ name:　'小红' }
TDZ(暂时性死区)
if (true) {
  // TDZ开始
    tmp = 'abc';
    console.log(tmp); // Error: tmp is not defined
    
    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
```
let 或者 const，会将声明放入TDZ(暂时性死区)，只有执行到变量声明语句时，变量才会从TDZ中取出来使用。总之，暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

### 块级作用域
>ES6在ES5 全局作用域和函数作用域的基础上开拓了块级作用域，使得变量的作用域更加清晰。

内层变量覆盖外层变量
```js
var tmp = new Date();

function f() {
  console.log(tmp);
  var tmp = 'hello world';
}

f(); // undefined
```
函数f执行后，输出结果为undefined，原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量。

用来计数的循环变量泄露为全局变量
```js
var s = 'hello';

for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}

console.log(i); // 5
```
变量i只用来控制循环，但是循环结束后，它并没有消失，泄露成了全局变量。

ES6新增了块级作用域，即一个{}就是一个块级作用域。
```js
{ let a=1 }
console.log(a)  //报错
```
不同块级作用域可以定义重名的变量
```js
{
  let a='hello world'
  { let a='hello world' }
}
```
立即执行函数就可以用块级作用域来替代
```
//  IIFE写法
(function(){
    var a=...
    ...
})()

//  块级作用域写法
{
    var a=...
    ...
}
```
## 2.变量的解构赋值
### 数组的解构赋值
>解构赋值语法是一个Javascript表达式，这使得可以将数据从数组或对象提取到不同的变量中。

以前为变量赋值，只能直接指定值。
```js
let a = 1
let b = 2
let c = 3
```
ES6就可以写成这样
```js
let [a, b, c] = [1, 2, 3]
```
本质是上述匹配属于一种模式匹配, 也就是只要等号两边的模式相同，左边的变量就会被赋予对应的值。
```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [head, ...rest] = [1, 2, 3, 4];
head // 1
rest // [2, 3, 4]

let [bar, foo] = [1];
bar //1
foo //undefined
```

### 默认值
>解构赋值允许指定默认值
```js
let [ a = 1 ]= [ ]
a //1
```
ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
```js
let [x = 1] = [undefined];
x // 1
```
```js
let [x = 1] = [null];
x // null
```
null不严格等于undefined，默认值不生效。
如果默认值是一个表达式，表示则是惰性求值的，只有在用到的时候才会求值。
```js
function fn(){
    return -1
}
let [a = fn()]=[]
console.log(a)  //-1
let [b = fn()]=[1]
console.log(b)  //1
```
默认值可以引用其他变量，但该变量必须已经声明。
```js
let [x = 1, y = x] = []     // x=1; y=1
let [x = 1, y = x] = [2]   // x=2; y=2
let [x = 1, y = x] = [1, 2] // x=1; y=2
let [x = y, y = 1] = []   // Error: y is not defined
```
x用y做默认值，但是y还没有声明，所以报错。

### 对象的解构赋值
>解构不仅可以用于数组，还可以用于对象。
对象的解构赋值与数组不同的是：数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。
```js
var {foo,bar} = {foo: 'aaa', bar: 'bbb'}
console.log(foo)  //aaa
console.log(bar)  //bbb
//以上代码等同于：
let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" }
var {baz} = {foo: 'aaa', bar: 'bbb'}
console.log(baz)  //undefined
```
以上未找到baz，解构赋值失败。
```js
let { foo: baz } = { foo: "aaa", bar: "bbb" }
baz // "aaa"
foo // Error: foo is not defined
```
foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
```js
let obj = {
  p: [
    'hello',
    { y: 'world' }
  ]
}
let { p: [x, { y }] } = obj
 console.log(x,y)  //hello word
 ```
### 字符串的解构赋值
>字符串的解构赋值，符串会转化成一个类数组的对象。
```js
const [a,b,c,d,e] = 'hello'     
console.log(a,b,c,d,e)  //h e l l o
```
类数组对象有length属性，所以len是5。
```js
let {length : len} = 'hello';
len  //5
```
### 函数参数的解构赋值
>函数的参数也可以使用解构赋值
```
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3
```
## 3.字符串的扩展
### 模板字符串
拼接字符串一直是令人头痛的地方，一旦变量多起来，字符串的拼接就会变得尤为繁琐，而且可读性极低，模板字符串简直就是开发者的福音。用`${}`嵌入字符串中拼接，有几个变量就用几个`${}`
```js
// es5
var name='world'
console.log('hello'+name)

//es6
var name='world'
console.log(`hello${name}`)
```
在ES5中通过反斜杠(\)来做多行字符串的拼接，ES6反引号(``)可以直接搞定。
```js
// es5
var msg='hello \
world!'

// es6
const template=`
  <div>
    <span>hello world!</span>
  </div>
`
```
### 对运算的支持
```js
let a=1
let b=2
let result=`${a+b}`
console.log(result)  //3
```
### 字符串是否存在
```js
// es5
let name = 'Github'
let msg = 'hello world,my name is Github'
console.log(msg.indexOf(name))  //返回索引值

// es6
let name = 'Github'
let msg = 'hello world,my name is Github'
console.log(msg.includes(name))  //返回布尔值,更直观
```
### 复制字符串
```js
console.log('hello world|'.repeat(3))  // hello world|hello world|hello world|
```

## 4.箭头函数
>ES6提供了箭头函数，给函数的创建提供了一种简便方法。<br>
>三大特点:
>- 省略function关键字
>- 省略return关键字
>- 继承当前上下文的this关键字
```js
// es5
[1,2,3].forEach((function (item) {
  return item + 1
}).bind(this))

// es6
[1,2,3].forEach(item=>item+=1)
当参数只有一个时,可以省略(),当函数表达式只有一个时,可以省略{}和return

//  一个参数,一个表达式
let person = name => 'hello ' + name
console.log(person('world'))  //hello world

// 多个参数,多个表达式
let person = (name,age) => {
  const msg = `hello ${name},age is ${age}`
  return msg 
}
console.log(person('world',18))  //hello world,age is18
```
在使用别人的轮子时,因为不熟练经常会报错,那么这些框架是怎么抛出错误的呢?
```js
let add = (a,b=1) =>{
  if(a<=0){
    throw new Error('The variable must be greater than 0')
  }
  return a+b
}
console.log(add(0));  // Uncaught Error: The variable must be greater than 0
```

## 5.对象扩展功能
在对象的键值对重名时,可以这样处理
```js
// es5
function person(name,age){
  return {
    name:name,
    age:age
  } 
}

// es6
function person(name,age){
  return {
    name,
    age
  }
}
```
ES6改进了为对象字面量方法赋值的语法,可以省略:和function关键字
```js
// es5
function person(name){
  name,
  sayHi:function(){
    console.log('Hi')
  }
}

// es6
function person(name){
  name,
  sayHi(){
    console.log('Hi')
  }
}
```
合并对象
```js
let obj1={name:'Github'}
let obj2={sex:'男'}
let obj3={age:18}

let obj = Object.assign({},obj1,obj2,obj3)
console.log(obj)  // {name:"Github",sex:"男",age:18}
```
## 6.扩展运算符(...)
### 组装数组或者对象
```js
const arr1=[1,2,3]
const arr2=[...arr1,4,5,6]
console.log(arr2)  //[1,2,3,4,5,6]

const obj1={
    a:1,
    b:2
}
const obj2={...obj1,c:3,d:4}
console.log(obj2); //{a:1,b:2,c:3,d:4}
```
## 7.promise
>在promise之前，回调地狱，可读性差、耦合度高、扩展性低 。promise大大提高了代码的可读性，用同步编程的方式来编写异步代码，极大的降低了代码耦合性而提高了程序的可扩展性。

promise执行多步操作非常好用，现在模仿一个多步操作的过程。
把大象装进冰箱需要几步？答：三步，打开冰箱门，把大象塞进去，关上冰箱门。
```js
let flag = true;
function step1(resolve, reject) {
    console.log('1.开始-打开冰箱门');
    if (flag) {
        resolve('打开冰箱门--完成');
    } else {
        reject('打开冰箱门--出错');
    }
}
function step2(resolve, reject) {
    console.log('2.开始-把大象塞进去');
    if (flag) {
        resolve('把大象塞进去--完成');
    } else {
        reject('把大象塞进去--出错');
    }
}
function step3(resolve, reject) {
    console.log('3.开始-关上冰箱门');
    if (flag) {
        resolve('关上冰箱门--完成');
    } else {
        reject('关上冰箱门--出错');
    }
}
new Promise(step1).then(function (val) {
    console.log(val);
    return new Promise(step2);
}).then(function (val) {
    console.log(val);
    return new Promise(step3);
}).then(function (val) {
    console.log(val);
    return val;
});
/* 
1.开始-打开冰箱门
打开冰箱门--完成
2.开始-把大象塞进去
把大象塞进去--完成
3.开始-关上冰箱门
关上冰箱门--完成
*/
```
## 8.class类
### class声明和使用
```js
// 类的声明
class Coder{
    getName(name){
        console.log(name);
    }
}
// 类的使用
let Github=new Coder
Github.getName('Github')  // Github
声明一个JsCoder的新类并继承Coder类

class Coder{
    getName(name){
        console.log(name);
    }
}

class JsCoder extends Coder{}

let js=new JsCoder
js.getName('js')
```
## 9.模块化
>前后端分离，前端业务逻辑也在日益复杂，前端也在借鉴后端的思想，ES6为我们增加了模块化操作来方便我们引用第三方库，尤其是在开发vue项目时，需要依赖大量第三方包，需要我们使用到模块化的思想来开发项目。

- import : 引入模块
- export : 输出模块
```js
// a.js 导出
export var name='hello world'
export function add(a,b){
    return a+b;
}

// b.js 导入
import { name,add } from "./a.js"  //也可以分开导入
console.log(name)  //hello world
console.log(add(1,2))  //3
```