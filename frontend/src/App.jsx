import 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Consultants from './pages/Consultants'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/contact'
import Myprofile from './pages/Myprofile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar /> {/** this will make the navbar visible in all the pages silas */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Consultants' element={<Consultants />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/About' element={<About />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/My-Profile' element={<Myprofile />} />
        <Route path='/My-Appointments' element={<MyAppointment />} />
        <Route path='/Appointment/:docId' element={<Appointment />} />
      </Routes>
      
      <Footer />
 
    
      
    </div >
  )
}

export default App