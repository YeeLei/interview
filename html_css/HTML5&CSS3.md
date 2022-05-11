## 									HTML5&CSS3

### 1.display、visibility和opacity的区别?

共同点：都可以隐藏元素，让元素不可见

区别：

display: none

1. 不占据空间
2. 无法对进行DOM事件监听

3. 动态改变元素此属性，会引起回流，性能较差
4. 不会被子元素继承
5. transition 不支持 display。 

visibility: hidden

1. 元素隐藏，占据空间
2. 无法进行DOM事件监听
3. 动态改变元素此属性，会引起重绘，性能较高
4. 会被子元素所继承，子元素可以通过设置 visibility: visible; 来取消隐藏
5. transition 支持 visibility。 

opacity: 0

1. 透明度为100%，元素隐藏，占据空间
2. 可以进行DOM事件监听
3. 不会触发重绘，性能较高
4. 会被子元素继承，子元素可以通过设置opacity: 1;来取消隐藏

5. transition支持opacity

### 2.单行文本和多行文本截断

单行文本截断：

```css
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

多行文本截断：

```css
div {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2; // 最多为2行，2行不行使用...省略号
  -webkit-box-orient: vertical;
}
```

### 3.flex布局

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
- align-self: 设置单独在侧轴对⻬方式
- order: 设置排列顺序
- flex-grow: 放大比例
- flex-shrink: 缩小比例
- flex-basis: 分配剩余空间前占据的位置
- flex: flex-grow,flex-shrink,flex-basis的缩写
```

**flex: 1(flex: 1 1 auto)** 

CSS属性 flex 规定了弹性元素如何伸长或缩短以适应flex容器中的可用空间。这是一个简写属性，用来设置 flex-grow, flex-shrink 与 flex-basis。

> flex-grow: CSS flex-grow 属性定义弹性盒子项（flex item）的拉伸因子。

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>flex:1</title>
    <style>
        .box {
            height: 200px;
            display: flex;
        }
        #box1 {
            background-color: pink;
            flex-grow: 1;
        }
        #box2 {
            background-color: yellow;
            flex-grow: 3;
        }
    </style>
</head>
<body>
    <div class="box">
        <div id="box1">box1</div>
        <div id="box2">box2</div>
    </div>
</body>
</html>

一个大盒子，box，里面两个小盒子，box1、box2，大盒子有个高200px，再设置display: flex;小盒子设置不同的flex-grow，代表一份和三份。
```

> flex-shrink: 指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .box {
            width: 500px;
            display: flex;
        }
        #box1 {
            width: 400px;
            background-color: #c5c5c5;
            flex-shrink: 1;
        }
        #box2 {
            width: 400px;
            background-color: khaki;
            flex-shrink: 3;
        }
    </style>
</head>
<body>
    <div class="box">
        <div id="box1">box1</div>
        <div id="box2">box2</div>
    </div>
</body>
</html>

400px+400px>500px，收缩后盒子宽的比例为3:1
```

> flex-basis: 指定了 flex 元素在主轴方向上的初始大小。如果不使用 box-sizing 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。width 值可以是 <‘length’>; 该值也可以是一个相对于其父弹性盒容器主轴尺寸的百分数 。负值是不被允许的。默认为 auto。content基于 flex 的元素的内容自动调整大小。

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .box {
            height: 200px;
            display: flex;
        }
        #box1 {
            background-color: lightcoral;
            flex-basis: 80%;
        }
        #box2 {
            background-color: lightpink;
            flex-basis: 100px;
        }
    </style>

</head>
<body>
    <div class="box">
        <div id="box1">box1</div>
        <div id="box2">box2</div>
    </div>
</body>
</html>

主轴宽982px，982px*80%=788.8px
```



### 4.盒模型有几种?

* 标准盒模型:margin，border，padding，content

​		 宽 = 左右border + 左右margin + 左右padding + content

* 怪异盒模型（IE盒模型）:border和padding算在宽高的里面

​		 宽 = content

### 5.animation动画和transition过渡的区别？

1. 过渡需要手动触发，而动画不需要
2. 过渡不能控制中间过程，动画可以
3. 过渡只能执行一次，而动画可以执行任意次

animation: 动画名称 一个周期所花费的时间 运动曲线(默认ease)  动画延迟时间(默认0)  播放次数(默认1) 是否反转播放动画(默认normal)  是否暂停动画(默认running)

transition: css属性（默认all）花费时间 效果曲线（默认ease）延迟时间（默认0）

### 6.如何画一条 0.5px 的边框?

1. border+border-image+线性渐变linear-gradient

```css
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .border {
      width: 200px;
      height: 200px;
      background-color: red;
      margin: 0 auto;
      border-bottom: 1px solid transparent;
      border-image: linear-gradient(to bottom,transparent 50%,green 50%) 0 0 100% 0;
    }
  </style>
</head>
<body>
  <div class="border"></div>
</body>
</html>
```

2. 定位 + 伪元素 + transform缩放（scale）

```css
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .border {
      width: 200px;
      height: 200px;
      margin: 0 auto;
      background-color: red;
      position: relative;
    }
    .border::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: blue;
      /* 注意是Y轴方向缩小一半 */
      transform: scaleY(0.5);  
    }
  </style>
</head>
<body>
  <div class="border"></div>
</body>
</html>
```

3. 定位 + 伪元素 + background + 线性渐变linear-gradient

```css
<div class="border">0.5像素边框</div>
<style>
    .border {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        position: relative;
    }
    .border::before {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to bottom, transparent 50%, red 50%);
    }
</style>
```

对于需要四边0.5像素边框，可以用以下方式:

```css
定位 + 伪元素 + transfrom缩放（scale）
<div class="border">0.5像素边框~~~~</div>
<style>
    .border {
        width: 200px;
        height: 200px;
        margin: 0 auto;
        position: relative;
    }
    .border::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        border: 1px solid red;
        transform-origin: 0 0;
        transform: scale(0.5);
    }
</style>
```

### 7.说一下BFC

> BFC: block formatting context(块状格式化上下文)
>
> bfc是一个独立的空间，只有块状元素参与， 它规定了里面的块状元素如何布局，它和外部的环境毫不相干

**触发条件**

1. 根元素html本身就是一个BFC
2. float不为none
3. position: absolute或fiexd
4. display为inline-block,table-cell,flex,inline-flex等
5. overflow不为visible

**特点：**

1. bfc区域的元素从上到下一次排列
2. 相邻的上下元素垂直方向的距离由margin控制，具体以margin值大的为准
3. bfc区域里面的元素的margin-left与bfc区域的border-left相接触
4. bfc区域与外界毫不相干
5. bfc区域不会与float元素相重叠
6. 计算bfc区域,浮动元素参与计算

### 8.CSS水平垂直居中的方案

1. 弹性盒

2. 定位

   父元素：position: relative;

   子元素：position: absolute;top: 0;left:0;right:0;bottom:0;magin: auto;

3. 定位+2d变形

   父元素：position: relative;

   子元素：position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);

4. margin-left+margin-top

5. vertical-align+text-align

```css
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .father {
      width: 400px;
      height: 400px;
      background: pink;
      text-align: center;
    }

    .son {
      display: inline-block;
      width: 100px;
      height: 100px;
      vertical-align: middle;
      background: green;
    }

    span {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  </style>
</head>

<body>
  <div class="father">
    <div class="son"></div><span></span>
  </div>
</body>
</html>
```

6. grid

```css
.father {
  display: grid;
  place-items: center;
  width: 400px;
  height: 400px;
  background: pink;
}

.son {
  width: 100px;
  height: 100px;
  background: green;
}
```

### 9.响应式布局方案

1. 媒体查询

2. 百分比布局

   缺点：

   * 计算困难，如果我们要定义一个元素的宽度和高度，按照设计稿，必须换算成百分比单位。

   * 各个属性中如果使用百分比，相对父元素的属性并不是唯一的。比如`width`和`height`相对于父元素的`width`和`height`，而`margin`、`padding`不管垂直还是水平方向都相对比父元素的宽度、`border-radius`则是相对于元素自身等等，造成我们使用百分比单位容易使布局问题变得复杂。

3. rem布局

   缺点：

   在响应式布局中，必须通过js来动态控制根元素`font-size`的大小，也就是说css样式和js代码有一定的耦合性，且必须将改变`font-size`的代码放在`css`样式之前。

4. vw

5. vw+rem

### 10.三栏布局实现方案

- 流体布局
- BFC三栏布局
- 双飞翼布局
- 圣杯布局
- Flex布局
- Table布局
- 绝对定位布局
- 网格布局

https://blog.csdn.net/qq_42445025/article/details/100180930

### 11.重绘与回流

