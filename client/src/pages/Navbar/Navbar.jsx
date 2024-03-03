import {Navbar} from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'

const Header = () => {
    const path = useLocation();

    return (
        
            <Navbar className="border-2">
                <Link to='/' className='self-center whitespace-nowrap 
                text-2xl sm:text-3xl font-semibold dar:text-white '>
                    <span className='text-2xl sm:text-3xl font-bold
                    bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white rounded-lg '> Muller's
                    </span>
                    Blog

                </Link>

                <form className='flex '>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-2 rounded-lg hidden lg:inline w-56 h-10 bg-gray-100"
                    />
                    
                </form>

                <button className=' flex w-12 h-10 lg:hidden  border rounded-xl  justify-center items-center' color='gray' >

                    <AiOutlineSearch className='text-2xl' />
                </button>

                <div  className='flex gap-2 md:order-2'>
                   <button className='w-12 h-10 hidden sm:inline  bg-gray-50
                    hover:bg-blue-400  rounded-lg flex justify-center items-center'>

                    <FaMoon className='text-2xl text-gray-600 ' />


                   </button>
                   <Link to ='/signin' >
                    <button className=' border rounded-lg hover:bg-gradient-to-r from-purple-400  to-blue-400  w-16 h-10 border-blue-400'  >
                        sign in 
                    </button>
                   </Link>

                   <Navbar.Toggle/>

                </div>
                <Navbar.Collapse>
                    <Navbar.Link active={ path ==='/'} as={'div'}>
                        <Link to='/' className='text-[18px]'>Home</Link>
                    </Navbar.Link >
                    <Navbar.Link active={ path ==='/about'} as={'div'}>
                        <Link to='/about' className='text-[18px]'>About</Link>
                    </Navbar.Link>
                    <Navbar.Link active={ path ==='/projects'} as={'div'}>
                        <Link to='/projects' className='text-[18px]'>projects</Link>
                    </Navbar.Link>
                </Navbar.Collapse>





                




            
        </Navbar>
    )
}

export default Header;


