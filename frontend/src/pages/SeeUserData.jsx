import React from 'react'
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userData, setUserDiv, userDiv }) => {
    return (
        < >
            <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 `}></div>{" "}
            <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>

                <div className='bg-white rounded p-4 w[80%] md:w-[50%] lg:w-[40%]'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl font-semibold'>user Information</h1>
                        <button onClick={() => {
                            setUserDiv("hidden")
                        }}>
                            <RxCross1 />
                        </button>
                    </div>
                    <div>
                        <label htmlFor="">
                            Username:
                            <span className='font-semibold'>{userData.username}</span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            Email:
                            <span className='font-semibold'>{userData.email}</span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="">
                            Address:
                            <span className='font-semibold'>{userData.address}</span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeeUserData