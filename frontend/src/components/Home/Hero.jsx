
import library from '../../assets/library2.png'
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <>
            <div className='bg-green-700c h-auto flex gap-2 flex-col lg:flex lg:flex-row '>
                <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
                    <h1 className='font-semibold text-2xl md:text-3xl lg:text-5xl text-yellow-400 tracking-wide font-mono text-center lg:text-left'>
                        "A room without books is like a body without a soul."
                        - Marcus Tullius Cicero
                    </h1>
                    <p className='text-yellow-500 text-xl mt-3 text-center lg:text-left' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis suscipit, ad corporis recusandae voluptates in sequi dolor perspiciati.</p>
                    <div className='mt-8'>
                        <Link to="all-books" className=' bg-yellow-100 border-2 border-black text-black font-semibold text:xl lg:text-2xl px-12   py-2 rounded-full  hover:bg-yellow-300'>Discover Books</Link>
                    </div>
                </div>

                {/* image div svg */}
                <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center  '>
                    <img className='w-[90%] h-auto' src={library} alt="" />
                </div>
            </div>
        </>
    )
}

export default Hero