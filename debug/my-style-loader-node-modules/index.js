// normal阶段
function myStyleLoader(source) {
	console.log("🙌【myStyleLoader normal】 阶段执行", source);
	// 如果pitch阶段执行了，且返回了非undefined值，则会跳过当前的normal阶段（👿这个方法不会执行）
	// 如果执行这里，那么source，是前置loader normal阶段返回的结果，也就是css-loader返回的结果
	// css-loader返回的结果是 js模块化的代码，也就是将css转换为js模块（esModule）

	// 😀😀下面是用来尝试不再pitch阶段执行，而是在normal阶段执行（当pitch没有return的时候）
	// 将ES模块语法转换为CommonJS语法 再执行（我发现 @import 引入的样式没有生效）
	const commonJSSource = source
		.replace(
			/import\s+(\w+)\s+from\s+["']([^"']+)["']/g,
			'const $1 = require("$2")'
		)
		.replace(/export\s+default/, "module.exports =");

	const script = `
        // 1. 执行css-loader输出的JS模块代码
        const cssModule = (function(module, exports) {
            ${commonJSSource}
            return module.exports;
        })({}, {});

        // 2. 获取CSS内容并转换为字符串
        const css = cssModule.toString();
        
        // 3. 创建并插入style标签
        const styleEl = document.createElement('style');
        console.log('Injecting CSS:', css);
        styleEl.innerHTML = css;
        document.head.appendChild(styleEl);
    `;
	return script;
}

// pitch阶段
myStyleLoader.pitch = function (remainingRequest) {
	console.log("🙌【myStyleLoader pitch】 阶段执行", remainingRequest);
	// 👇🏻👇🏻inline-loader
	//remainingRequest是： /Users/qianqian/qianqianfile/domore/webpackCode/debug/node_modules/.pnpm/css-loader@7.1.2_webpack@5.98.0/node_modules/css-loader/dist/cjs.js!/Users/qianqian/qianqianfile/domore/webpackCode/debug/src/css/index.css
	// webpack递归编译style-loader返回脚本中的import语句时，
	// 我们在编译完成就会通过import style from "!!${remainingRequest}"，
	// 在style - loader pitch返回的脚本阶段获得css - loader返回的js脚本并执行它，获取到它的导出内容。

	const script = `
    import style from "!!${remainingRequest}"
    const styleEl = document.createElement('style')
    styleEl.innerHTML = style
    document.head.appendChild(styleEl)
  `;

	return script;
};

module.exports = myStyleLoader;
