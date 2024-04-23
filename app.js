import express from 'express'
import userRoute from './routes/userRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv'
import bookRoute from './routes/bookRoutes.js'
import reviewRoute from './routes/reviewRoutes.js'
import connection from './config/db.js'
import { fileURLToPath } from 'url';
import { dirname, join } from "path";
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
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

app.use('/user',userRoute)
app.use('/book',bookRoute)
app.use('/review',reviewRoute)
app.use('', express.static(join(__dirname, 'upload')));
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`server running om port ${port}`));