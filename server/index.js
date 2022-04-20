import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRoutes from "./routes/reviews.js"
import authRoute from "./routes/auth.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: "true"}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/authorize', authRoute)

const PORT = process.env.PORT || 5000

//async function to connect to MongoDB 
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL)
        console.log('success connection to MongoDB Atlas')
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    }
    catch (err) {
        console.error(err)
    }
    
}
//call the database connection function
connectDB()

