export const eA = () => "esA方法 未使用";
export const eB = () => "esB方法";

let internalEV = {
	a: "ev.ac初始化",
	b: "ev.b初始化"
};

function kkkkk() {
	const kkkkkValue = "我是kkkk";
	internalEV.a = "ev.ac修改";
	internalEV.b = "ev.b修改";
	return "我是kk";
}
kkkkk();

export let eV = internalEV;
