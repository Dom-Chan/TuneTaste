import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

import postRoutes from "./routes/reviews.js"
import authRoute from "./routes/auth.js"

const app = express()
//
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: "true"}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/authorize', authRoute)

//database connection
const CONNECTION_URL = 'mongodb+srv://DC_dev:DCdevelopment69@cluster0.hnqou.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(PORT, () => console.log('listening on port 5000')))
//     .catch((err) => console.error(err))

//async function to connect to MongoDB 
const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_URL)
        console.log('success connection to MongoDB Atlas')
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    }
    catch (err) {
        console.error(err)
    }
    
}
//call the database connection function
connectDB()

