// 导入node中内置的path模块
const path = require("path");

// 创建基础配置
const baseConfig = {
	// 当前debug目录
	context: __dirname,
	// 配置source-map
	devtool: "source-map",
	// 入口文件设置为src文件下的index.js
	entry: "./src/index.js",
	// 优化
	optimization: {
		/**
		 * 总结🦑🦑
		 * usedExports首先标记代码使用情况
		 * sideEffects检查模块是否有副作用
		 * minimize根据前两步的结果，执行最终的代码移除和压缩
		 */
		usedExports: true,
		sideEffects: true,
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

// 创建开发环境配置
const developmentConfig = {
	...baseConfig,
	mode: "development",
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "development.[name].js"
	}
};

// 创建生产环境配置
const productionConfig = {
	...baseConfig,
	mode: "production",
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "production.[name].js"
	}
};

// 根据环境变量导出配置
module.exports = (env) => {
	if (env.WEBPACK_BUILD === "development") {
		return [developmentConfig];
	}
	if (env.WEBPACK_BUILD === "production") {
		return [productionConfig];
	}
	// 默认两种模式都构建
	return [developmentConfig, productionConfig];
};
