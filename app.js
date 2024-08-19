import express from 'express';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()


const app = express()

app.use(express.json())
app.use('/api',routes)
const port = process.env.PORT || 3000
mongoose.connect(process.env.DB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
.then(result => {
    console.log('Connected...');
})
.catch(err => {
    console.log(" database connection error");
})

app.listen(port, () => {
    console.log(`Server is listning on port ${port}`)
})