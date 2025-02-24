// require("object.is");
require("./css/index.css");
import is from "object.is";
// 这里引入一个小而美的第三方库，以此观察webpack如何处理第三方包
console.log("很高兴认识你，webpack");
import { eV, eB } from "./eModule";
// console.log(is(1, 1));
// index.js
// const { a } = require("./cjsModule");
// a(); // 只使用了 a
console.log("eV", eV);
var a = 1;
export const noUse = "我是一个不会被使用的变量";
// module.exports.cjNoUse = "我是commonjs导出的不会使用的变量";
