import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import consultantModel from "../modules/consultantModule.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../modules/appointmentModel.js";
import userModel from "../modules/userModule.js";

// API for adding consultant
const addConsultant = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // Checking for all required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Check if an image is uploaded
    if (!imageFile) {
      return res.json({ success: false, message: "Image is required" });
    }

    // Hashing consultant password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      folder: "salz/consultants", // ✅ Corrected folder structure
      resource_type: "image",
    });

    // Prepare consultant data
    const consultantData = {
      name,
      email,
      image: imageUpload.secure_url,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees), // Ensure fees is stored as a number
      address: typeof address === "string" ? JSON.parse(address) : address,
      date: Date.now(),
    };

    // Save consultant to the database
    const newConsultant = new consultantModel(consultantData);
    await newConsultant.save();

    res.json({ success: true, message: "Consultant added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// console to get all consultant list for admin panel
const allConsultants = async (req, res) => {
  try {
    const consultants = await consultantModel.find({}).select("-password");
    res.json({ success: true, consultants });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get all appointments list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for cancelation


//api to cancel appointment
const appointmentCancel = async (req,res)=>{


  try {
    
    const {appointmentId}= req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

   
    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

    //releasing consultant slot
    const {docId, slotDate, slotTime} = appointmentData
    const ConsultantData = await consultantModel.findById(docId)

    let slots_booked = ConsultantData.slots_booked

    slots_booked[slotDate]= slots_booked[slotDate].filter( e => e !== slotTime)
    await consultantModel.findByIdAndUpdate(docId, {slots_booked})
    res.json({success:true, message:'Appointment Cancelled'})


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

//api to get dashboard data for admin panel

const adminDashboard = async (req,res)=>{

  try {

    const consultants = await consultantModel.find({})
    const users = await  userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashData ={
      consultants: consultants.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0,5)
    }

    res.json({success:true, dashData})

    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

export { addConsultant, loginAdmin, allConsultants, appointmentsAdmin, appointmentCancel, adminDashboard };
