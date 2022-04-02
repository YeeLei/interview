let a = [1, 2]
let b = [3, 4]
a.push.apply(a, b)
console.log(a)

// 调用a.push这个函数实例的apply方法，同时把，b当作参数传入，
// 这样a.push这个方法就会遍历b数组的所有元素，达到合并的效果。
