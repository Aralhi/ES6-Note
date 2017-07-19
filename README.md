## ES6笔记

## 字符串的扩展

1. 字符串的Unicode表示法
	```javascript
	"\u0061"
	  // "a"
	 ```
	 但是，这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
	 有了这种表示法之后，JavaScript 共有6种方法可以表示一个字符。

	```javascript
	'\z' === 'z'  // true
	'\172' === 'z' // true
	'\x7A' === 'z' // true
	'\u007A' === 'z' // true
	'\u{7A}' === 'z' // true
	```

2. codePointAt()

	codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法
	```javascript
	function is32Bit(c) {
	  return c.codePointAt(0) > 0xFFFF;
	}

	is32Bit("𠮷") // true
	is32Bit("a") // false
	```
3. String.fromCodePoint()

	ES5提供String.fromCharCode方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于0xFFFF）。

	```javascript
	String.fromCharCode(0x20BB7)
	// "ஷ"
	```
	ES6提供了String.fromCodePoint方法，可以识别大于0xFFFF的字符，弥补了String.fromCharCode方法的不足。在作用上，正好与codePointAt方法相反。

	```javascript
	String.fromCodePoint(0x20BB7)
	// "𠮷"
	```
	注意，fromCodePoint方法定义在String对象上，而codePointAt方法定义在字符串的实例对象上。

4. 字符串的遍历接口
	
	ES6为字符串提供了遍历器接口，使得字符串可以被for...of循环遍历
	```javascript
	for (let codePoint of 'foo') {
	  console.log(codePoint)
	}
	```

	```javascript
	var text = String.fromCodePoint(0x20BB7);
	for (let i = 0; i < text.length; i++) {
	  console.log(text[i]);
	}
	// " "
	// " "

	for (let i of text) {
	  console.log(i);
	}
	// "𠮷"
	```

	上面代码中，字符串text只有一个字符，但是for循环会认为它包含两个字符（都不可打印），而for...of循环会正确识别出这一个字符。

5. at()

	提出字符串实例的at方法，可以识别Unicode编号大于0xFFFF的字符，返回正确的字符

	```javascript
	'abc'.at(0) // "a"
	'𠮷'.at(0) // "𠮷"
	```

7. includes(), startsWith(), endsWith()

	- includes()：返回布尔值，表示是否找到了参数字符串。
	- startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
	- endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。

	这三个方法都支持第二个参数，表示开始搜索的位置。

	```javascript
	var s = 'Hello world!';

	s.startsWith('world', 6) // true
	s.endsWith('Hello', 5) // true
	s.includes('Hello', 6) // false
	```

	上面代码表示，使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

8. repeat()
	
	repeat方法返回一个新字符串，表示将元字符歘重复n次，参数如果是小数，回去取整，如果是负数或者Infinity会报错。如果repeat的参数是字符串，则会先转换成数字。

	```
	'na'.repeat(2.9) // "nana"
	```

9. padStart()，padEnd()

	ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。

	```javascript
	'x'.padStart(5, 'ab') // 'ababx'
	'x'.padStart(4, 'ab') // 'abax'

	'x'.padEnd(5, 'ab') // 'xabab'
	'x'.padEnd(4, 'ab') // 'xaba'
	```

10. 模板字符串

	模板字符串（template string）是增强版的字符串，用反引号\（\`\）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。模板字符串中嵌入变量，需要将变量名写在${}之中。大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。模板字符串甚至还能嵌套。



























