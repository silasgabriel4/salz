import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
   
    address: {type:Object, default:{line1:'',line2:''}},
    gender: {type:String, default:"Not Selected"},
    dob: {type:String, default:"Not Selected"},
    phone: {type:String, default:"00000000000"},
    
    // Added chatbot fields below (new additions only)
    chatHistory: [{
        message: { type: String, required: true },
        response: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        needsFollowUp: { type: Boolean, default: false }
    }],
    lastChatActivity: { type: Date }
}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;