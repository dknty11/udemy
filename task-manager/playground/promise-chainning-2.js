require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5c90b12b75ed864232828a61').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ complete: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ complete: false })
    return (count, task)
}

deleteTaskAndCount('5c909274fed9291cdab79fc1').then((result, task) => {
    if (!task) {
        return console.log('Could not find the id')
    }
    console.log(result)
}).catch((e) => {
    console.log(e)
})