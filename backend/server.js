// to create basic express server(module type)
import express from 'express'
import cors from "cors" //to give permission to frontend to communicate with backend
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import 'dotenv/config' 

// to initialize app config
const app = express()
const port = 4000

// to initialize middleware
app.use(express.json())
app.use(cors())

// DB connection
connectDB();

// api endpoint
app.use('/api/food', foodRouter)
// to get images on frontend
app.use('/images', express.static('uploads'))
app.use('/api/user', userRouter)

app.get("/", (req,res)=>{
    res.send('API Working')
})

// to run express server 
app.listen(port, ()=> {
    console.log(`Server started on http://localhost:${port}`)
})

// mongodb+srv://malikhumaira138:5HPsYVs2yNK0ztnQ@cluster0.6q60cvl.mongodb.net/?
// mongodb+srv://malikhumaira138:WQLIcO7&O2MXUn!V@cluster0.sf7x1h4.mongodb.net/?