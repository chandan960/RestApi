const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const contactRoute = require('./api/routes/contact')
const userRoute = require('./api/routes/user')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err)
})
db.once('open', () => {
    console.log('Database connection stablished')
})




const app = express()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}')
})
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/contacts/', contactRoute)
app.use('/api/users/', userRoute)


app.get('/', (req, res) => {
    res.send('<h1>Hello world44<h1>')
})