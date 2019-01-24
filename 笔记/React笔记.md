props.attr,组件(包含类和方法)内部属性值传递,该属性是只读的，用于子组件接收父组件的值
组件内部通过state管理状态，state不能直接修改，必须通过setState（这是一个异步函数）修改

##虚拟DOM
当props和state数据改变时，render函数会被重新执行

虚拟Dom就是一个js对象，每个标签都会被标记成一个数组
每次数据改变的时候会将新的虚拟Dom和原始Dom通过diff算法进行比较差异(每个节点都有一个key值，通过key值进行比较，key值可以重复)，如此提升性能。
同时虚拟Dom也很好提供了跨平台操作。

####Redux 状态管理
```js

状态提升：组件层级扁平化
发布订阅：业务规模小，层级深
Redux：业务复杂

//1.设置规则（reducer / action）
 function counter(state, action){
	switch(action.type){
		case "xxxx":
			//这里面是不能改变state的值
			return state;
		case "xxxx":

		......

		default:
			return state;
	}
}

//2.根据规则生成store
let store = createStore(counter)

//3.给定数据触发规则
store.dispath({type:"xxxx"});//参数对应的是规则的action

//4.得到数据变化后的state
store.subscribe(() ==> {
	console.log(store.getState())
})

```
### 高级使用
使用Redux-thunk 可在action中使用异步操作

React-redux使用
Provider connect


####React Router介绍


