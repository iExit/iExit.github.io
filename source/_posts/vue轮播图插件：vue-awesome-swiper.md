---
title: vue轮播图插件：vue-awesome-swiper
date: 2018-12-26 09:17:39
tags: Vue
categories: Vue
copyright: true
---
先用`vue-cli`新建一个项目
```npm install vue-awesome-swiper --save(-S)```
等待安装，安装完后`package.json`中添加上了`vue-awesome-swiper`
```js
"dependencies": {
    "vue": "^2.5.2",
    "vue-awesome-swiper": "^3.1.3"
}
```
进入`main.js`
```js
import Vue from 'vue'
import App from './App'
import vueSwiper from 'vue-awesome-swiper'  //引入vue-awesome-swiper
import 'swiper/dist/css/swiper.css'  //引入样式

Vue.config.productionTip = false

Vue.use(vueSwiper)  //使用插件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
```
`swiper`的基本结构
```js
 <swiper>
        <swiper-slide class="swiper-slide"></swiper-slide>
 </swiper>
```
参考`swiper`的基本结构，在`App.vue`中尝试一下
```js
<template>
  <div id="app">
    <div>
      <swiper>
        <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
          我是第{{item}}个轮播图
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      slide: [1, 2, 3, 4, 5]
    }
  }
}
</script>

<style>
.swiper-slide {
  width: 100%;
  height: 500px;
  line-height:500px;
  font-size: 50px;
  text-align: center;
  background-color: rosybrown;
}
</style>
```
![](https://upload-images.jianshu.io/upload_images/12953503-0df77e242efd5b8a.png?imageMogr2/auto-orient/)
![](https://upload-images.jianshu.io/upload_images/12953503-7baa7e8ff75fe53e.png?imageMogr2/auto-orient/)
成功实现了轮播图的效果，接下来配置一些属性，在App.vue中进行更改
```js
<template>
  <div id="app">
    <div>
      <swiper :options="swiperOption">
        <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
          我是第{{item}}个轮播图
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>   <!-- 分页 -->
        <div class="swiper-button-prev" slot="button-prev"></div>  <!-- 箭头左 --> 
        <div class="swiper-button-next" slot="button-next"></div>  <!-- 箭头右 -->
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      slide: [1, 2, 3, 4, 5],
      //设置属性
      swiperOption: {
        //显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true //允许分页点击跳转
        },
        //设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next', 
          prevEl: '.swiper-button-prev'
        },
        //自动轮播
        autoplay: {
          delay: 400
        },
        //开启循环模式
        loop: true,
        //开启鼠标滚轮控制Swiper切换
        mousewheel: true
      }
    }
  }
}
</script>

<style>
.swiper-slide {
  width: 100%;
  height: 500px;
  line-height: 500px;
  font-size: 50px;
  text-align: center;
  background-color: rosybrown;
}
</style>
```
这样就实现了轮播图更多属性的配置















这样就实现了轮播图更多属性的配置