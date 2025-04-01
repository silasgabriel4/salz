import consultantModel from "../modules/consultantModule.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../modules/appointmentModel.js"


const changeAvailability = async (req, res) => {

    try {

        const {docId} = req.body

        const docData = await consultantModel.findById(docId)
        await consultantModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success:true, message:'Availability Changed'})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

        
    }
}

const consultantList = async (req, res)=>{
    try {
        
        const consultants = await consultantModel.find({}).select(['-password', '-email'])
        res.json({success:true, consultants})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//api for consultant login
const loginConsultant = async(req,res)=>{

    try {

        const {email, password} = req.body
        const consultant = await consultantModel.findOne({email})

        if (!consultant) {
            return res.json({success:false, message:'invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, consultant.password)

        if (isMatch) {
            
            const token = jwt.sign({id:consultant._id}, process.env.JWT_SECRET )

            res.json({success:true, token})
        } else{
            res.json({success:false, message:'invalid Credentials'})
        
        }

        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    
    }
}

//api to get all consultant appointments for panel
const appointmentConsultant = async (req,res) =>{

    try {

        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})

        res.json({success:true, appointments})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// api to mark appointment completed for consultant panel
const appointmentComplete = async(req,res)=>{

    try { 

        const  {docId, appointmentId} = req.body

        const appointmetData = await appointmentModel.findById(appointmentId)

        if (appointmetData && appointmetData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
            return res.json({success:true, message:'Appointment Completed'})
            
        } else{
            return res.json({success:false, message:'Mark Failed'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



// api to cancel appointment  for consultant panel
const appointmentCancel = async(req,res)=>{

    try { 

        const  {docId, appointmentId} = req.body

        const appointmetData = await appointmentModel.findById(appointmentId)

        if (appointmetData && appointmetData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
            return res.json({success:true, message:'Appointment Cancelled'})
            
        } else{
            return res.json({success:false, message:'Calcellation Failed'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// api to get dashboard  for consultant panel
const consultantDashboard = async(req,res)=>{
    try {

        const {docId} = req.body

        const appointments = await appointmentModel.find({docId})

        let earning = 0

        appointments.map((item)=>{

            if (item.isCompleted || item.payment) {
                earning += item.amount
            }
        })

        let patients = []

        appointments.map((item)=>{
            if (!patients.includes(item.userId)) {

                patients.push(item.userId)
                
            }
        })

        const dashData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true, dashData})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api to get consultant profile  for consultant panel

const consultantProfile = async(req,res)=>{

    try {
        const {docId} = req.body
        const  profileData = await consultantModel.findById(docId).select('-password')

        res.json({success:true, profileData})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

// api to update consultant profile  for consultant panel

const updateConsultantProfile = async(req,res)=>{
    try {

        const {docId,fee, address,available} = req.body

         await consultantModel.findByIdAndUpdate(docId,{fee, address,available})

         res.json({success:true, message: 'Profile Updated'})
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}


export{changeAvailability, consultantList, 
    loginConsultant, appointmentConsultant,
     appointmentCancel,appointmentComplete,
      consultantDashboard,
      consultantProfile,
      updateConsultantProfile
    }