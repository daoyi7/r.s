## 第二十四课

``this.setState()``

首先看这个充满了``console.log()``的[例子](https://github.com/daoyi7/r/blob/master/src/study/study-24/study-24.js)

有一个react组件叫做``App``,这个组件在由``class``变成组件经过了多个步骤，组件在数据发生变化的时候也有几个步骤，我在每一个步骤中都打印出了它的状态值，用来分析``this.setState()``到底是怎么干活的！

1. 组件最开始，定义了状态值``count``是 0
2. 然后有一个自定事件叫做``clickFn``,这个事件在干嘛呢？没执行一次这个事件，组件的状态值``count``就进行数学运算加一。
3. 接下来开始发生了react事件``componentWillMount``，这个事件让状态值``count``在组件挂载到页面上之前发生了改变，有最初定义的 0 变成了 5。
4. 然后又有一连串的react事件，其中``componentWillReceiveProps``是接受父组件的数据更新，当父组件的数据发生了改变，组件``App``随之改变之前会执行这个方法。
5. 紧接着如果``App``自身的数据发生了改变，那么它听从``shouldComponentUpdate``方法决定自己到底更不更新自己的状态。如果更新继续往下走，否则直接跳到第9步。
6. ``App``在自己更新前那一秒执行``componentWillUpdate``方法。
7. 然后开始用``render``实现组件自身的挂载，并且绑定了一个点击事件``onClick``,这个点击事件是上面定义的``clickFn``。
8. ``componentDidUpdate``方法可以在页面上看到组件更新完以后会是什么样子。
9. 如果数据没有更新的话，那么4-8都是扯淡。

好了有了以上9个步骤的解释，开始运行study-24查看控制台的输出。

在页面一打开的时候，可以看到控制台是这样的：
```
挂载前：0
挂载中：5
挂载完成：5
```
挂在前``count``是 0，因为经过了第三步，所以，挂载中``count``是 5，中间我们没有任何操作，因此挂载完成以后``count``依然是 5


点击组件（组件自身是一个``button``按钮），触发点击事件``clickFn``,同时改变状态值``count``。再次查看控制台输出结果：
```
点击事件发生时：5
决定组件自身是否更新时：5
更新前：5
挂载中：6
更新完：6
```
由输出结果可以看到，在数据更新以后到组件重新挂载到页面之前这一段时间里，``count``一直都是 5 ，并不是在点击事件一结束就立马改变。一直到``render``的时候，``count``才重新变成了我们希望的 6.

这就是``this.setState()``的异步生效。

还记得之前提到过的，在``this.setState()``方法里面的花括号外也可以写函数吗。再试一下这个方法：
```javascript
  clickFn() {
    this.setState({
      count: this.state.count + 1
    }, () => {
      console.log('点击事件发生时2：' + this.state.count)
    })
    console.log('点击事件发生时：' + this.state.count)
  }
```

输出结果是这样的：
```
挂载前：0
挂载中：5
挂载完成：5
点击事件发生时：5
决定组件自身是否更新时：5
更新前：5
挂载中：6
更新完：6
点击事件发生时2：6
```
``点击事件发生时2``竟然在最后才输出出来。

看到这个结果，我当时脑子里想到的是贪吃蛇咬到了自己的尾巴。


总结一下：
>1. ``this.setState()``方法不会立刻改变react组件中状态值，而是到渲染的时候才会改变
> 2. ``this.setState()``方法改变了组件的状态值以后会导致组件的重新渲染，而不是仅仅改变组件的状态值。

---

看看知乎里面的大神如何讲解的[https://zhuanlan.zhihu.com/p/25954470](https://zhuanlan.zhihu.com/p/25954470)
