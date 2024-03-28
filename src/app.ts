import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './routes/router'
import morgan from 'morgan'

const PORT = process.env.PORT || 3002

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
  console.log('Connected on port', PORT)
})
