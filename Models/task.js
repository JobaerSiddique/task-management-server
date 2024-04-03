const { default: mongoose } = require("mongoose");


const TaskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})


const task = mongoose.model('task',TaskSchema)

module.exports = task;