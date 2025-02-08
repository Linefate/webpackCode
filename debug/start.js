// 引入webpack某块
const webpack = require("../lib/index.js");
// 引入上面写的webpack配置对象
const config = require("./webpack.config");
// 创建一个compiler对象

// 传入环境变量
const compiler = webpack(config({ WEBPACK_BUILD: process.env.WEBPACK_BUILD }));

// 执行compiler.run方法开始编译代码，回调方法用于反馈编译的状态
compiler.run((err, stats) => {
	if (err) {
		console.error(err);
		return;
	}

	// 由于可能是多配置，需要判断stats是否是MultiStats
	const statsArray = stats.stats || [stats];
	statsArray.forEach((stat, index) => {
		const mode =
			process.env.WEBPACK_BUILD || (index === 0 ? "development" : "production");
		console.log(`\n构建 ${mode} 模式结果：`);
		console.log(
			stat.toString({
				chunks: false, // 使输出更清晰
				colors: true // 让输出带有颜色
			})
		);
	});

	// 完成后调用close
	compiler.close(closeErr => {
		if (closeErr) {
			console.error(closeErr);
		}
	});
});
