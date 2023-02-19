const express = require("express");
const userRouter = express.Router();
const { employeeModel } = require("../models/employees.model");
const bcrypt = require('bcrypt');


// Create=>
userRouter.post("/add", async(req, res)=>{
    const user = req.body;
    const pass = user.password;
    try{
        bcrypt.hash(pass, 5, async(err, hash)=>{
            if(err) res.send('Problem in Encrypting Password')
            else
            {
                user.password = hash;
                const newUser = new employeeModel(user);
                await newUser.save()
                res.send({"msg":`Dear ${newUser.name}, you are registered`})

            }
        });
    }catch(err){
        res.send(err.message)
    }
})

// Read=>
userRouter.get("/", async(req, res)=>{
    const query = req.query
    try{
        const users = await employeeModel.find(query);
        res.send(users)
    }catch(err){
        res.send(err.message)
    }
})

// Update=>
userRouter.patch("/update/:id", async(req, res)=>{
    const newDetails = req.body;
    const ID = req.params.id;
    
    try{
        await employeeModel.findByIdAndUpdate(ID, newDetails)
        const user = await employeeModel.findById(ID)
        res.send({"msg":`Dear ${user.name}, your details are updated`})
    }catch(err){
        res.send(err.message)
    }
})

// Delete=>
userRouter.delete("/delete/:id", async(req, res)=>{
    const newDetails = req.body;
    const ID = req.params.id;
    
    try{
        const user = await employeeModel.findById(ID)
        await employeeModel.findByIdAndDelete(ID)
        res.send({"msg":`Dear ${user.name}, your details are deleted`})
    }catch(err){
        res.send(err.message)
    }
})


module.exports = { userRouter };
