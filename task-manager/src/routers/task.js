const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

// Tasks
router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

// GET /tasks?complete=false
// GET /task?limit=30
// GET /task?sortBy=createdAt
router.get('/tasks', auth, async (req, res) => {
    // const complete = req.query.complete
    const match = {}
    const options = {}
    const sort = {}

    if (req.query.complete) {
        match.complete = req.query.complete === 'true' ? true : false
    }
    if (req.query.description) {
        match.description = req.query.description
    }

    if (req.query.limit) {
        options.limit = parseInt(req.query.limit)
    }

    if (req.query.skip) {
        options.skip = parseInt(req.query.skip)
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'? -1 : 1
        options.sort = sort
    }
    console.log(options)

    try {
        await req.user.populate({
            path: 'tasks',
            match: match,
            options: options,
        }).execPopulate()

        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'complete']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid Updates' })
    }
 
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        
        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router