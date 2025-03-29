import 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm'>
            {/**------ Left Section -------- */}
            <div>
                <img className='mb-5 w-40 ' src={assets.logo} alt="" />
                <p className='w-full nd:w-2/3 text-gray-600 leading-6'> Salz Chatbot helps you address any basic mental health issues give 
                    you a the best response on any kind of mental health systom you are going throuhgh.</p>
            </div>

            {/**------ middle Section -------- */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/**------ Right Section -------- */} 
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>(+234) 708 3456 56</li>
                    <li>salZ@gmail.com</li>
                </ul>
            </div>
        </div>
        {/**----- copyright text */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center '> Copyright 2025@ Salz - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer