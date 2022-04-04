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

#### 2.4 **介绍一下**em,rem,vw, vh, vmax, vmin？

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

1. 浏览器将获取的HTML文档解析成DOM Tree (DOM树)
2. 将CSS样式表解析成CSSOM Tree(CSS树)
3. 将DOM和CSSOM合并为渲染树(redering tree),这个过程被称为attachment
4. 渲染树的每个元素经过精确的计算，给出坐标，这个过程称为layout
5. 将渲染树的各个节点绘制到屏幕上，这个过程称为painting

   ![image-20220404084823116](images/image-20220404084823116.png)

#### 2.7 **从浏览器地址栏输入**url**到显示⻚面的步骤**?

1. 浏览器根据请求的URL交给DNS域名解析，找到真实的ip地址向服务器发起请求。
2. 服务器交给后台处理完成后返回数据，浏览器接受文件（HTML,CSS,JS,图像等）。
3. 浏览器对加载的资源进行语法解析，建立相应的内部数据结构。
4. 载入解析到的资源文件，渲染页面，完成。

#### 2.8 CSS3新增了哪些内容？

* 过渡 transition: CSS属性（默认all）花费时间  效果曲线（默认ease）延迟时间（默认0）

* 动画 animation: 动画名称  一个周期花费时间  运动曲线（默认ease）动画延迟（默认0）播放次数（默认1）是否反向播放动画（默认normal）是否暂停动画（默认running）

* 形状转换 transform: 适用于2d或3d转换的元素

  rotate(30deg); translate(30px,30px); scale(.8);skew(10deg,10deg); rotateX(180deg);rotateY(180deg); rotate3d(10,10,10,90deg);

* 选择器

  1. 属性选择器

  2. 结构性伪类选择器

     `:root` 等同于html; `:not`(否定选择器); `:empty`选择器表示的就是空。`:target`目标选择器，用来匹配文档(页面)的url的某个标志符的目标元素。`:first-child`表示的是选择父元素的第一个子元素的元素E。简单点理解就是选择元素中的第一个子元素，记住是子元素，而不是后代元素。`first-of-type`匹配的是父元素下相同类型子元素中的第一个，比如 p:first-of-type，就是指所有类型为p的子元素中的第一个。这里不再限制是第一个子元素了，只要是该类型元素的第一个就行了。

  3. enabled和:disabled选择器

  4. checked选择器

  5. ::selection选择器

  6. ::before和::after伪元素选择器

* 阴影 box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影大小 阴影颜色 阴影开始方向（默认从里向外，设置inset就是从外到里）

* 边框 border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘 制偏移的量(默认0) 铺满方式--重复(repeat)、拉伸(stretch)或铺满(round)(默认:拉伸 (stretch))

* 背景 background-clip(制定背景绘制(显示)区域) background-origin background-size

  background-clip: border-box; 默认情况(从边框开始绘制)

  background-clip: padding-box; 从padding开始绘制(显示)，不算border,，相当于把border那里的背景给裁剪掉

  background-clip: content-box;只在内容区绘制(显示)，不算padding和border，相当于把padding和 border那里的背景给裁剪掉

* 反射 -webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片

* 文字 word-break: normal|break-all|keep-all; 

​		换行 word-wrap: normal|break-word;

​		超出省略号 text-overflow:clip|ellipsis|string;

​		文字阴影 text-shadow:水平阴影，垂直阴影，模糊的距离，以及阴影的颜色。

* 颜色 rgba(rgb为颜色值，a为透明度) color: rgba(255,00,00,1);background: rgba(00,00,00,.5); hsla h:色 相”，“s:饱和度”，“l:亮度”，“a:透明度” color: hsla( 112, 72%, 33%, 0.68);background-color: hsla( 49, 65%, 60%, 0.68);
* 渐变 
* Filter(滤镜):黑白色filter: grayscale(100%)、褐色filter:sepia(1)、饱和度saturate(2)、色相旋转hue- rotate(90deg)、反色filter:invert(1)、透明度opacity(.5)、亮度brightness(.5)、对比度contrast(2)、模糊 blur(3px)
* 弹性布局 flex
* 网格布局 grid

* 多列布局

* 盒模型定义 

  box-sizing:border-box的时候，边框和padding包含在元素的宽高之内

  box- sizing:content-box的时候，边框和padding不包含在元素的宽高之内

* 媒体查询: 就是监听屏幕尺寸的变化，在不同尺寸的时候显示不同的样式!在做响应式的网站里面，是必不可少的一环

#### 2.9 过渡和动画的区别？

* 过渡需要用户手动触发，而动画不需要
* 过渡不能控制中间过程，动画可以
* 过渡只能执行一次，动画可以执行任意次

#### 2.10 什么是回流和重绘？

**什么是回流？**

> 通过构造render tree,我们可以将DOM节点以及它对应的样式结合起来，可是我们还需要计算它们的设备视口（viewport）内的确切位置和大小，这个计算的阶段就叫回流。
>
> 当render tree 中的一部分（或全部）因为元素的规模尺寸，布局，隐藏等改变而需要重新构建时，这就称为回流（reflow）。每个页面至少有一次回流，就是页面在第一次加载的时候，这时候一定会发生回流，因为要构建render tree。

**什么是重绘？**

> 当render tree 中的一些元素需要更新属性时，而这些属性只是影响元素的外观、风格而不会影响布局的时候，比如：background-color、文字颜色、边框颜色等，则称为重绘。

**区别**

> 回流必定会发生重绘，而重绘不一定发生回流。回流所需要花费的成本比重绘高很多，改变父节点里的子节点很可能会导致父节点的一系列发生回流。

**何时会发生回流？**

* 页面第一次渲染
* 添加或删除可见的DOM元素时
* 元素的位置发生变化
* 元素的尺寸发生变化（包括外边距、内边距、边框大小、高度和宽度等）
* 内容发生变化 比如：文本变化或图片被另一个不同的尺寸的图片所替代或者字体改变
* 浏览器窗口尺寸的变化（因为回流是根据视口的大小来计算元素的位置和大小的）
* 定位或者浮动，盒模型等
* 获取元素的某些属性

**如何减少重绘和回流？**

* 使用tranform做形变和位移来替代定位top
* 使用visibility替代display: none;因为前者只会引起重绘，而后者会发生回流
* 不要使用table布局，可能很小的一个改变会造成整个table的重新布局
* 动画实现的速度选择，动画速度越快，回流的次数越多，也可以选择使用requestAnimationFrame
* CSS选择器会从右往左匹配查找，因此需要避免层级过多
* 将频繁重绘或回流的节点设置为图层，图层能够阻止该节点渲染行为影响别的节点。比如video标签，浏览器 会自动将该节点变为图层
* 避免多次读取某些属性
* 合并多次对DOM和样式的修改，然后一次处理掉

#### 2.11  弹性盒（flex）

**父元素**

```css
display:
- flex-direction:设置主轴方向
- justify-content:设置主轴对⻬方式
- align-items:设置侧轴对⻬方式
- flex-wrap 设置是否换行
- align-content : 行与行之间的排列方式
```

**子元素**

```css
- align-self: 设置单独在侧轴对⻬方式 - order: 设置排列顺序
- flex-grow: 放大比例
- flex-shrink: 缩小比例
- flex-basis: 分配剩余空间前占据的位置
- flex: flex-grow,flex-shrink,flex-basis的缩写
```

#### 2.12 盒模型有几种?

* 标准盒模型:margin，border，padding，content

​		宽 = 左右border + 左右margin + 左有padding + width

* 怪异盒模型（IE盒模型）:border和padding算在宽高的里面

​		宽 = width

#### 2.13 移动端适配怎么做？

1. 可以使用手机淘宝之前的方案 flexible.js插件
2. 使用less或者sass等css预编译的mixin混合计算，带参数进行自动计算
3. 使用最新的postcss的postcss-pxtorem插件和lib-flexible插件
4. 使用rem+vw进行布局

#### 2.14 rgba()**和** opacity 的透明效果有什么不同?

rgba()和 opacity 都能实现透明效果，但最大的不同是opacity作用于元素，以及元素的所有内容的透明度，而rgba()只作用于元素的颜色或其背景色。(设置 rgba 透明的元素的子元素不会继承透明效果!)

#### 2.15 什么是BFC？

> BFC: block formatting context(块状格式化上下文)
>
> bfc是一个独立的空间，只有块状元素参与， 它规定了里面的块状元素如何布局，它和外部的环境毫不相干。

**触发条件**

```css
1. 根元素(html)本身就是一个BFC
2. float不能none的时候
3. position为absolute或者fixed的时候
4. display为inline-block, table-cell, flex, inline-flex等 
5. overflow不为visible的时候
```

**特点**

```css
1.bfc区域的元素从上到下一次排列
2.相邻的上下元素垂直方向的距离由margin控制，具体以margin值大的为准
3.bfc区域里面的元素的margin-left与bfc区域的border-left相接触
4.bfc区域与外界毫不相干
5.bfc区域不会与float元素相重叠
6.计算bfc区域,浮动元素参与计算
```

#### 2.16 CSS中哪些属性可以继承?

* 字体系列属性

  font-family:字体系列

  font-weight:字体的粗细

  font-size:字体的大小

  font-style:字体的⻛格

* 文本系列属性

  text-indent:文本缩进

  text-align:文本水平对⻬

  line-height:行高

  word-spacing:单词之间的间距

  letter-spacing:中文或者字母之间的间距

  text-transform:控制文本大小写(就是uppercase、lowercase、capitalize这三个) 

  color:文本颜色

* 元素可⻅性

  visibility:控制元素显示隐藏

* 列表布局属性

  list-style:列表⻛格，包括list-style-type、list-style-image等

* 光标属性

  cursor:光标显示为何种形态

#### 2.17 行内元素和块级元素的区别？

1. 行内元素会在一条直线上排列（默认宽度只与内容有关），都是同一行的，水平方向排列。块级元素各占据一行（默认宽度是它本身父容器的100%（和父元素的宽度一致），与内容无关），垂直方向排列。
2. 块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素，只能包含文本或者其它行内元素。
3. 行内元素设置width无效，height无效(可以设置line-height)，margin上下无效，padding上下无效

#### 2.18 CSS权重

!important>行内样式>id>class|属性>标签选择器>通配符

包含选择器的权重等于每一级选择器的权重之和

#### 2.19 CSS选择器有哪些？

* 通配符
* id选择器
* class选择器
* 元素选择器
* 后代选择器
* 层级选择器
* 属性选择器
* 兄弟选择器
* 结构选择器
  * 结构伪类
  * 目标伪类
  * ui状态伪类
  * 动态伪类
  * 否定伪类
* 等

#### 2.19 如何清除图片之间的间隙？

* 清除图片左右的间隙
  1. 图片挨着写（中间没有空格，也没有回车）
  2. 将图片的父元素的font-size设置为0
  3. 给图片加浮动
* 清除图片的上下边距
  1. 将图片设置成display: block
  2. 给图片设置vertical-align: top/middle/bottom

#### 2.20 stylus/sass/less区别?

* 均具有“变量”、“混合”、“嵌套”、“继承”、“颜色混合”五大基本特性
* Sass和Less语法较为严谨，Less要求一定要使用花括号“{}”，Scss和Stylus可以通过缩进表示层次与嵌套关系

* Sass无全局变量的概念,Less和Stylus有类似于其它语言的作用域概念

* Sass是基于Ruby语言的，而Less和Stylus可以基于NodeJS NPM下载相应库后进行编译
