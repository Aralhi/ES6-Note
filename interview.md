Symbol
	首先Symbol是为了防止属性名冲突而引入的一种新的数据结构。与undefined、null、String、Number、object、boolean组成ES6的7个基本类型
	1. Symbol不能用new创建。因为Symbol是一种数据类型，不是对象。
	2. 作为属性名的Symbol只能通过[]访问，不可以通过.访问
	3. 作为属性名的ƒSymbol不会出现在for...of，for...in中，也不会被Object.keys()、getOwnPropertyNames()、JSON.stringify()返回
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
ETag http://blog.csdn.net/kikikind/article/details/6266101
js属性和方法	https://www.cnblogs.com/lgmcolin/archive/2013/02/04/2891575.html
	【私有变量】 在对象内部使用'var'关键字来声明，而且它只能被私有函数和特权方法访问。 
	【私有方法】 在对象的构造函数里声明（或者是通过varfunctionName=function(){...}来定义），
		它能被特权方法调用（包括对象的构造方法）和私有方法调用,私有函数只能访问私有的方法和属性。 
	【特权方法】通过this.methodName=function(){...}来声明而且可能被对象外部的代码调用。
		它可以使用：this.特权函数() 方式来调用特权函数，使用 ：私有函数()方式来调用私有函数。
	【公共属性】 通过this.variableName来定义而且在对象外部是可以读写的。不能被私有函数所调用。 
	【公共方法】 通过ClassName.prototype.methodName=function(){...}来定义可以从对象外部来调用。 
	【原型属性】 通过ClassName.prototype.propertyName=someValue 来定义。 
	【静态属性】 通过ClassName.propertyName=someValue 来定义。
	【静态方法】 通过ClassName.funName=function(){...} 来定义。
http常见的头字段
	请求头：Cache-Contorl、cookie、Host、Referer、Accept、Accept-encoding、Accept-Language、User-Agent
	相应头：Content-Length、Content-Type、Date、ETag、Keep-Alive
在body头部插入元素
	var first=document.body.firstChild; //得到第一个元素
	document.body.insertBefore(divObj,first); //在第原来的第一个元素之前插入
SQL注入
	不直接拼接SQL，把用户的输入作为参数。这样用户的输入无法传到数据库的SQL解释器被编译执行，也不会越权变成代码。
Https http://blog.csdn.net/zgwangbo/article/details/50889623
http2.0
	https://www.zhihu.com/question/34074946
	http://io.upyun.com/2015/05/13/http2/
2018.2.25
str.slice(beginSlice[, endSlice]) 	方法提取一个字符串的一部分，并返回一新的字符串。
str.split()	方法使用指定的分隔符字符串将一个String对象分割成字符串数组，以将字符串分隔为子字符串，以确定每个拆分的位置。
array.slice(begin, end) 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。原始数组不会被修改。
array.splice(start, deleteCount, item1, item2, ...) 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。
array1.concat(array2) 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
array.find(callback(element, index, array)[, thisArg]) 方法返回数组中满足提供的测试函数的第一个元素的值

正则
	* 0次或多次，等价于{0,}
	+ 1次或多次，等价于{1,}
	? 0次或1次，等价于{0,1}
		如果紧跟在任何量词 *、 +、? 或 {} 的后面，将会使量词变为非贪婪的（匹配尽量少的字符）
		例如，对 "123abc" 应用 /\d+/ 将会返回 "123"，如果使用 /\d+?/,那么就只会匹配到 "1"。
	. (小数点)匹配除换行符外的任何单个字符
	(x) 匹配x并记住匹配项，括号被称为捕获括号
		模式/(foo) (bar) \1 \2/中的 '(foo)' 和 '(bar)' 匹配并记住字符串 "foo bar foo bar" 中前两个单词。模式中的 \1 和 \2 匹配字符串的后两个单词。注意 \1、\2、\n 是用在正则表达式的匹配环节。在正则表达式的替换环节，则要使用像 $1、$2、$n 这样的语法，例如，'bar foo'.replace( /(...) (...)/, '$2 $1' )。
	(?:x) 匹配x但是不记住匹配项。
	x(?=y) 匹配x仅仅当x后面跟着y，但是y不是匹配的一部分，只有x是。这种叫做正向查找
	x(?!y) 匹配x仅仅当x后面不跟着y，但是y不是匹配的一部分，只有x是。这种叫做正向否定查找
	x|y 匹配x或者y
	{n} n是一个正整数，匹配前面的字符刚好发生了n次
	{n,m} n 和 m 都是整数。匹配前面的字符至少n次，最多m次。如果 n 或者 m 的值是0， 这个值被忽略。
	[xyz] 一个字符集合，匹配[]中的任意字符
	[^xyz] 一个方向字符集，匹配任何没有包含在[]中的字符
	[\b] 匹配一个退格，不要和\b混淆了
	\b 匹配一个词的边界
	\B 匹配一个非单词的边界
		例如，/\B../匹配"noonday"中得'oo', 而/y\B./匹配"possibly yesterday"中得’ye‘
	\d 匹配一个数字，等价于[0-9]
	\D 匹配一个非数字，等价于[^0-9]
	\f 换页符
	\n 换行符
	\r 回车符
	\s 匹配一个空白字符，如空格、制表符、换页符、换行符
		例如, /\s\w*/ 匹配"foo bar."中的' bar'。
	\S 匹配一个非空白字符
	\w 匹配一个单字字符，等价于[a-zA-Z0-9_]
	\W 匹配一个非单字字符，等价于[^a-zA-Z0-9_]
	\n 当 n 是一个正整数，一个返回引用到最后一个与有n插入的正则表达式(counting left parentheses)匹配的副字符串。
		比如 /apple(,)\sorange\1/ 匹配"apple, orange, cherry, peach."中的'apple, orange,' 。
https://www.jianshu.com/p/c180fac01519
node的require原理	https://www.jianshu.com/p/609489e8c929
webpack打包原理
	1. 一切皆模块	把html、css、js全都看做模块.兼容了所有模块化方案。
	2. 按需加载	
	3. 依赖管理		方便应用第三方模块、让模块更易复用、避免全局冲突
	4. 合并代码		bundle到一起，减少请求数，配合UglifyJS优化代码体积
	5. 插件和loader	loader是文件转换器，处理文件的。插件，用于扩展webpack的功能，在webpack构建生命周期的节点上加入扩展hook为webpack加入功能。
	启动webpack构建到输出结果经历了一系列过程，它们是：
		解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。
		注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。
		从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。
		在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。
		递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。
		输出所有chunk到文件系统。
AMD CMD区别
	1、对于依赖的模块，AMD是提前执行，CMD是延迟执行。
	2、AMD推崇依赖前置；CMD推崇依赖就近，只有在用到某个模块的时候再去require。
数组去重
	function unique (arr) {
		const seen = new Map()
		return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
	}
	// or
	function unique (arr) {
		return Array.from(new Set(arr))
	}
Accept-Encoding
	是客户端在请求头里把能够支持的内容编码方式告诉服务端，通常是压缩算法。
	服务端会选择一个客户端提议的方式，使用并在响应报文首部 Content-Encoding 中通知客户端该选择。
BFC
	Formatting context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。
	一个BFC是一个HTML盒子并且至少满足下列条件中的任何一个：
	float的值不为none
	position的值不为static或者relative
	display的值为 table-cell, table-caption, inline-block, flex, 或者 inline-flex中的其中一个


