import express from 'express'
import userRoute from './routes/userRoutes.js'
// import userRoutes from './routes/userRouter'
import cors from 'cors'
import dotenv from 'dotenv'
import bookRoute from './routes/bookRouter.js'
// import imageRoute from './routes/imageRouter.js'
import reviewRoute from './routes/reviewRouter.js'
import connection from './config/db.js'
import { fileURLToPath } from 'url';
import { dirname, join } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express()
const port = process.env.PORT || 8000

connection()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get('/', (req , res, next) => {
    res.send("API IS RUNNING.....")
})



// app.use('/user',userRoutes)
app.use('/user',userRoute)
app.use('/book',bookRoute)
// app.use('/image',imageRoute)
app.use('/review',reviewRoute)
app.use('/upload', express.static(join(__dirname, 'upload')));

app.listen(port, () => console.log(`server running om port ${port}`));