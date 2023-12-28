require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.port || 3000;
mongoose.connect(process.env.db_url)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("Database connected")
    })
})