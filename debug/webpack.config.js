// 导入node中内置的path模块
const path = require("path");
// 导出webpack配置
module.exports = {
	// 当前debug目录
	context: __dirname,
	// development模式
	mode: "development",
	// 配置source-map
	devtool: "source-map",
	// 入口文件设置为src文件下的index.js
	entry: "./src/index.js",
	// 出口文件在debug文件夹下dist文件夹
	output: {
		path: path.join(__dirname, "./dist")
	},
	// 优化
	optimization: {
		// 收集标记没有使用但是导出了的模块，用来minimize进行 Tree Shaking
		usedExports: true,
		// 压缩代码，这里才会去除deadCode
		minimize: true
	},
	// 配置loader
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ["babel-loader"],
				exclude: /node_modules/
			}
		]
	}
};
