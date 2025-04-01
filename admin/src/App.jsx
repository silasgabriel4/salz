import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdmiContext';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointment from './pages/Admin/AllAppointment';
import AddConsultant from './pages/Admin/AddConsultant';
import ConsultantsList from './pages/Admin/ConsultantsList';
import { ConsultantContext } from './context/ConsultantContext';
import ConsultantDashboard from './pages/Consultant/ConsultantDashboard';
import ConsultantAppointment from './pages/Consultant/ConsultantAppointment';
import ConsultantProfile from './pages/Consultant/ConsultantProfile';



const App = () => {

 
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(ConsultantContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin routes*/}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashbord' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointment/>} />
          <Route path='/add-consultant' element={<AddConsultant/>} />
          <Route path='/consultant-list' element={<ConsultantsList/>} />

          {/* Consultant routes*/}
          <Route path='/consultant-dashboard' element={<ConsultantDashboard/>} />
          <Route path='/consultant-appointments' element={<ConsultantAppointment/>} />
          <Route path='/consultant-profile' element={<ConsultantProfile/>} />

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App