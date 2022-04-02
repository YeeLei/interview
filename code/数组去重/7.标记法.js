const arr = [1, 1, 4, 2, 2, 3, 3, 3, 6, 6, 6]
const norepeate = (arr) => {
  const newarr = []
  for (let i = 0; i < arr.length; i++) {
    let flag = true
    for (let j = 0; j < newarr.length; j++) {
      if (arr[i] === newarr[j]) {
        flag = false
      }
    }
    if (flag) {
      newarr.push(arr[i])
    }
  }
  return newarr
}

console.log(norepeate(arr))
