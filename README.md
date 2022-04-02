# 面试题(基础)
## 1、html

### 1.1 **你做的⻚面在哪些流览器测试过?这些浏览器的内核分别是什么**?

* 五大浏览器内核
  * Trident (踹等特) (MSHTML) (三叉戟;三叉线;三⻮⻥叉)
  * Gecko (给扣) (壁⻁)
  * Presto (pua 思透) ( 迅速的)
  * Webkit (外 be 可诶特) (Safari内核,Chrome内核原型,它是苹果公司自己的内核，也是苹果的Safari浏览器 使用的内核)
  * Blink (be 另可) (由Google和Opera Software开发的浏览器排版引擎)

* 五大浏览器内核代表作品

  * Trident:IE、Maxthon(遨游)、腾讯 、Theworld世界之窗、360浏览器

  * Gecko:代表作品Mozilla Firefox 是开源的,它的最大优势是跨平台，能在Microsoft Windows、Linux和 MacOS X等主要操作系统上运行。
  * Webkit :代表作品Safari、Chrome ， 是一个开源项目。
  * Presto :代表作品Opera ，Presto是由Opera Software开发的浏览器排版引擎。它也是世界上公认的渲染速 度最快的引擎。
  * Blink: 由Google和Opera Software开发的浏览器排版引擎，2013年4月发布。

### 1.2 h5**新增了哪些内容**？

* 语义化标签

  header，footer，nav，section，article，aside等

* 媒体标签

  audio，video

* 功能性标签

  svg，canvas

* 智能表单

  一些input的type类型，和新的input属性

* 本地存储

  localstorage和sessionstorage

* api

  websocket, fetch(浏览器自带的数据请求方式)和requestAnimationFrame(动画定时器)等等

* 新事件

  onresize, ondrag, onscroll, onmousewheel, onerror, onplay, onpause等

### 1.3 **语义化的理解?**

> 用正确的标签做正确的事情！html语义化就是让页面的内容结构化，便于浏览器、搜索引擎解析，在没有css样式的情况下也可以一种文档格式显示，并且是容易阅读的。利于SEO搜索引擎优化和代码阅读理解。

### 1.4 **什么是响应式**？

> 响应式：它是关于网页制作过程中让不同的尺寸不同功能的设备进行兼容处理，所有使用的设备上让网站运行正常。

### 1.5 localStorage, sessionStorage**和**cookie**之间的区别**？

| 特性         | cookie                             | localStorage                               | sessionStroge                  | IndexDB                                        |
| ------------ | ---------------------------------- | ------------------------------------------ | ------------------------------ | ---------------------------------------------- |
| 数据生命周期 | 一般由服务端生成，可以设置过期时间 | 持久化本地存储，除非主动删除，否则一直存在 | 持久化本地存储，页面关闭就清除 | 持久化本地存储，除非被主动删除，否则一直会存在 |
| 数据存储大小 | 4k                                 | 5M                                         | 5M                             | 无限                                           |
| 与服务端通信 | 每次都会携带在header中             | 不参与                                     | 不参与                         | 不参与                                         |

作用域不同：sessisionStorage不能在不同的浏览器窗口中共享，即使是同一个⻚面;localStorage和cookie在同 一个浏览器的所有的同源窗口中都是共享的。cookie的存取方法需要自己封装，本地存储拥有自己存取的方法。

### 1.6 websocket**协议和**http**协议的区别**？

* http协议:每次http请求都需要创建一次tcp连接，通信只能由客户端发起，做不到服务器主动向客户端推送信息。
* websocket协议: websocket是保持⻓连接，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。

### 1.7 **前端优化做过哪些**

#### **网⻚内容**

- 减少http请求次数

    - 将js和css文件捆绑下载 

    - 使用雪碧图

- 减少DNS查询次数
- 避免在⻚面的主体布局使用table
- 减少DOM元素数量
- 减少iframe

#### **服务器端**

* 使用cdn加速
* 多使用GET请求
* 避免空的src图片，因为空的src图片也会进行请求

#### CSS

* 样式表写在head里面
* 使用link替代@import
* 样式少嵌套（最好三层即可）

#### JavaScript

* 写在body的最下面，让页面内容尽快渲染加载给用户
* 使用h5新增的async关键字，可以让js异步执行
* 将js和css外部引入，并且精简和压缩

#### 减少dom操作

#### 图片

* 图片预加载、懒加载
* 不要在html中缩放图片，如果有小图片，直接使用小图片

### 2、CSS

#### 2.1 元素水平垂直居中的方式?

* 弹性盒

  父元素：display: flex;

  子元素：margin: auto;

* 弹性盒2

​		父元素：display: flex;justify-content: center;align-items: center;

* 定位

  父元素：position: relative;

  子元素：position: absolute;top: 0;left:0;right:0;bottom:0;magin: auto;

* 定位+2d变形

  父元素：position: relative;

  子元素：position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);

#### 2.2 **清除浮动的方式**?

* 给高度塌陷的元素添加overflow: hidden;
* 额外标签法：在最后面加一个空的div，并添加clear: both;

* 万能清除法: 

  ```css
  .clearfix::after {
  	content: '.',
  	height: 0;
  	display: block;
  	overflow: hidden;
  	visibility: hidden;
  	clear: both;
  }
  ```

* display:flow-root: 新出来的，没有副作用，但是还存在兼容性问题

#### 2.3 display**有哪些属性值**?

* block: 块状元素
* inline-block:行内块元素
* inline:行内元素
* none:隐藏元素
* flex:弹性盒
* inline-flex: 行内的弹性盒
* list-item: li的默认属性值
* table: table的默认值
* table-row: tr的默认值
* table-cell: rd的默认值
* inherit: 继承

#### 2.4 **介绍一下**em**，**rem**，**vw, vh, vmax, vmin？

* em: em是相对⻓度单位。相对于当前元素内文本的字体尺寸
* rem: rem是CSS3新增的一个相对单位，相对的是HTML根元素的字体大小。除了IE8及更早版本外，所有浏览 器均已支持rem。
* vw: 视窗宽度的百分比(1vw 代表视窗的宽度为 1%)
* vh: 视窗高度的百分比
* vmax: 当前 vw 和 vh 中较大的一个值
* vmin: 当前 vw 和 vh 中较小的一个值
* 视窗(Viewport)是浏览器实际显示内容的区域，是不包括工具栏和按钮的网⻚浏览器的内容区域。
* 做移动⻚面开发时，如果使用 vw、vh 设置字体大小(比如 5vw)，在竖屏和横屏状态下显示的字体大小是不一样的。由于 vmin 和 vmax 是当前较小的 vw 和 vh 和当前较大的 vw 和 vh。这里就可以用到 vmin 和 vmax。使得文字大小在横竖屏下保持一致。

#### 2.5 **定位有哪些?**

* static: 默认值。没有定位，元素出现在正常的文档流中(忽略 top, bottom, left, right 或者 z-index 声明)。
* relative: 相对于元素本身正常的位置进行定位，不脱离文档流，"left:20" 会向元素的 LEFT 位置移动20 像 素。
* absolute: 生成绝对定位元素，相对于第一个static定位以外的父元素进行定位，元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定， 相对的是父元素border的位置。
* fixed: 生成固定定位的元素，相当于浏览器窗口进行定位。
* sticky: 粘性定位，该定位基于用户滚动的位置。正常情况下，它的行为就像 position:relative; 而当⻚面滚动 超出目标区域时，它的表现就像 position:fixed;它会固定在目标位置。
* inherit: 规定从父元素继承position属性的值。
* initial: 设置属性为默认值(static)

#### 2.6 **浏览器的渲染原理**



