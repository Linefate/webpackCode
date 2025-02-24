// normal阶段
function myStyleLoader(source) {
	console.log("🙌 1️⃣【pre-myStyleLoader normal】 阶段执行", source);
	return "我是1️⃣pre-loader normal 返回的结果";
}

// pitch阶段
myStyleLoader.pitch = function (remainingRequest) {
	console.log("🙌 1️⃣【pre-myStyleLoader pitch】 阶段执行", remainingRequest);
};

module.exports = myStyleLoader;
