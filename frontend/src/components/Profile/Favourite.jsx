import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Bookcard from '../bookcard/Bookcard.jsx'

const Favourite = () => {
    // & headers of the page to sent
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    const [favbook, setFavbook] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:8080/api/v1/get-fav", { headers });
            setFavbook(response.data.data)
        }
        fetch()
    }, [])


    return (
        <>
            {favbook?.length === 0 && (
                <h3 className='flex items-center justify-center text-5xl'>No Books</h3>
            )}
            <div className='  grid lg:grid-cols-4 gap-4  '>
                {favbook && favbook.map((items, i) => (
                    <div key={i}>
                        <Bookcard dataprops={items} favourite={true} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Favourite