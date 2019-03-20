require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5c90b4b3075a73478b9c3e0a', {age: 0}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 0 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5c90b4b3075a73478b9c3e0a', 4).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})