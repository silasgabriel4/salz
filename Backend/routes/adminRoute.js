import express from 'express'
import { addConsultant, allConsultants, loginAdmin, appointmentsAdmin, appointmentCancel, adminDashboard } from '../controller/adminControllers.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import { changeAvailability } from '../controller/consultantControllers.js'


const adminRouter = express.Router()

adminRouter.post('/add-consultant', authAdmin ,upload.single('image'), addConsultant)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-consultants',authAdmin, allConsultants)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/appointments', authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter
