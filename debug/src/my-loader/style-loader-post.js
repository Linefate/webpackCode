// normal阶段
function myStyleLoader(source) {
	console.log("🙌 3️⃣【post-myStyleLoader normal】 阶段执行", source);
	return source;
}

// pitch阶段
myStyleLoader.pitch = function (remainingRequest) {
	console.log("🙌 3️⃣【post-myStyleLoader pitch】 阶段执行", remainingRequest);
};

module.exports = myStyleLoader;
