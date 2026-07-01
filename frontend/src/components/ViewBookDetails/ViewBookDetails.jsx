import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const ViewBookDetails = () => {
    const history = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState()

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const role = useSelector((state) => state.auth.role)


    const fetchdata = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/get-book-by-id/${id}`)
            console.log("daata is here", res.data.data)
            setData(res.data.data)


        } catch (error) {
            console.log("error ", error)
        }
    }
    useEffect(() => {
        fetchdata()
    }, [])

    // & headers of the page to sent
    const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    }

    // * add to favourite integration 
    const handlefavourite = async () => {
        try {
            const response = await axios.put("http://localhost:8080/api/v1/add-to-fav", {}, { headers });
            alert(response.data.message);
        } catch (error) {
            console.log(error)
        }
    }

    // * add to cart integration 
    const handlecart = async () => {
        try {
            const response = await axios.put("http://localhost:8080/api/v1/add-to-cart", {}, { headers });
            alert(response.data.message);
        } catch (error) {
            console.log(error)
        }
    }
    //! delete the book from the server 

    const deletebook = async () => {
        try {
            const res = await axios.delete("http://localhost:8080/api/v1/delete-book", { headers })
            alert(res.data.message)
            history("/all-books")
        } catch (error) {
            console.log("error while deletting", error, error.message)
        }
    }
    console.log("tehe id ", id)
    return (
        <>
            {data && (<div className='px-10 py-8 bg-lime-900 flex flex-col md:flex-row gap-6'>

                <div className=' w-full lg:w-3/6 bg-gray-300 rounded p-4 h-[70vh] lg:h-[85vh] flex flex-col lg:flex-row justify-center items-center gap-8'>
                    <img src={data.url} alt="/image here" className=' h-[62vh] lg:h-[75vh] lg:w-auto' />
                    {
                        isLoggedIn === true && role === "user" && (<div className='flex flex-row lg:flex-col gap-4 '>

                            <button className='text-4xl bg-white   rounded lg:rounded-full text-blue-600 p-3 flex items-center justify-center gap-1 ' onClick={handlefavourite}> <FaHeart />
                                <span className='block lg:hidden text-2xl'>Add to favourite</span>
                            </button >
                            <button className='text-4xl rounded lg:rounded-full bg-white text-red-600  p-3 flex items-center justify-center gap-1' onClick={handlecart}>  <FaShoppingCart />{""}
                                <span className=' block lg:hidden text-2xl'>add to cart</span></button>

                        </div>)
                    }
                    {
                        isLoggedIn === true && role === "admin" && (<div className='flex flex-row lg:flex-col gap-4 '>

                            <Link to={`/update-book/${id}`} className='text-4xl bg-white   rounded lg:rounded-full text-blue-600 p-3 flex items-center justify-center gap-1 '> <FaEdit />
                                <span className='block lg:hidden text-2xl'>Edit</span>
                            </Link >
                            <button className='text-4xl rounded lg:rounded-full bg-white text-red-600  p-3 flex items-center justify-center gap-1' onClick={deletebook}>  <MdDelete />{""}
                                <span className=' block lg:hidden text-2xl'>Delete</span></button>

                        </div>)
                    }
                </div>
                <div className='w-full lg:w-3/6 bg-gray-300 rounded p-4'>

                    <p>{data.title}</p>
                    <p>By {data.author}</p>

                    <p className='text-xl'>{data.desc}</p>
                    <p>{data.language}</p>
                    <p className='text-3xl'>{data.price}</p>

                </div>
            </div>)}
            {!data && (<div className='h-screen flex justify-center items-center bg-zinc-600'><Loader /></div>)}
        </>
    )
}

export default ViewBookDetails