import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../modules/userModule.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary'
import consultantModel from "../modules/consultantModule.js";
import appointmentModel from "../modules/appointmentModel.js";
import razorpay from 'razorpay'

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate user email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    // Validate strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Create new user
    const userData = { name, email, password: hashedPassword };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ success: true, token, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invaild Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to update user profile data
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, {image:imageURL})
      
    }

    res.json({success:true, message:"Profile Updated"})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// api to book appointment

const bookAppointment = async (req,res) =>{

  try {
    
    const {userId, docId, slotDate, slotTime} = req.body
    const docData = await  consultantModel.findById(docId).select('-password')

    if (!docData.available) {
      return res.json({success:false, message:'Consultant not available'})
    }

    let slots_booked = docData.slots_booked

    //checking for slot availability

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({success:false, message:'slot not available'})
      } else{
        slots_booked[slotDate].push(slotTime)
      }
      
    } else{
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }


    const userData =  await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment =new appointmentModel(appointmentData)
    await newAppointment.save()

    //save new slot_data in docData
    await consultantModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({success:true, message:'Appointment Booked'})


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  
  }

}

// api to get all user appointment
const listAppointment = async (req,res) => {
  
  try {
    

    const {userId} = req.body
    const appointments = await appointmentModel.find({userId})

    res.json({success:true, appointments})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

//api to cancel appointment
const cancelAppointment = async (req,res)=>{


  try {
    
    const {userId, appointmentId}= req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    //verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({success:false, message:'Unauthorised Action'})
    }

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


// Chatbot implementation
const mentalHealthResponses = {
  "stress": "Stress is a common issue. Try these techniques:\n1. Practice deep breathing exercises\n2. Take short breaks during work\n3. Maintain a regular sleep schedule\n4. Engage in physical activity",
  "anxiety": "For anxiety management:\n1. Practice mindfulness meditation\n2. Limit caffeine intake\n3. Try grounding techniques (5-4-3-2-1 method)\n4. Keep a worry journal",
  "depression": "For mild depression:\n1. Maintain social connections\n2. Establish a daily routine\n3. Get sunlight exposure\n4. Consider talking to someone you trust",
  "sleep": "For better sleep:\n1. Maintain consistent sleep schedule\n2. Create a relaxing bedtime routine\n3. Avoid screens before bed\n4. Keep your bedroom cool and dark",
  "default": "I'm sorry, I can't provide specific advice for this issue. For more complex mental health concerns, I recommend booking a session with one of our professional consultants."
};

const handleChatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    if (!message) {
      return res.json({ success: false, message: "Message is required" });
    }

    const lowerCaseMessage = message.toLowerCase();
    let response, needsConsultant = false;

    if (lowerCaseMessage.includes('stress')) {
      response = mentalHealthResponses.stress;
    } else if (lowerCaseMessage.includes('anxiety')) {
      response = mentalHealthResponses.anxiety;
    } else if (lowerCaseMessage.includes('depress')) {
      response = mentalHealthResponses.depression;
    } else if (lowerCaseMessage.includes('sleep')) {
      response = mentalHealthResponses.sleep;
    } else {
      response = mentalHealthResponses.default;
      needsConsultant = true;
    }

    res.json({
      success: true,
      response,
      needsConsultant,
      consultantLink: needsConsultant ? '/consultants' : null
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { 
  registerUser, 
  loginUser, 
  getProfile, 
  updateProfile, 
  bookAppointment, 
  listAppointment, 
  cancelAppointment,
  handleChatbotMessage
};


