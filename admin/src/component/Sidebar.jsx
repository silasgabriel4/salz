import React, { useContext } from 'react'
import { AdminContext } from '../context/AdmiContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ConsultantContext } from '../context/ConsultantContext'

const Sidebar = () => {


    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(ConsultantContext)

    return (
        <div className='min-h-screen bg-white border-r'>
            {
                aToken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/admin-dashbord'}>
                        <img src={assets.home_icon} />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/all-appointments'}>
                        <img className='w-10' src={assets.appointments_icon} />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/add-consultant'}>
                        <img src={assets.add_icon} />
                        <p className='hidden md:block'>Add Consultant</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/consultant-list'}>
                        <img src={assets.people_icon} />
                        <p className='hidden md:block'>Consultant List</p>
                    </NavLink>
                </ul>
            }


            {
                dToken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/consultant-dashboard'}>
                        <img src={assets.home_icon} />
                        <p className='hidden md:block'>Dashboard</p>
                    </NavLink>

                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/consultant-appointments'}>
                        <img className='w-10' src={assets.appointments_icon} />
                        <p className='hidden md:block'>Appointments</p>
                    </NavLink>


                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/consultant-profile'}>
                        <img src={assets.people_icon} />
                        <p className='hidden md:block'>Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar