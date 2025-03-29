import 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Consultants = () => {

  
  const{consultants} = useContext(AppContext)
  const navigate = useNavigate()


  return (
    <div >
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {consultants.map((item, index)=>(
                <div onClick={() => navigate(`/appointment/${item._id}`)}className='border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    </div>
                </div>
            ))

          }
        </div>
    </div>
  )
}

export default Consultants