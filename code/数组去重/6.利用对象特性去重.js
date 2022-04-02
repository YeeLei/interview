const arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6]
const norepeate = (arr) => {
  let obj = {}
  const newarr = []
  arr.forEach((item) => {
    if (!obj[item]) {
      obj[item] = 1
      newarr.push(item)
    }
  })
  return newarr
}

console.log(norepeate(arr))
