import consultantModel from "../modules/consultantModule.js"


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

export{changeAvailability, consultantList}