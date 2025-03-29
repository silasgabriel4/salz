import React, { useContext } from 'react'
import { AdminContext } from '../context/AdmiContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {


    const {aToken} = useContext(AdminContext)

  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={'/admin-dashbord'}>
                    <img src={assets.home_icon}  />
                    <p>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={'/all-appointments'}>
                    <img className='w-10' src={assets.appointments_icon}  />
                    <p>Appointments</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={'/add-consultant'}> 
                    <img  src={assets.add_icon}  />
                    <p>Add Consultant</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary': ''}`} to={'/consultant-list'}>
                    <img src={assets.people_icon} />
                    <p>Consultant List</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar