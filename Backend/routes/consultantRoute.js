import express from 'express'
import { consultantList } from '../controller/consultantControllers.js'

const consultantRouter = express.Router()

consultantRouter.get('/list', consultantList)


export default consultantRouter