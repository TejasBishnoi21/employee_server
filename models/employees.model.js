const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    name:{type: String, require:true},
    email:{type: String, require:true},
    password:{type: String, require:true},
    age:{type: String, require:true}
},{
    versionKey:false
})

const employeeModel = mongoose.model("developer", employeeSchema)

module.exports = { employeeModel };