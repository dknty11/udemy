const express = require('express')
const mutler = require('multer')
const User = require('../models/user')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/user/:id', async (req, res) => {
    const _id = req.params.id
    const user = await User.findById(_id)

    try {
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        await req.user.remove()

        res.send(req.user)
    } catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
})

router.post('/users/logout',auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

const upload = mutler({
    limits: {
        fileSize: 200000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png)/)) {
            return cb(new Error('Wrong format'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.file.buffer = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(404).send({ error: 'Could not find the avatar' })
})

router.get('/users/:id/avatar', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports = router