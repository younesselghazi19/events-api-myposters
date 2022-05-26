const express = require('express')
const app = express()
require('./services/dbConfig')
const eventsRoutes = require('./routes/eventsController')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use('/events', eventsRoutes)

app.listen(3000, () => console.log('Server started: 3000'))
