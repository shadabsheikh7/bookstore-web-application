import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Profile/Sidebar'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import MobileNav from '../components/Profile/MobileNav'

const Profile = () => {
    const [profile, setProfile] = useState()
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`
    }

    useEffect(() => {
        const fetchdata = async () => {
            try {

                const res = await axios.get("http://localhost:8080/api/v1/user-details", { headers })
                console.log(res.data)
                setProfile(res.data)
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchdata()
    }, [])

    // * fetch user details


    return (
        <>

            <div className='bg-lime-900 px-2 md:px-12 py-8 flex flex-col md:flex-row     gap-4'>
                {!profile && (<div className='w-full h-[100%] flex items-center justify-center'>
                    <Loader />
                </div>)}
                {profile && (
                    <>
                        <div className='w-full md:w-1/6 h-auto lg:h-screen'>
                            <Sidebar data={profile} />
                            <MobileNav />
                        </div>
                        <div className='w-full md:w-5/6'><Outlet /></div>
                    </>
                )

                }

            </div>

        </>
    )
}

export default Profile