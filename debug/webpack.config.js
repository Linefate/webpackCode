// 导入node中内置的path模块
const path = require("path");
// 导出webpack配置
module.exports = {
	// 当前debug目录
	context: __dirname,
	// development模式
	mode: "production",
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
		// 收集标记使用了的导出了的模块，用来minimize进行 Tree Shaking（导出但没有使用的模块）
		usedExports: true,
		// 压缩代码，这里才会去除deadCode
		minimize: true,
		/**
		 * sideEffects(默认值是true)： 对比package.json里的sideEffects含义是相反的）
		 * 这个是告诉 webpack 要检查对应的模块（npm包对应的package.json） package.json 中的 sideEffects 标记
		 * 1.如果这里的true，则会检查使用到的npm包里的package.json的sideEffects字段，如果是false，且只有import模块，没有使用的话，那么都会做移除
		 * 2.如果这里是false。则都当做有副作用，会忽略npm包里的package.json的sideEffects字段
		 *
		 * ❓❓❓为什么在mode：development（production模式没有问题）模式不显示设置为true的时候，不会移除我在自己项目里写的模块（非第三方即npm），比如我写了import {A}  from "./eModule",但是A没有调用，我要显示的设置为true ，打包后的内容它才会移除而是eModule的模块声明
		 * 🤖🤖
		 * mode 会影响 optimization 的默认值
		 *  development 模式下某些优化可能被禁用
		 * webpack 5 的默认行为可能受到多个配置项的组合影响显式设置 sideEffects: true 可能触发了完整的优化流程默认值虽然是 true，但可能被其他配置或模式覆盖
		 */
		sideEffects: true
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
