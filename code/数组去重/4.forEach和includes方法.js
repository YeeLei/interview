const arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6]
const norepeate = (arr) => {
  const newarr = []
  arr.forEach((item) => {
    if (!newarr.includes(item)) {
      newarr.push(item)
    }
  })
  return newarr
}

console.log(norepeate(arr))
