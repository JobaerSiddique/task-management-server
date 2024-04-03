const { default: mongoose } = require("mongoose");

const url= "mongodb://localhost:27017/tasksApp"

mongoose.connect(url)
.then(()=>{
    console.log("database Connect Successfully")
})