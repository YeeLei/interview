const arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6]
const norepeate = (arr) => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

console.log(norepeate(arr))
