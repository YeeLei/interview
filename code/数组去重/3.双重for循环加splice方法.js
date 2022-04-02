const arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6]
const norepeate = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(i, 1)
        j--
      }
    }
  }
  return arr
}

console.log(norepeate(arr))
