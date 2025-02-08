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
		/**
		 * 【标记导出使用情况】
		 * 作用是分析模块导出内容的使用情况，标记哪些导出被使用，哪些没有被使用
		 * 它只是"标记"过程，不会真正移除未使用的代码
		 * 可以理解为它是Tree Shaking的第一步，找出可以被移除的代码
		 */
		usedExports: true,
		/**
		 * 【副作用检查】
		 * sideEffects(默认值是true)： 对比package.json里的sideEffects含义是相反的）
		 * 它会检查（npm包对应的package.json）package.json中的sideEffects字段来确定模块是否有副作用
		 * 当设置为true时，webpack会遵循package.json中的sideEffects声明
		 * 如果一个模块被标记为无副作用，且其导出内容未被使用（由usedExports标记），这个模块就可能被完全移除
		 * ---------------------------------------
		 * 1.如果这里的true，则会检查使用到的npm包里的package.json的sideEffects字段，如果是false，且只有import模块，没有使用的话，那么都会做移除
		 * 2.如果这里是false。则都当做有副作用，会忽略npm包里的package.json的sideEffects字段
		 *
		 * ❓❓❓为什么在mode：development（production模式没有问题）模式不显示设置为true的时候，不会移除我在自己项目里写的模块（非第三方即npm），比如我写了import {A}  from "./eModule",但是A没有调用，我要显示的设置为true，打包后的内容它才会移除而是eModule的模块声明
		 * 🤖🤖
		 * mode 会影响 optimization 的默认值
		 * development 模式下某些优化可能被禁用
		 * webpack 5 的默认行为可能受到多个配置项的组合影响显式设置 sideEffects: true 可能触发了完整的优化流程默认值虽然是 true，但可能被其他配置或模式覆盖
		 */
		sideEffects: true,
		/**
		 * 是最后执行代码压缩和清理的步骤
		 * 它会根据usedExports的标记结果，真正地移除未使用的代码（dead code）
		 * 如果minimize设为false，即使usedExports标记了未使用的代码，这些代码也不会被移除
		 */
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
