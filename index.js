import express from 'express'
import routes from './routes/index.js'

const PORT = 8000
const app = express();

app.use(express.json());

app.use(routes)

app.listen(PORT,()=> console.log(`server listening at port ${PORT}`))