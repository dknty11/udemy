const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve([1,3,4])
        reject('Error')
    }, 2000);
})

doWorkPromise.then((result) => {
    console.log('Success', result)
}).catch((error) => {
    console.log(error)
})
