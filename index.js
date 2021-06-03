const express = require('express');
const orderRouter = require('./routes/order.route')
const cors = require('cors')

const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())
app.use('/api', orderRouter)

app.listen(PORT, () => console.log('server is ready'))
