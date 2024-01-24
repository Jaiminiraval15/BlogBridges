require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.port || 3000;

mongoose.connect(process.env.db_url)

.then(()=>{
    app.listen(PORT,()=>{
        console.log("Database connected")
    })
})

app.use(cors())
app.use(express.json())
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/BlogRoutes')
const requireAuth = require('./middleware/authMiddleware')
app.use('/api/blogs',requireAuth,blogRoutes)
app.use('/api/routes',authRoutes)
