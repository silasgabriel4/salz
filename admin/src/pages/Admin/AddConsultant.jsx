import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdmiContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const AddConsultant = () => {



  const [docimg, setDocimg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docimg) {
        return toast.error('Image not selected')
      }

      const formData = new FormData()

      formData.append('image', docimg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2}));


      //console log formData
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`); 

      })

      const { data } = await axios.post(backendUrl + '/api/admin/add-consultant', formData, { headers: { aToken } })

      if (data.success) {
        toast.success(data.message) 

        setDocimg(false)
        setName('')
        setPassword('')
        setAbout('')
        setDegree('')
        setEmail('')
        setAddress1('')
        setFees('')
        setAddress2('')

      } else {
        toast.error(data.message)
      }



    } catch (error) {
      toast.error(error.message)
      console.log(error);
      

    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full '>
      <p className='mb-3 text-lg font-medium'>Add Consultant</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-5 00'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docimg ? URL.createObjectURL(docimg) : assets.upload_area} />
          </label>

          <input onChange={(e) => setDocimg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Upload consultant <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Consultant name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded py-2 px-3' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Consultant Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded py-2 px-3' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Consultant Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded py-2 px-3' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Consultant Exprience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded py-2 px-3' name="" id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded py-2 px-3' type="number" placeholder='Fees' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <input onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded py-2 px-3' type="text" placeholder='Speciality' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded py-2 px-3' type="text" placeholder='Education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded py-2 px-3' type="text" placeholder='Address 1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded py-2 px-3' type="text" placeholder='Address 2' required />
            </div>
          </div>
        </div>

        <div >
          <p className='mt-4 mb-2' >About Consultant</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full border rounded px-4 pt-2' placeholder='write about consultant' rows={5} required />
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Consultant</button>


      </div>

    </form>
  )
}

export default AddConsultant