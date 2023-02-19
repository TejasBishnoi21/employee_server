const express = require("express");
const app = express() // Invoking express
require('dotenv').config();
var cors = require('cors')
app.use(express.json()) // Middleware
app.use(cors())
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
var jwt = require('jsonwebtoken');
const { employeeModel } = require("./models/employees.model");
const { jwtVerifier } = require("./middlewares/jwt.verifier")
const bcrypt = require('bcrypt');

app.get("/", (req, res)=>{
    res.send("Welcome to Homepage")
})

app.post("/login", async(req, res)=>{
    const {email, password} = req.body;
    
    try{
        const user = await employeeModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=>{ 
                if(result)
                {
                    var token = jwt.sign({ ID: user[0]._id }, 'masai');
                    res.send({
                        "msg":`Welcome ${user[0].name}`,
                        "token":token
                    })
                }
                else res.send(`Wrong Password`)
            });
        }
        else res.send("You are not registered user")
    }catch(err){
        res.send(err.message)
    }
})

// app.use(jwtVerifier) // middleware for jwt
app.use("/employees", userRouter)


app.listen(process.env.port, async(req, res)=>{
    try{
        await connection;
        console.log("Connected to DB");
    }catch(err){
        console.log(err.message);
    }
    console.log(`server is running at port: ${process.env.port}`);
})


// Password Encryption => 41:00