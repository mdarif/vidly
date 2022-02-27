const mongoose = require('mongoose')
const genres = require('./routes/genres')
const customers = require('./routes/customers')
const express = require('express')
const app = express()

mongoose
  .connect('mongodb://127.0.0.1:27017/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

app.use(express.json()) // for parsing application/json
// Any route start with '/api/courses' will be handled by this router 'courses'
app.use('/api/genres', genres)
app.use('/api/customers', customers)

// Up the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server is up on port 3000')
})
