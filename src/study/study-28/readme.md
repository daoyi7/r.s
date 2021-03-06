## 第二十八课

元素的重排和重绘

- 重排
DOM元素内容有更新，或者DOM发生了增加删减，对于react来说会发生重排。
- 重绘
如果DOM元素只是一些样式方式了简单更改，那就是重绘！


react自身有一个虚拟DOM树的概念，那些组件就是react中的DOM。每一次的更改都会首先影响虚拟DOM发生改变，虚拟DOM的改变后会跟当前页面上真实的DOM（即HTML元素）进行比较，然后让真实DOM发生改变。


举一个没有代码的例子：
```
1. <div className="before"><span>before change</span></div>
2. <div className="after"><p>after change</p></div>
```

上面的例子，假设组件发生变化之前是一个``class``叫``before``的``div``里面包裹一个``span``元素。变化之后``div``的``class``变了，子元素也变了，子元素的内部文字也变了。

分析一下这个过程：
1. 首先判断DOM元素的类型
2. 然后判断DOM元素的属性
3. 最后看元素里面的子元素
4. 循环...


于是按照上面的例子：
- 第一步：react先观察DOM元素的类型有没有发生改变，ok都是``div``那就不变。
- 第二步：观察``div``的属性``class``，好吧，二狗子你变了。
- 第三步：看子元素变没变，我靠变大发了，于是就把``span``直接删掉，把``p``加进来，当然了，这样也就直接把文字也换了。


*什么时候执行：
执行这样的改变操作，一般是两种情况，要么组件自身数据发生了改变``state``，要么父组件传过来``props``让子组件的``state``改变。当组件的``state``发生改变，但还没挂载到组件上的时候，react管这个短时间的``state``叫做``dirty state``*

再一个例子：
```
<ul>
  <li>A</li>
  <li>B</li>
</ul>

```

假如现在我要把这两个``liA``和``liB``变成只有``liB``，一般情况下我们会觉得，直接删掉``liA``就ok了。但是react不是这样的，还是跟上面一样,react先看元素类型，都是``li``,那就不变，只改变里面的文字，于是A变成了B，变完以后，发现没有再需要变的了。于是react就会把原来的``liB``删掉。

这也是为什么``li``的时候特别需要加上``key``属性了。前面提到，``key``在react中是一个永久且唯一的属性值，如果``liA``和``liB``分别带有属性``key='a'``和``key='b'``的话，react发现标签类型没变，于是开始变化``key``的属性，把``key='a'``变成了``key='b'``。此时后面还存在一个原来的``key='b'``，这个时候react就认为这两个相同``key``值的组件是同一个组件，于是只渲染第一个，第二个直接被丢掉。
