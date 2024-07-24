import {Router} from 'express'
import roomController from './roomsController.js'
const routes = Router()


routes.get('/',(req,res) => {
    res.send(`<h1>hall booking</h1>`)
})

routes.use('/rooms',roomController)
export default routes