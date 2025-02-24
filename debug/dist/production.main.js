(() => {
	var e = {
			850: (e, t, o) => {
				e.exports = "function" == typeof Object.is ? Object.is : o(852);
			},
			852: e => {
				e.exports = function (e, t) {
					return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
				};
			}
		},
		t = {};
	function o(r) {
		var s = t[r];
		if (void 0 !== s) return s.exports;
		var c = (t[r] = { exports: {} });
		return e[r](c, c.exports, o), c.exports;
	}
	(() => {
		"use strict";
		o(850);
		let e = { a: ("ev.ac初始化", "ev.ac修改"), b: ("ev.b初始化", "ev.b修改") },
			t = e;
		console.log("很高兴认识你，webpack"), console.log("eV", t);
	})();
})();
//# sourceMappingURL=production.main.js.map
