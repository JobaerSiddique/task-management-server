const { default: mongoose } = require("mongoose");
require('dotenv').config()
const url= process.env.DB_URL
console.log(url)
mongoose.connect(url)
.then(()=>{
    console.log("database Connect Successfully")
})