import React, { useState, useEffect } from 'react'
import axios from "axios"
import Bookcard from '../bookcard/Bookcard'
import Loader from '../Loader/Loader'

const RecentlyAdded = () => {
    const [data, setData] = useState()
    const fetchdata = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/get-recent-books")
            setData(res.data.data)


        } catch (error) {
            console.log("error ", error)
        }
    }
    useEffect(() => {
        fetchdata()

    }, [])

    return (
        <>
            <div className='p-4 mt-8 bg-zinc-700'>
                <h4 className='text-3xl grid place-items-center text-blue-200 font-semibold'>Recently added books</h4>
                {!data && <div className='flex items-center justify-center my-4 '> <Loader /></div>}
                <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
                    {data && data.map((items, i) => <div key={i}>
                        <Bookcard dataprops={items} />
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default RecentlyAdded