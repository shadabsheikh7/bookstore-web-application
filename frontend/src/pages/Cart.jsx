import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader/Loader'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const [cart, setCart] = useState()
    const [total, setTotal] = useState(null)
    const navigate = useNavigate()
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get("http://localhost:8080/api/v1/get-cart-item", { headers })
            setCart(res.data.data)
        }
        fetch()
    }, [])

    useEffect(() => {
        if (cart && cart.length > 0) {
            let total = 0;
            cart.map((items) => {
                total += items.price
            })
            setTotal(total)
            total = 0
        }
        console.log("cart is jerejfkjkfffkjkjfdfgdfsjfffffffffffffffffff", cart)
    }, [cart])

    const deleteitem = async (bookid) => {
        const res = await axios.put(`http://localhost:8080/api/v1/rem-from-cart/${bookid}`, {}, { headers })
        alert(res.data.message);
    }

    const placeorder = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/do-order", { order: cart }, { headers })
            alert(res.data.message);
            navigate("/profile/orderHistory")
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className='px-12 py-8 bg-lime-900'>
            {cart?.length === 0 && (<>
                <div><h3>no itmes in the cart</h3></div>
            </>)}
            {!cart && (
                <><Loader /></>
            )}

            {cart?.length > 0 &&
                (<>
                    <h1 className='text-5xl font-semibold text-black'>your cart</h1>
                    {cart.map((items, i) => (
                        <div className='flex my-4 p-4 bg-gray-300 flex-col md:flex-row justify-between items-center gap-6' key={i}>
                            <img src={items.url} alt="" className='h-[20vh] md:h-[10vh] object-cover' />
                            <div className='w-full md:w-auto'>
                                <h1 className='text-2xl font-semibold text-start'>{items.title}</h1>
                                <p className='text-normal hidden lg:block'>{items.desc.slice(0, 100)}</p>
                                <p className='text-normal hidden md:block lg:hidden'>{items.desc.slice(0, 65)}</p>
                                <p className='text-normal block md:hidden  '>{items.desc.slice(0, 65)}</p>

                            </div>
                            <div className='flex mt-4 w-full md:w-auto items-center gap-4 justify-between'>
                                <h2 className='text-3xl font-semibold'>₹ {items.price}</h2>
                                <button className='rounded p-2 bg-red-500' onClick={() => { deleteitem(items._id) }}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </>)
            }
            {cart && cart.length > 0 && (
                <div className='mt-4 flex items-center justify-end'>
                    <div className='p-4 bg-zinc-300 rounded'>
                        <h1 className='text-3xl'>Total Amount</h1>
                        <div className='flex mt-3 justify-between items-center'>
                            <h2 className='font-semibold text-2xl'>{cart.length} books</h2>
                            <h2 className='font-semibold text-2xl'>₹ {total}</h2>

                        </div>
                        <div className='w-[100%] mt-3'>
                            <button onClick={placeorder} className='px-4 py-2 bg-blue-700 w-full justify-center items-center text-white '>Place your order </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart