const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const verifyToken = require('../middleware/verifyToken')
const task = require('../Models/task');
const { config } = require('dotenv');



router.post('/addtask',verifyToken, async(req,res)=>{
    const {title,description,email}= req.body;
   
    if(!title && !description){
        return res.status(401).json({message:"title & description not filled"})
    }
    if(!email){
        return res.status(403).send('Unautorized User')
    }
    try {
        
        const findTask = await task.findOne({title:title,description:description,email})
        if(findTask){
            return res.status(403).json("Already Added Task")
        }
        const tasks = await task.create({title,description,email})
        res.send(tasks)
    } catch (error) {
        
    }
})

router.get('/tasks',verifyToken, async(req,res)=>{
    const email = req.user.email
    const page= parseInt(req.query.page)
    const size=parseInt(req.query.size)
    console.log(page,size)
    const findUserTask = await task.find({email:email}).skip(page*size).limit(size)
    
   
    res.status(200).json(findUserTask)
})

router.get('/taskcount',verifyToken, async(req,res)=>{
    const email = req.user.email
    console.log('count',email)
    const total= await task.countDocuments({email:email})
   
    res.send({total})
})
router.get('/tasks/:id',verifyToken, async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const findUserTask = await task.findById(id)
    res.status(200).json(findUserTask)
   
})
router.patch('/tasks/:id',verifyToken, async(req,res)=>{
    const updateid= req.params.id;
    const {title,description}= req.body;
     
    const updateTask = await task.findByIdAndUpdate(updateid,{title:title,description:description})
    res.status(200).send(updateTask)
})
router.delete('/tasks/:id', verifyToken, async(req,res)=>{
    const deleteId= req.params.id;
    const deleteTask = await task.findByIdAndDelete(deleteId)
    res.status(200).send("Task Deleted Successfully")
})

module.exports= router