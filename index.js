const express = require('express')
const app = express()
const port = 5000
require('./DB/DBConnection')
const cors = require('cors')
require('dotenv').config()
const  cookieParser = require('cookie-parser')
require('dotenv').config()
app.use(cors({
  origin:`https://task-management-client-iota.vercel.app `|| "http://localhost:5000",
  credentials:true
}))
app.use(express.json())
app.use(cookieParser())




app.use('/api', require('./routes/authRoutes'));
app.use('/task', require('./routes/taskRoute'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Task server started at ${port}`)
})