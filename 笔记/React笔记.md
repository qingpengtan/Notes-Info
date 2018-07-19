props.attr,组件(包含类和方法)内部属性值传递,该属性是只读的，用于子组件接收父组件的值
state组件内部通过state管理状态

####Redux 状态管理
```js

状态提升：组件层级扁平化
发布订阅：业务规模小，层级深
Redux：业务复杂

//1.设置规则
 function counter(state = 0, action){
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

####React Router介绍


