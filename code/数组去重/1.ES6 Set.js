let arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6]
const norepeate = (arr) => {
  return Array.from(new Set(arr))
}

console.log(norepeate(arr))
