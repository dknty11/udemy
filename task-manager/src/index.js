const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 2048000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(pdf|jpg|doc|docs|)$/)) {
            return callback(new Error('wrong format'))
        }

        // callback(new Error('File must be a PDF'))
        callback(undefined, true)
        // callback(undefined, false)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})