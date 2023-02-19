const mongoose = require("mongoose");
require('dotenv').config();

const connection = mongoose.connect(process.env.employeesURL)

module.exports = { connection };