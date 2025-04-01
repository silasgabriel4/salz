import { createContext, useState } from "react";
import axios from'axios'
import {toast} from 'react-toastify'

export const ConsultantContext = createContext()

const ConsultantContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)


    const getAppointments = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/consultant/appointments', {headers:{dToken}})

            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            } else{
                toast.error(data.message)

            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

        const completeAppointment = async (appointmentId) => {
            
            try {

                const {data} = await axios.post(backendUrl + '/api/consultant/complete-appointment', {appointmentId}, {headers:{dToken}})
                if (data.success){
                    toast.success(data.message)
                    getAppointments()
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                console.log(error)
            toast.error(error.message)
            }

        }


        const cancelAppointment = async (appointmentId) => {
            
            try {

                const {data} = await axios.post(backendUrl + '/api/consultant/cancel-appointment', {appointmentId}, {headers:{dToken}})
                if (data.success){
                    toast.success(data.message)
                    getAppointments()
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                console.log(error)
            toast.error(error.message)
            }

        }


        const getDashData = async()=>{
            try {
                
                const {data} = await axios.get(backendUrl + '/api/consultant/dashboard',  {headers:{dToken}})

                if (data.success){
                    setDashData(data.dashData)
                    console.log(data.dashData);
                    
                    
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                console.log(error)
            toast.error(error.message)
            }
        }

        const getProfileData = async()=>{
            try {
                
                const {data} = await axios.get(backendUrl + '/api/consultant/profile',  {headers:{dToken}})

                if (data.success){
                    setProfileData(data.profileData)
                    console.log(data.profileData);
                    
                    
                } else {
                    toast.error(data.message)
                }

            } catch (error) {
                console.log(error)
            toast.error(error.message)
            }
        }


    const value = {

        dToken,setDToken,
        backendUrl,
        appointments, setAppointments,
        getAppointments,
        completeAppointment,cancelAppointment, 
        dashData, setDashData,getDashData,
        profileData, setProfileData, getProfileData,

    }

    return(
        <ConsultantContext.Provider value={value}>
            {props.children}
        </ConsultantContext.Provider>
    )

}

export default ConsultantContextProvider