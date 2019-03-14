// setTimeout(() => {
//     console.log('2 seconds')
// }, 2000)

// const names = ['A', 'B', 'C']
// const shortNames = names.filter((name) => {
//     return name.length <= 4
// })

// const geocode = (address, callback) => {
//     setTimeout(() => {
//         const data = {
//             latitide: 0,
//             longtitude: 0
//         }

//         callback(data)
//     }, 2000)

// }

// geocode('Los Angeles', (data) => {
//     console.log(data)
// })

// add(1, 4, (sum) => {
//     console.log(sum)
// })

const add = (x, y, callback) => {
    setTimeout(() => {
        sum = x + y
        callback(sum)
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum)
})