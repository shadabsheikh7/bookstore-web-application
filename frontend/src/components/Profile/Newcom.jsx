import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
const Newcom = () => {
    const [orderHistory, setorderHistory] = useState()
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/v1/get-order-history", { headers })
                setorderHistory(res.data.data)
                console.log(orderHistory)
            } catch (error) {
                console.log("error in orderhistory", error)
            }
        }
        fetch()
    }, [])

    return (
        <>
            {!orderHistory && <Loader />}
            {orderHistory && orderHistory.length === 0 && (
                <div className='h-[80vh] p-4 bg-zinc-400'>
                    <div className='h-[100%] flex flex-col items-center justify-center'>
                        <h1 className='text-5xl font-semibold text-zinc-500 mb-8 grid place-items-center'>no order history</h1>
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/boy-with-no-goods-in-shopping-cart-illustration-download-svg-png-gif-file-formats--empty-order-data-basket-pack-e-commerce-illustrations-10018100.png" alt="" className='h-[20vh] mb-8' />
                    </div>
                </div>
            )}

            {orderHistory && orderHistory.length > 0 && (
                <div className='h-[100%] p-0 md:p-4 text-zinc-200'>
                    <h1 className='text-white font-semibold text-3xl grid place-items-center mb-2'>Your order history</h1>
                    <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                        <div className='w-[3%]'>
                            <h1>Sr.</h1>
                        </div>
                        <div className='w-[22%]'>
                            <h1>Books</h1>
                        </div>
                        <div className='w-[45%]'>
                            <h1>Description</h1>
                        </div>
                        <div className='w-[9%]'>
                            <h1>Price</h1>
                        </div>
                        <div className='w-[16%]'>
                            <h1>Status</h1>
                        </div>
                        <div className='w-none md:w-[5%] hidden md:block'>
                            <h1>Mode</h1>
                        </div>
                    </div>
                    {orderHistory?.map((items, i) => (
                        <div className='w-full rounded py-2 px-4   text-zinc-100'>

                            <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
                                <div className='w-[3%]'>
                                    <h1>{i + 1}</h1>
                                </div>
                                <Link to={`/view-book-details/${items.book._id}`} className='w-[22%] hover:text-blue-400'>
                                    <h1>{items.book.title}</h1>
                                </Link>
                                <div className='w-[45%]'>
                                    <h1>{items.book.desc.slice(0, 50)}...</h1>
                                </div>
                                <div className='w-[9%]'>
                                    <h1>₹ {items.book.price}</h1>
                                </div>
                                <div className='w-[16%]'>
                                    <h1>{items.status}</h1>
                                </div>
                                <div className='w-none md:w-[5%] hidden md:block'>
                                    <h1>Mode</h1>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </>
    )
}

export default Newcom