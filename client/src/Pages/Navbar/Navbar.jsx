import {Avatar, Button, Navbar} from 'flowbite-react'
import {Dropdown} from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaMoon} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../../redux/theme/themeSlice'
import { signOutSuccess } from '../../redux/user/userSlice'





const Header = () => {
 

    const path = useLocation();
    const dispatch = useDispatch();
    const handleToggle = () => {
      dispatch(toggleTheme()); // No payload needed
    };
  

    const{currentUser} = useSelector(state => state.user);
      console.log('current user', currentUser)

      const handelSignOut = async () => {
        try {
          const res= await fetch(`/api/user/signout`,{
            method: 'POST',
          });  
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signOutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    return (
        
            <Navbar className="border-2">
                <Link to='/' className='self-center whitespace-nowrap 
                text-2xl sm:text-3xl font-semibold dark:text-white '>
                    <span className='text-2xl sm:text-3xl font-bold
                    bg-gradient-to-r from-yellow-600 to-red-600 text-white rounded-lg '> Muller's
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

                <div  className='flex gap-2 md:order-1'>
                   <Button className='w-12 h-10  sm:inline  bg-gray-50
                    hover:bg-blue-400  rounded-lg flex justify-center items-center'>

                    <FaMoon className='text-2xl text-gray-600 ' onClick={()=>dispatch(toggleTheme())} />


                   </Button>
                   
                   {currentUser?(
                      <Dropdown
                      arrowIcon={false} 
                      inline
                      label={
                      <Avatar alt='user'  
                      img={currentUser.profilePicture}
                      rounded />}
                      >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>

                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=file'}>
                            <Dropdown.Item>Profile</Dropdown.Item>    
                        </Link>
                        <Dropdown.Divider/>
                            <Dropdown.Item onClick={handelSignOut}>Sign out</Dropdown.Item>
                        </Dropdown>




                   ):(
                    <Link to ='/signin' >
                    <button className=' border rounded-lg hover:bg-gradient-to-r from-purple-400  to-blue-400 
                     w-16 h-10 border-blue-400'  >
                        sign in 
                    </button>
                   </Link>

                   )}
                   

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



