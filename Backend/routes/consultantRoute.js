import express from 'express'
import { consultantList, loginConsultant, appointmentConsultant,appointmentComplete ,appointmentCancel, consultantDashboard, consultantProfile,updateConsultantProfile} from '../controller/consultantControllers.js'
import authConsultant from '../middleware/authConsultant.js'

const consultantRouter = express.Router()

consultantRouter.get('/list', consultantList)
consultantRouter.post('/login', loginConsultant)
consultantRouter.get('/appointments',authConsultant, appointmentConsultant)
consultantRouter.post('/complete-appointment',authConsultant,appointmentComplete)
consultantRouter.post('/cancel-appointment',authConsultant,appointmentCancel)
consultantRouter.get('/dashboard', authConsultant, consultantDashboard)
consultantRouter.get('/profile',authConsultant, consultantProfile)
consultantRouter.post('/update-profile', authConsultant, updateConsultantProfile)


export default consultantRouter