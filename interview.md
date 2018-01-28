Symbol
	首先Symbol是为了防止属性名冲突而引入的一种新的数据结构。与undefined、null、String、Number、object、boolean组成ES6的7个基本类型
	1. Symbol不能用new创建。因为Symbol是一种数据类型，不是对象。
	2. 作为属性名的Symbol只能通过[]访问，不可以通过.访问
	3. 作为属性名的Symbol不会出现在for...of，for...in中，也不会被Object.keys()、getOwnPropertyNames()、JSON.stringify()返回
Promise
	用Promise实现异步请求的例子
	return new Promise(function(resolve, reject){
		const xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = handler;
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();
		handler = function() {
			if(this.xhr.readyState === 4 && this.xhr.status >= 200 && this.xhr.status < 300) {
				resolve(this.xhr.response);
			} else{
				reject(new Error(this.statusText));
			}
		}
	});
	Promise.race  const p = Promise.race([p1, p2, p3]);
		只要数组中的promise有一个改变装填，p就改成状态。哪个率先改变状态的promise的返回值传给p的回调函数
	Promise.done
		会捕捉到任何可能的异常，并向全局抛出
事件循环 http://www.ruanyifeng.com/blog/2014/10/event-loop.html
	1. 所有同步任务都在主线程之行，形成一个执行栈
	2. 主线程之外有一个“任务队列”，只要有异步任务有了之行结果，就在任务队列放置一个事件
	3. “执行栈”中的所有任务执行完成之后，系统会读取“任务队列”。那些异步任务结束执行状态，进入执行栈，开始执行
	4. 主线程不断重复上面的三步
	任务队列中除了IO事件以外，还有用户操作(点击、滚动、拖动窗口)，只要指定过回调函数，这些任务都会进入任务队列
	setTimeout只是将事件插入了“任务队列”，只有在当前代码执行完之后才会执行，如果当前执行栈比较耗时，可能没办法保证在setTimeout指定的事件执行他的回调
	JS中有两类任务队列：宏任务队列和微任务队列。宏任务队列可以有多个，微任务队列只有一个
	宏任务：script（全局任务）, setTimeout, setInterval, setImmediate, I/O, UI rendering.
	微任务：process.nextTick, Promise, Object.observer, MutationObserver.
Angular脏检查
	1. Angular不是定期触发脏检查，更不是长连接轮询检查
	2. 一般一个事件循环执行到任务队列时，一般如UI事件、ajax、timeout等触发脏检查
	3. 每一个绑定到UI的数据就会有一个watch对象，所有的watch对象存储在watchList中，一次脏检查就是调用一次apply或者digest，遍历一次watchList
创建函数
	1. 声明函数
		function fn() {}
	2. 创建匿名函数表达，这种方法创建的函数为匿名函数，
		var fn = function() {}
	3. 创建具名函数表达式，这种方法只能在创建函数内部使用fn1
		var fn = function fn1() {}
		var o = {fn: function() {}}
	4. Function构造函数。给Function构造函数产一个函数字符串，返回包含这个字符串命令的函数，创建的也是匿名函数
		Function("alert(1)")
二维码扫描登陆
	浏览器获得一个唯一的、临时的uid，通过长连接等待客户端扫描二维码后，从长连接中获得客户端上报给服务器的账号信息进行展示。并在客户端点击确认后，获得服务器授信的token，进行随后的通信。在超时、网络断开、其他设备登陆后，此前获得的token丢失或失效，对授权过程形成有效的安全防护。
DOM更新原理
	由于DOM操作是一个很耗时的操作，所以有一套解决方案是建立一个Virtual DOM，VDOM其实是一个js对象，而更新VDOM是很快的。然后通过diff算法比较VDOM和DOM的差别再更新DOM。这样的优点是更新了VDOM100次，但是更新DOM只更新了一次。
	Virtual DOM的特点
		1. 包大小变大
		2. 需要在内存中唯一一份DOM的副本。
		3. 越复杂的页面效果越明显
	VDOM是有VNode组成的，Vue的diff算法是只在同级VNode间做diff，递归的进行同级VNode的diff
Vue异步更新DOM	https://www.cnblogs.com/answershuto/p/7588872.html
	只要观察到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作上非常重要。然后在下一个时间循环中，Vue刷新队列并执行DOM更新。




