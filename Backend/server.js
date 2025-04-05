import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import consultantRouter from './routes/consultantRoute.js';
import userRouter from './routes/userRoute.js';


// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

// Middlewares
app.use(express.json());
app.use(cors());
 
// API endpoint
app.use('/api/admin', adminRouter)
app.use('/api/consultant', consultantRouter)
app.use('/api/user', userRouter)



app.get('/', (req, res) => {
    res.send('API WORKING'); // Use res.send() instead of res.setEncoding()
});

// Start server
app.listen(port, ()=> console.log("Server Started", port))
