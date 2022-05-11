### 1.什么是虚拟DOM?虚拟DOM有什么优点和缺点？

虚拟DOM：一个能够代表DOM树的对象，通常含有标签名、标签上的属性、事件监听和子元素以及其他属性。

虚拟DOM优点：

1. 能够减少不必要的DOM操作。比如：添加1000个节点，可以将多次操作合并为一个操作。虚拟DOM可以借助DOM diff算法把多余的操作省略掉，比如添加1000个节点，其实只有10个节点需要更新。
2. 能够跨平台渲染

虚拟DOM缺点：

需要额外的创建函数，如createElement或h，但可以通过JSX来简化XML写法

### 2.如何再Vue的单文件组件里的样式定义全局CSS?

在style标签上不加上scoped的属性，默认为全局css样式

### 3.vue-router 3.1.0 `<router-link>`新增的v-slot属性怎么用？

router-link 通过一个作用域插槽暴露底层的定制能力。这是一个更高阶的 API，主要面向库作者，但也可以为开发者提供便利，多数情况用在一个类似 NavLink 这样的自定义组件里。

在使用 v-slot API 时，需要向 router-link 传入一个单独的子元素。否则 router-link 将会把子元素包裹在一个 span 元素内。

### 4.如何实现一个路径渲染多个组件？

可以通过命名视图(router-view)，它容许同一界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。通过设置components即可同时渲染多个组件。

### 5.如何实现多个路径共享一个组件？

只需将多个路径的component字段的值设置为同一个组件即可。

### 6.如何监测动态路由的变化?

可以通过watch方法来对$route进行监听，或者通过导航守卫的钩子函数beforeRouteUpdate来监听它的变化。

### 7.对MVC，MVVM的理解?

mvc和mvvm区别不大。都是一种设计思想，主要是mvc中Controller演变成mvvm中的viewModel。

mvvm主要解决了mvc大量的dom操作使得页面渲染性能降低，影响用户体验，还有就是model频繁发生变化，用户需要手动更新view。

MVVM是Model-View-ViewModel 的缩写，mvvm 是一种设计思想。

1. Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。
2. 在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的， 因此 View 数据的变化会同步到 Model 中，而 Model 数据的变化也会立即反应到 View 上。
3. ViewModel 通过双向数据绑定把 View 层和 Model 层连接了起来，而 View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理。

### 8.你知道Vue响应式数据原理吗？Proxy 与 Object.defineProperty 优劣对比？

Vue2.x响应数据原理：

**vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调，来更新视图。**

整体思路:

核心：通过Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的。
要实现mvvm的双向绑定，就必须要实现以下几点：

1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者。
2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。
3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图。
4、mvvm入口函数，整合以上三者。

![avatar](webp)

但在vue3中抛弃了object.defineproperty方法，因为

1. Object.defineproperty无法监测**对象属性的添加和删除**、**数组索引和长度的变更**，因此vue重写了数组的push/pop/shift/unshift/splice/sort/reverse方法

2. Object.defineProperty只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，这样很消耗性能

vue3中实现数据双向绑定的原理是数据代理，使用**proxy**实现。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。

proxy的优势如下：

1. Proxy 可以直接监听对象而非属性，可以直接监听数组的变化。
2. Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的。
3. Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改。


Object.defineProperty 的优势如下:

兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill(垫片)来弥补。

### 9.Composition API 的出现带来哪些新的开发体验，为啥需要这个？

1. 在Compostion API 中是根据逻辑相关来组织代码的，可以提高可读性和可维护性，类似于react的hook写法。
2. 更好的重用逻辑代码，在Options API中通过Mixins重用逻辑代码，容易发生命名冲突且关系不清。
3. 解决在生命周期函数经常包含不相关的逻辑，但又不得不把相关逻辑分离到了几个不同方法中的问题，如在mounted中设置定时器，但需要在destroyed中来清除定时器，将同一功能的代码拆分到不同的位置，造成后期代码维护的困难。

### 10.什么情况下使用 Vuex？

如果应用够简单，最好不用，一个简单的store模式即可。如果需要构建中大型单页面应用时，使用Vuex能更好地在组件外部管理状态。

### 11.Vuex可以直接修改state值吗？

可以直接修改，但是极其不推荐，state的修改必须在mutation修改，否则无法被devtools所监测，无法监测数据的来源，无法保存状态快照，也就无法实现时间旅行回滚等操作。

### 12.为什么Vuex的mutation不能做异步操作?

Vuex中所有的状态更新唯一途径都是通过提交mutation，异步action来提交mutation,是为了我们可以更好更方便追踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好的了解我们的应用。每个mutation执行完成后都会对应一个新的状态更改，这样devtools就可以打个快照存下来，否则无法被devtools所监测。如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法更好地进行状态的追踪，给调试带来困难。

### 13.v-model和Vuex有冲突吗？

Vuex是单向数据流的，v-model是双向数据绑定，是一个v-bind+v-on语法糖，两者是不同维度的概念。在严格模式中使用Vuex时，在属于Vuex的state上使用v-model会导致出错。

### 14.解释单向数据流和双向数据绑定

对于Vue来说，组件之间的数据传递具有单向数据流。

单向数据流指的是数据只能从一个方向来修改状态，从而更新数据。

双向数据绑定是当数据发生改变的时候，视图也会发生改变，当视图发生改变的时候，数据也会随之同步改变，两个数据流相互影响。

### 15.Vue 如何去除url中的 `#`

将路由模式改为history

### 16.vue-router 路由实现原理？

首先vue-router实现了**在无需刷新页面的情况下更新视图**

在浏览器环境下有两种方式实现，一种是**HTML5History**，另一种是**HashHistory**

**1.hash模式，主要是hashHistory**

原理：

* hash路由在url上带有#符号，它本来的作用是加在url中指示网页中的位置
* hash虽然出现在url上，但是不会被包括在http请求中。它是用来指导浏览器动作的，对服务端完全无用，因此改变hash不会重新刷新页面
* 每一次改变hash（window.location.hash），都会在浏览器的访问历史中添加一个记录
* 改变hash，我们可以通过监听hashchange事件来实现路由的跳转，而不刷新页面

**2.history模式，主要利用HTML5History**

原理：

* 利用这个HTML5History来操作浏览器历史记录栈
* 主要方法有back(),forword(),go()来读取浏览器路由历史并控制跳转
* HTML5新增pushState(),replaceState()2个方法来修改历史记录，调用这两个方法修改历史信息后，虽然当前URL改变了，但是浏览器不会立即发送请求该URL,这就满足了单页面应用**“更新视图但不重新请求页面”**的需求
* 修改浏览器历史记录会触发popstate事件，我们可以通过监听popstate事件来实现路由跳转

### 17.$route 和 $router 的区别

$route用来获取路由的信息的，它是路由信息的一个对象，里面包含路由的一些基本信息，包括name、meta、path、hash、query、params、fullPath、matched、redirectedFrom等。

$router主要是用来操作路由的，它是VueRouter的实例，包含了一些路由的跳转方法，钩子函数等

### 18.jQuery，Vue 有什么不同?

jQuery 专注视图层，通过直接操作 DOM 去实现页面的一些逻辑渲染；Vue 专注于数据层，通过数据的双向绑定，最终表现在 DOM 层面，减少了 DOM 操作。Vue 使用了组件化思想，使得项目子集职责清晰，提高了开发效率，方便重复利用，便于协同开发

### 20.Vue 中怎么自定义指令？

通过directive来自定义指令，自定义指令分为全局指令和局部指令，自定义指令也有几个的钩子函数，常用的有bind和update，当 bind 和 update 时触发相同行为，而不关心其它的钩子时可以简写。

### 21. Vue 单页面应用的优缺点

优点：

1. 单页应用的内容改变不需要重新加载整个页面，web应用更具响应式，用户体验好。
2. 单页应用没有页面之间的切换，就不会出现”白屏现象“，也不会出现假死并”闪烁“现象。
3. 单页应用相对服务器压力小，服务器只需要提供数据接口即可。

缺点：

1. 首次加载耗时比较多
2. SEO问题，不利于搜索引擎收录

### 22.Vue-router 使用params与query传参有什么区别？

1. query要path来引入，params要使用name来引入，接受参数都是类似的，分别是this.$route.query.name和this.$route.params.name
2. query更加类似我们ajax的get传参，params则类似于post，前者需要在浏览器地址栏中显示参数，后者不显示
3. params是路由的一部分，必须要有。query是拼接在url后面的参数，没有也没有关系
4. params、query不设置也可以传参，params不设置的时候，刷新页面或者返回参数会丢失

### 23.Vue中 keep-alive 的作用

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。一旦使用keepalive包裹组件，此时mouted，created等钩子函数只会在第一次进入组件时调用，当再次切换回来时将不会调用。此时如果我们还想在每次切换时做一些事情，就需要用到另外的周期函数，actived和deactived，这两个钩子函数只有被keepalive包裹后才会调用。

### 24.Vue如何实现单页面应用

通常的url 地址由以下内容构成：协议名 域名 端口号 路径 参数 哈希值，当哈希值改变，页面不会发生跳转，单页面应用就是利用了这一点，给window注册onhashchange事件，当哈希值改变时通过location.hash就能获得相应的哈希值，然后就能跳到相应的页面。

### 25.说明一下封装vue组件的原则和方法

封装出来的组件必须具有高性能，低耦合的特性，主要从以下几点入手：

1. 数据从父组件传入

   子组件本身不要生成数据，如果需要生成数据，只能在组件内部进行使用，不要传递出去。

2. 在父组件中处理事件

​		父组件中处理的事件是和后端交互的事件，比如发起的axios的请求，但并不是所有的事件都放到父组件中处		理，比如组件内部的一些交互行为，或者处理的数据只在组件内部传递，就可以在子组件中处理。

3. 记得留一个slot

​		一个通用的组件，往往不能完美的适应所有的应用场景，所以在封装组件的时候，只需要完成组件的80%的		功能，剩下的20%让父组件通过slot解决。

4. 不要依赖vuex

​		如果要抽离组件尽量不要使用vuex来实现参数的传递，因为vuex是用来管理组件状态的，虽然可以用来传		参，但是不推荐，可以选择放到localstorage中，或者通过props传递等方式。

5. 合理使用scoped

​		样式中添加scoped可以让样式只对当前组件生效，但是一味使用scoped，会产生重复代码，所以需要有一个		全局的样式，组件内只写针对于组件的样式，避免重复的样式代码。

6. 组件具有单一职责

​		封装业务组件或者基础组件，如果不能给这个组件起一个有意义的名字，证明这个组件承担的职责可能不够		单一，需要继续抽组件，直到它可以是一个独立的组件即可。

### 26.说出至少4种Vue当中的指令和它的用法？

1. v-if(判断是否隐藏，用来判断元素是否创建)
2. v-show(元素的显示隐藏，类似css中的display的block和hidden)
3. v-for(把数据遍历出来)
4. v-bind(绑定属性)
5. v-model(实现双向绑定)

### 27.Vuex是什么？

Vuex是Vue的一个状态管理模式，可以简单的将其看成是需要把多个组件共享的变量全部存储到一个state对象里面，然后这个对象放在顶层vue实例中，让其他组件可以使用。

Vuex有五个核心概念：

1. state: vuex的基本数据，用来存储变量

2. getter: vuex的计算属性，用来计算state

3. mutation: 提交更新数据的方法，必须是同步的(如果需要异步使用action)。每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)。回调函数就是我们实际进行状态更改的地方，并且它会接受state作为第一个参数，提交载荷作为第二个参数。

4. action：和mutation的功能大致相同，不同之处在于

   1.Action提交的是mutation，而不是直接变更状态。

   2.Action可以包含任意异步操作。

5. modules：模块化vuex，可以让每一个模块拥有自己的state、getters、mutation、action,使得结构非常清晰，方便管理。

### 28.Vue-loader解释一下

解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。

### 29. 用过插槽吗？用的是具名插槽还是匿名插槽

用过，都使用过。插槽相当于预留了一个位置，可以将我们书写在组件内的内容放入，写一个插槽就会将组件内的内容替换一次，两次则替换两次。为了自定义插槽的位置我们可以给插槽取名，它会根据插槽名来插入内容，一一对应。

### 30.Vue3中的双向数据绑定proxy

Proxy相当于在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写,我们可以这样认为,Proxy是Object.defineProperty的全方位加强版，它解决了之前defineProperty无法监听到数组变化等缺点。

### 31.Vue和React中diff算法区别？

vue和react的diff算法，都是忽略跨级比较，只做同级比较。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。

1. vue对比节点，当节点元素相同，但是classname不同，认为是不同类型的元素，删除重建，而react认为是同类型节点，只是修改节点属性。

2. vue的列表对比，采用的是两端到中间比对的方式，而react采用的是从左到右依次对比的方式。当一个集合只是把最后一个节点移到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移到第一个。总体上，vue的方式比较高效。

### 32.请你说一下 Vue 中 created 和 mounted 的区别？

created为组件初始化阶段，在此阶段主要是完成vue初始化和数据观测以及watch/event 事件回调。然而此时，挂载阶段还没有开始，此时还未生成真实的DOM，无法获取和操作DOM元素。而mount主要完成从虚拟DOM到真实DOM的转换挂载，此时html已经渲染出来了，所以可以直接操作DOM节点。

### 33.Object.defineProperty有什么缺点?

1. 它无法观测到数组下标的变化，导致通过数组下标去添加元素，不能实时响应。
2. 只能劫持对象的属性，从而需要遍历对象的所有属性，如果属性值是对象，则需要深度遍历。

### 34.axios是什么？怎么使用？描述使用它实现登录功能的流程?

axios 是请求后台资源的模块。 通过npm install axios -S来安装，在大多数情况下我们需要封装拦截器，在实现登录的过程中我们一般在请求拦截器中来加入token，在响应请求器中通过判断后端返回的状态码来对返回的数据进行不同的处理。如果发送的是跨域请求，需在配置文件中进行代理配置。

### 35.computed和watcher的区别？watch实现原理？watch有几种写法？

计算属性computed : 

1. 支持缓存，只要依赖数据发生改变，才会重新进行计算
2. 不支持异步，当computed内部有异步操作，无法监听到数据的变化
3. computed属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值
4. 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

侦听属性watch：

1. watch不支持缓存，数据变化，会直接触发响应操作
2. watch支持异步
3. 监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；
4. 监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，immediate：组件加载立即触发回调函数执行，deep: 深度监听，为了发现对象内部值的变化，复杂类型的数据时使用，例如数组中的对象内容的改变，注意监听数组的变动不需要这么做。注意：deep无法监听到数组的变动和对象的新增，参考vue数组变异,只有以响应式的方式触发才会被监听到。

watch工作原理:

watch在一开始初始化的时候，会读取一遍监听的数据的值，此时那个数据就收集到watch的watcher了然后你给watch设置的handler，watch 会放入watcher的更新函数中，当数据改变时，通知watch的watcher进行更新，于是你设置的handler就被调用了。

### 36.Vue和React区别?

共同点：

1. 数据驱动视图
2. 组件化
3. 虚拟DOM

不同点：

1. **核心思想不一样**。Vue是灵活易用的渐进式框架，进行数据拦截/代理，它对侦测的数据的变化更加敏感、更准确。React推崇函数式编程（纯组件）数据不可变以及单向数据流,当然需要双向的地方也可以手动实现， 比如借助`onChange`和`setState`来实现。
2. **组件写法差异**。React推荐的做法是JSX + inline style, 也就是把 HTML 和 CSS 全都写进 JavaScript 中,即 all in js; Vue 推荐的做法是 template 的单文件组件格式(简单易懂，从传统前端转过来易于理解),即 html,css,JS 写在同一个文件(vue也支持JSX写法)这个差异一定程度上也是由于二者核心思想不同而导致的。

3. **diff算法不同**

4. **响应式原理不同**

5. Vue为了简单易用，引入了指令、filter等概念以及大量的optionAPI，比如watch、computed等，而React的API较少，但是如果js基础较好，上手也是很容易。

### 37.Vue路由传参，刷新后还有吗?

通过params传参会出现参数丢失的情况，可以通过query的传参方式或者在路由匹配规则加入占位符即可以解决参数丢失的情况。

### 38.为什么要设置key值，可以用index吗？为什么不能？

vue中列表循环需加:key="唯一标识", 唯一标识可以是item里面id或index等，因为vue组件高度复用，增加Key可以标识组件的唯一性，为了更好地区别各个组件， key的作用**主要是为了高效的更新虚拟DOM**。

### 39.diff复杂度原理及具体过程

diff算法是一种通过同层的树节点进行比较的高效算法，避免了对树进行逐层搜索遍历，所以时间复杂度只有 O(n)。

diff算法有两个比较显著的特点：

1. 只会同层级比较, 不会跨层级比较。

2. 在diff比较的过程中，循环从两边向中间收拢。

diff流程： 首先定义 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 分别是新老两个 VNode 的两边的索引。

接下来是一个 while 循环，在这过程中，oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 会逐渐向中间靠拢。while 循环的退出条件是直到老节点或者新节点的开始位置大于结束位置。

### 40.Vue组件中的Data为什么是函数，根组件却是对象呢？

如果data是一个函数的话，这样每复用一次组件，就会返回一份新的data，它们有自己的私有数据，可以让各个组件去维护自己的数据。而单纯的写成对象的形式，会使得组件共享一份数据，会造成干扰，不利于维护。所以vue组件的data必须是函数，这是因为js的特性所带来的，跟vue本身设计无关。

### 41.你做过哪些Vue的性能优化？

1. 首屏加载优化

2. 路由懒加载

3. 开启服务器 Gzip

   开启 Gzip 就是一种压缩技术，需要前端提供压缩包，然后在服务器开启压缩，文件在服务器压缩后传给浏览器，浏览器解压后进行再进行解析。首先安装 webpack 提供的`compression-webpack-plugin`进行压缩,然后在 vue.config.js：

   ```javascript
   const CompressionWebpackPlugin = require('compression-webpack-plugin')
   const productionGzipExtensions = ['js', 'css']......plugins: [      
     new CompressionWebpackPlugin(
       {        
         algorithm: 'gzip',        
         test:     new RegExp('\\.(' + productionGzipExtensions.join('|') +                 ')$'),            
         threshold: 10240,        
         minRatio: 0.8      
          }
   )]....
   ```

4. CDN 加速

​		我们继续采用 cdn 的方式来引入一些第三方资源，就可以缓解我们服务器的压力，原理是将我们的压力分给		其他服务器点。

5. 代码层面优化

   * computed 和 watch 区分使用场景

     computed：是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。当我们需要进行数值计算，并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时，都要重新计算；
     watch：类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；当我们需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许我们执行异步操作 ( 访问一个 API )，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

   * v-if 和 v-show 区分使用场景

      v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景。这里要说的优化点在于减少页面中 dom 总数，我比较倾向于使用 v-if，因为减少了 dom 数量。

   - v-for 遍历必须为 item 添加 key，且避免同时使用 v-if v-for 

     遍历必须为 item 添加 key，循环调用子组件时添加 key，key 可以唯一标识一个循环个体，可以使用例如 item.id 作为 key 避免同时使用 v-if，v-for 比 v-if 优先级高，如果每一次都需要遍历整个数组，将会影响速度。

6. Webpack 对图片进行压缩
7. 避免内存泄漏
8. 减少 ES6 转为 ES5 的冗余代码

### 42.nextTick知道吗、实现的原理是什么？是宏任务还是微任务？

nextTick是一个微任务

原理：

nextTick方法主要是使用了宏任务和微任务，定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空队列。

作用：

nextTick用于下次Dom更新循环结束之后执行延迟回调，可以在回调中获取更新后的DOM。

### 43.介绍下vue单页面和多页面应用的区别？

单页应用 页面跳转通过js渲染 优点：页面切换快 缺点：首屏加载稍慢，seo差

多页应用 页面跳转是返回html 优点：首屏时间快，seo效果好 缺点：页面切换慢，用户体验没那么好

### 44.vue父子组件生命周期执行顺序是什么？

执行顺序：父组件创建，然后子组件创建；子组件先挂载，然后父组件挂载。即“父beforeCreate-> 父create -> 子beforeCreate-> 子created -> 子mounted -> 父mounted”。

### 45.虚拟 dom 为什么会提高性能？

虚拟DOM其实就是一个JavaScript对象。通过这个JavaScript对象来描述真实DOM，真实DOM的操作，一般都会对某块元素的整体重新渲染，采用虚拟DOM的话，当数据变化的时候，只需要局部刷新变化的位置就好了 ,虚拟`dom`相当于在`js`和真实`dom`中间加了一个缓存，利用`dom diff`算法避免了没有必要的`dom`操作，从而提高性能。

**具体实现步骤如下：**

- 用 `JavaScript` 对象结构表示 `DOM` 树的结构；然后用这个树构建一个真正的 `DOM` 树，插到文档当中
- 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
- 把2所记录的差异应用到步骤1所构建的真正的`DOM`树上，视图就更新

### 46.Vue 的 computed 的原理

https://www.cnblogs.com/wilsunson/p/15512008.html

### 47.Vue 中 v-on 可以绑定多个方法吗？

可以的

```javascript
<p v-on="{click:dbClick,mousemove:MouseClick}"></p>
```

### 48.Vue中子组件是否可以修改props，如果想修改的话如何修改?

vue是单向数据流，父组件通过props传值给子组件，如果在子组件中修改会报错，一般是不在子组件中修改props的，但偶尔有需要在子组件有修改props,这里介绍三种可以修改子组件props的方法。

1. 修改父组件普通数据

​		使用v-mode语法，代替了vue2.x的.[sync](https://so.csdn.net/so/search?q=sync&spm=1001.2101.3001.7020)修饰符

* 父组件用ref() 定义一个普通数据为响应式变量，例 var test = ref(‘parent’)
* 父组件用v-mode将数据绑定到子组件上

```javascript
   <ChildComponent v-model:test="test" />
```

* 子组件使用emit修改父组件数据

```javascript
//ChildComponent 
 	props: {
    test:String     //接收父组件数据
  },
  emits: ['update:test'],      //定义组件可触发的事件
  setup(props,ctx){
    function onClick() {
      ctx.emit('update:test','child')
    }
  }

```

2. 使用.sync修饰符

```javascript
// 父元素
<PropsChild v-bind:content.sync="parentContent"></PropsChild>

// 子元素
<template>
  <div>
  	<button @click="btnTest">我是子组件,{{ lasterContent }}</button>
  </div>
</template>
<script>
export default {
 	 data() {
     return {
       lasterContent: this.content
     }
   },
	 props:{
     content:{
       type:String
     }
   },
   watch: {
     content(val) {
       this.lasterContent = val;
     }
   },
   methods: {
     btnTest() {
       this.lasterContent = '哈哈，在子组件中改变了父组件传递过来的数据';
       this.$emit('update:content','test')
     }
   }
}  
</script>
注意点：
在父组件中需要用到 v-bind 和 .sync
1、在子组件中需要定义一个变量，接收父组件传递过来的值
2、使用watch监听父组件传递过来的值，使中间变量与父组件传递过来的值保持一致
3、子组件中需要使用this.$emit('update:xxx',要修改的值); 触发父组件中数据更新
```

### 49.说一下Vue-router守卫有哪些?

* Router.beforeEach 全局前置守卫，进入路由之前
* Router.beforeResolve 全局解析守卫（2.5.0+）在beforeRouterEnter调用之后调用
* Router.afterEach 全局后置钩子 进入路由之后

### 50.什么是 Vue.js 动态组件与异步组件？

动态组件：

* 让多个组件使用同一个挂载点，并且组件间可以动态切换，这个挂载点就是component标签
* 简单来说是在 component 标签上添加一个is属性，属性值（即currentTabComponent）是控制组件间的切换的

![](https://img-blog.csdnimg.cn/20210408134742317.png)

* 动态组件常和keep-alive一起使用，组件切换的时候，可以将组件的状态保存在内存中，避免重复渲染，减少加载时间及性能消耗，提高用户的体验

异步组件：

* vue的一种性能优化的方法，可以实现组件的按需加载

* 组件通过import函数引用，什么时候需要什么时候加载

![](https://img-blog.csdnimg.cn/20210409091250152.png)

作用：

- 有利于项目的性能优化，提高页面的加载速度
- 路由懒加载就是使用了异步组件的原理

### 51.Vuex刷新页面数据会丢失吗？咋解决的？

页面刷新的时候vuex里的数据会重新初始化，导致数据丢失。因为vuex里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载vue实例，vuex里面的数据就会被重新赋值。

解决办法：

1. 将vuex中的数据直接保存到浏览器缓存中（sessionStorage、localStorage、cookie） 

2. 监听页面刷新，再次请求远程数据，根据数据请求结果动态更新vuex数据

### 52.简述Vue每个生命周期具体适合哪些场景？

| **生命周期**  | **发生了什么**                                               |
| ------------- | ------------------------------------------------------------ |
| beforeCreate  | 初始化页面前 : 在当前阶段data、methods、computed以及watch上的数据和方法都不能被访问，都还没有完成vue初始化。 |
| created       | 初始化页面后 : 在实例创建完成后发生，当前阶段已经完成了数据观测，也就是可以使用数据，更改数据，在这里更改数据不会触发updated函数,也就是不会更新视图。实例的data数据和methods方法都已经被初始化完毕了，可以正常访问 |
| beforeMount   | 挂载前 ：完成模板编译，虚拟Dom已经创建完成，即将开始渲染。在此时也可以对数据进行更改，不会触发updated。数据还没有更新到页面上去。当编译完成之后，只是在内存中已经有了编译好的页面，但并未渲染。 |
| mounted       | 挂载完成 ： 将编译好的模板挂载到页面 (虚拟DOM挂载) ，可以在这进行异步请求以及DOM节点的访问，在vue用$ref操作 |
| beforeUpdate  | 更新数据前 ： 组件数据更新之前调用，数据都是新的,页面上数据都是旧的。将要根据最新的data数据，重新解析所有指令，从而重新渲染浏览器页面。 |
| updated       | 组件更新后 ： render重新渲染 , 此时数据和界面都是新的 ,要注意的是避免在此期间更改数据，因为这可能会导致无限循环的更新 |
| beforeDestroy | 组件卸载前 : 实例销毁之前，在当前阶段实例完全可以被使用，我们可以在这时进行善后收尾工作，比如清除计时器 |
| destroyed     | 组件卸载后 ： 组件已被拆解，数据绑定被卸除，监听被移出，子实例也统统被销毁。 |
| activited     | keep-alive 专属 , 组件被激活时调用                           |
| deactivated   | keep-alive 专属 , 组件被销毁时调用                           |

### 53.谈谈你对Vue3.0的了解？

**一、六大亮点**

1. 性能比Vue2.x快1.2~2倍
2. 按需编译，体积比Vue2.x更小
3. 支持Compostion API
4. 更好的支持TS
5. 更先进的组件(Fragment)

**二、性能比vue2.x快1.2~2倍如何实现的呢？**

1. diff算法更快

   vue2.0是需要全局去比较每个节点的，若发现有节点发生变化后，就去更新该节点。vue3.0是在创建虚拟dom中，会根据DOM的的内容会不会发生内容变化，添加静态标记， 谁有flag！比较谁缺快速。

2. 静态提升

   vue2中无论元素是否参与更新，每次都会重新创建，然后再渲染。 vue3中对于不参与更新的元素，会做静态提升，只被创建一次，在渲染时直接复用即可

3. 事件侦听缓存

   默认情况下，onclick为动态绑定，所以每次都会追踪它的变化，但是因为是同一函数，没有必要追踪变化，直接缓存复用即可。在之前会添加静态标记 8 会把点击事件当做动态属性 会进行diff算法比较， 但是在事件监听缓存之后就没有静态标记了，就会进行缓存复用

**三、为什么vue3.0体积比vue2.x小？**

在vue3.0中创建vue项目 除了vue-cli，webpack外还有 一种创建方法是Vite Vite是作者开发的一款有意取代webpack的工具，其实现原理是利用ES6的import会发送请求去加载文件的特性，拦截这些请求，做一些预编译，省去webpack冗长的打包时间。

**四、vue3.0组合API**

说一说vue3.0的组合API跟之前vue2.0在完成业务逻辑上的区别：

在vue2.0中： 主要是往data 和method里面添加内容，一个业务逻辑需要什么data和method就往里面添加，而组合API就是有一个自己的方法，里面有自己专注的data和method，可以降低耦合，提高维护性。

再说一下组合API的本质是什么：

首先composition API（组合API） 和 Option API（vue2.0中的data和method）可以共用 composition API（组合API）本质就是把内容添加到Option API中进行使用。

**五、ref和reactive的简单理解**

1. ref和reactive都是vue3监听数据的方法，本质是proxy
2. ref基本类型和复杂类型都可以进行监听（一般我们使用ref监听基本数据类型），reactive用来监听对象、数组等复杂数据类型
3. ref底层还是reactive

**六、对生命周期的监听（ref获取属性）**

在vue2.x中，我们这样使用ref获取属性

```javascript
<div ref='box'></div>
this.$refs.box 这样获取
```

在vue3中 我们也可以通过ref获取属性，但是使用方法有所不同

```javascript
<div ref="box">123</div>
import {ref,onMounted} from 'vue'

export default{
  setup(){
    let box = ref(null);//本质是reactive({value:null})

    onMounted(()=>{
      console.log('onmounted',box.value);
    })

    console.log(box.value);
    return {box}
  }
}

// setup入口函数是在beforeCreate生命周期函数之前执行的，比mounted生命周期要早执行
```

**七、Proxy响应式本质**

https://blog.csdn.net/pagnzong/article/details/120389514

### 54.Vue如何在用户没登陆的时候重定向登录界面？

现在 我们需要实现这样 一个功能，登录拦截，其实就是路由拦截，首先在定义路由的时候就需要多添加一个自定义字段requireAuth，用于判断该路由的访问是否需要登录。如果用户已经登录，则顺利进入路由， 否则就进入登录页面。在路由管理页面添加meta字段

```javascript
{
  path:'/manage',
  name:'manage',
  component:manage,
  meta:{requireAuth:true}
}
```

在入口文件中，添加路由守卫

1. 先判断该路由是否需要登录权限

2. 判断本地是否存在token，如果存在token就next()，不存在token重定向到登录页

### 55.Vuex和redux有什么区别？他们的共同思想。

### 56.Vue组件间通信方式有哪些？

组件间通信的分类有：

* 父子组件之间的通信
* 兄弟组件之间的通信
* 祖孙与后代组件之间的通信
* 非关系组件间之间的通信

组件间通信的方案：

1. 通过 props 传递
2. 通过 $emit 触发自定义事件 
3. 使用 ref
4. EventBus
5. $parent 或$root
6. attrs 与 listeners
7. Provide 与 Inject
8. Vuex

https://app.yinxiang.com/fx/e01d1356-65a5-45ec-9629-98a38436d911

**小结**

- 父子关系的组件数据传递选择 props  与 $emit进行传递，也可选择ref 
- 兄弟关系的组件数据传递可选择$bus，其次可以选择$parent进行传递
- 祖先与后代组件数据传递可选择attrs与listeners或者 Provide与 Inject 
- 复杂关系的组件数据传递可以通过vuex存放共享的变量

### 57.首屏加载优化方案

1. 路由懒加载
2. 开启GZip压缩
3. 静态资源localStorage本地缓存
4. UI框架组件按需加载
5. 图片资源压缩
6. 使用SSR服务端渲染
7. 图片懒加载

### 58.Vue常用的修饰符有哪些有什么应用场景

https://app.yinxiang.com/fx/1fe0d770-4de0-4d88-b2bc-c768cdd386db

### 59.说下你的vue项目的目录结构，如果是大型项目你该怎么划分结构和划分组件呢？

https://app.yinxiang.com/fx/a5621cf8-17eb-44a5-8015-a07766febf97

### 60.Vue项目中你是如何解决跨域的呢？

1. 后端cors
2. Proxy
3. 通过配置nginx实现代理,通过配置nginx实现代理

### 61.hash和history有什么区别？

`hash` 模式是一种把前端路由的路径用井号 `#` 拼接在真实 `url` 后面的模式。当井号 `#` 后面的路径发生变化时，浏览器并不会重新发起请求，而是会触发 `onhashchange` 事件。

**hash特点：**

* hash变化会触发网页跳转，即浏览器的前进和后退。
* `hash` 可以改变 `url` ，但是不会触发页面重新加载（hash的改变是记录在 `window.history` 中），即不会刷新页面。也就是说，所有页面的跳转都是在客户端进行操作。因此，这并不算是一次 `http` 请求，所以这种模式不利于 `SEO` 优化。`hash` 只能修改 `#` 后面的部分，所以只能跳转到与当前 `url` 同文档的 `url` 。
* `hash` 通过 `window.onhashchange` 的方式，来监听 `hash` 的改变，借此实现无刷新跳转的功能。
* `hash` 永远不会提交到 `server` 端（可以理解为只在前端自生自灭）。

`history API` 是 `H5` 提供的新特性，允许开发者**直接更改前端路由**，即更新浏览器 `URL` 地址而**不重新发起请求**。

**history特点：**

- 通过 `history.state` ，添加任意类型的数据到记录中。
- 通过 `pushState` 、 `replaceState` 来实现无刷新跳转的功能。

使用 `history` 模式时，在对当前的页面进行刷新时，此时浏览器会重新发起请求。如果 `nginx` 没有匹配得到当前的 `url` ，就会出现 `404` 的页面。因此，在使用 `history` 模式时，需要**通过服务端来配合**，如果没有设置，就很容易导致出现 `404` 的局面。

### 62.vue项目中常用的性能优化方式有哪些?

1. keep-alive
2. 路由懒加载
3. 图片懒加载
4. 合理使用v-if和v-show
5. 合理使用computed 和 watch 
6. v-for必须为item设置key,同时避免和v-if一起使用
7. 事件和定时器及时销毁
8. 第三方插件按需引入
9. 优化无限列表性能
10. 服务端SSR渲染
11. Webpack 对图片进行压缩
12. 开启 gzip 压缩
13. 合理使用浏览器缓存
14. 插件cdn加速

### 63.插槽是什么？怎么使用的？

插槽就是子组件给父组件使用的一个占位符，用<slot><slot/>表示，父组件可以在这个占位符添加任何末班代码，如html、组件等，填充的内容会替换子组件的slot标签。

插槽又分为以下三种：

1. 普通插槽

2. 具名插槽

   <div id="app">
       <my-button> 
           <template v-slot:header><h3>This is header</h3></template>
           <template v-slot:main><h3>This is header</h3></template>
           <template #footer> <h3>This is header</h3></template> 
       </my-button>  
   </div>
   <template id="myButton">
       <div>
           <slot name="header"></slot>
           <slot name="footer"></slot>
           <slot name="c"></slot>
       </div> 
   </template>

3. 作用域插槽

​		作用域插槽的样式由父组件决定，内容却由子组件控制。前两种插槽不能绑定数据，作用域插槽是一个带绑定数据的插槽。父组件可以根据子组件传过来的插槽数据来进行不同的方式展现和填充插槽的内容。

### 64.自定义指令你是怎么用的?

### 65.diff算法是什么  ：key = index 为什么不常用数组的下标作为index  加了它有什么好处？

diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点不同的地方，最后用patch记录消息去局部更新dom。

diff算法有两个优点：

1. 比较只会同层进行比较，不会做跨级比较
2. 在diff比较的过程中，循环从两边向中间收拢比较

 diff算法的步骤
用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文 档当中
当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较(diff)，记录两棵树差异
把第二棵树所记录的差异应用到第一棵树所构建的真正的DOM树上(patch)，视图就更新了

### 66.虚拟列表你是怎么实现的?

总结：滚动事件监听，计算每个item高度， 计算滚动的距离， 计算start end ，做数据截取，展示截取后的数据， 同时做样式绝对定位就可以 （top值就可以改变处于的高度）

### 67.Vue的父子组件生命周期钩子函数执行顺序？

```js
<!-- 加载渲染过程 -->
<!-- 父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created ->
子beforeMount -> 子mounted -> 父mounted -->
<!-- 子组件更新过程 -->
<!-- 父beforeUpdate -> 子beforeUpdate -> 子updaed -> 父updated -->
<!-- 父组件跟新过程 -->
<!-- 父beforeUpdate -> 父updated -->
<!-- 销毁过程 -->
<!-- 父beforeDestroy -> 子beforeDestroy -> 子destroyed ->父destroyed -->
```
