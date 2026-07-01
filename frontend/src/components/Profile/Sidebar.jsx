import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth'
import { Link, useNavigate } from 'react-router-dom'

const Sidebar = ({ data }) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const role = useSelector((state) => state.auth.role)
    return (
        <>
            <div className='bg-gray-300  p-4 rounded flex flex-col items-center justify-evenly h-[90%]  '>
                <div className='h-[10%] w-[85%] lg:h-[20%] flex flex-col items-center justify-start' >
                    <img className='rounded-full h-[70%]  ' src={data.avtar} alt="" />
                    <p>Name: {data.username}</p>
                    <p>Email: {data.email}</p>
                </div>
                <div className='w-full mt-4 hidden bg-red-900 lg:block h-[2px]'></div>
                {
                    role === 'user' && (
                        <div className='  py-4 flex-col gap-2 items-start justify-start hidden lg:flex  '>

                            <Link className='text-2xl font-semibold   px-4 py-1   border-2 border-blue-400 rounded hover:bg-blue-300 ' to="/profile" >Favourite</Link>
                            <Link className='text-2xl font-semibold  px-4 py-1   border-2 border-blue-400  rounded hover:bg-blue-300 ' to="/profile/orderHistory">order History</Link>
                            <Link className='text-2xl font-semibold   px-4 py-1   border-2 border-blue-400  rounded hover:bg-blue-300  ' to="/profile/settings" >Settings</Link>

                        </div>
                    )
                }
                {
                    role === 'admin' && (
                        <div className=' p-4 flex-col gap-3 items-center justify-center hidden lg:flex'>

                            <Link className='text-2xl font-semibold   px-4 py-1   border-2 border-blue-400  rounded hover:bg-blue-300' to="/profile" >All Orders</Link>
                            <Link className='text-2xl font-semibold   px-4 py-1   border-2 border-blue-400  rounded hover:bg-blue-300' to="/profile/add-book">Add Book</Link>


                        </div>
                    )
                }
                <button onClick={
                    () => {
                        dispatch(authActions.logout())
                        dispatch(authActions.changerole("user"))
                        localStorage.clear("id")
                        localStorage.clear("token")
                        localStorage.clear("role")
                        history("/")
                    }

                }>Logout</button>
            </div >

        </>
    )
}

export default Sidebar