class MyPromise {
  static PADDING = 'padding'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    this.status = MyPromise.PADDING
    this.value = null
    this.callbacks = []

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(value) {
    if (this.status === MyPromise.PADDING) {
      this.status = MyPromise.FULFILLED
      this.value = value
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFulfilled(this.value)
        })
      })
    }
  }
  reject(reason) {
    if (this.status === MyPromise.PADDING) {
      this.status = MyPromise.REJECTED
      this.value = reason
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(reason)
        })
      })
    }
  }
  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => this.value
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => this.value
    }
    return new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PADDING) {
        this.callbacks.push({
          onFulfilled: (value) => {
            try {
              let result = onFulfilled(value)
              resolve(result)
            } catch (error) {
              onRejected(error)
            }
          },
          onRejected: (value) => {
            try {
              let result = onRejected(value)
              resolve(result)
            } catch (error) {
              onRejected(error)
            }
          },
        })
      }
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            let result = onFulfilled(this.value)
            resolve(result)
          } catch (error) {
            onRejected(error)
          }
        })
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            let result = onRejected(this.value)
            resolve(result)
          } catch (error) {
            onRejected(error)
          }
        })
      }
    })
  }
}
