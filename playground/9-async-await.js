const doWork = async () => {
    const sum = await add(-1, 9)
    const sum1 = await add(sum, 10)
    const sum2 = await add(sum1, 10)
    return sum2
}

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                return reject('Numbers must be positive')
            }
            resolve(a + b)
        }, 1000)
    })
}

doWork().then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})