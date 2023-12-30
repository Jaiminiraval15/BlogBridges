require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.port || 3000;

mongoose.connect(process.env.db_url)

.then(()=>{
    app.listen(PORT,()=>{
        console.log("Database connected")
    })
})
// mongoose.connect(process.env.db_url,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(()=>{
//     app.listen(PORT,()=>{
//         console.log("DB connected")
//     })
// })

app.use(express.json())
const authRoutes = require('./routes/authRoutes')
app.use('/api/routes',authRoutes)
