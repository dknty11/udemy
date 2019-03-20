const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())


// Users
app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    const user = await User.findById(_id)

    try {
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }
        
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params)
        
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        
    }
})

// Tasks
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const task = await Task.findById(_id)

    try {
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'complete']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }
 
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})