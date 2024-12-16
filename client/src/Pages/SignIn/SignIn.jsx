import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Spinner } from 'flowbite-react';
import {signInStart, signInSuccess,signInFail} from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import GoogleAuth from '../GoogleAuth/GoogleAuth';




const SignIn = () => {

    const dispatch = useDispatch();


    const [formData, setFormData] = useState({})
    const navigate = useNavigate();
    const {loading, error: errorMessage} = useSelector(state => state.user);  

    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()})
    };
    const handleSubmit =  async(e) => {
        e.preventDefault();

        if ( !formData.email || !formData.password) {
            return dispatch(signInFail('All fields are required. please fill them out'));
        }
        try {
            dispatch(signInStart());  
        const res= await fetch('api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success=== false) {
            return dispatch(signInFail('Invalid credentials. Please try again.'));
            }
            
            if (res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
                }
            
        }
        catch (error) {
            console.error('Error during fetch:', error);
            dispatch(signInFail(error.message));
            }   
            


    }



    return (
            <div className=" flex  md:flex-row flex-col w-full h-full  dark:bg-gray-500">
                {/* left */}
                <div className=' flex  flex-col justify-center items-center bg-yellow-100 md:w-1/2 w-full md:h-screen h-auto
                dark:bg-gray-700
                dark:border-gray-1000 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 
                dark:hover:border-gray-800 dark:hover:shadow-lg dark:hover:shadow-lg ' >
                <Link to='/' className='self-center whitespace-nowrap 
                text-2xl sm:text-3xl font-semibold dar:text-white '>
                    <span className='text-2xl sm:text-3xl font-bold
                    bg-gradient-to-r from-yellow-600 to-red-600  text-white rounded-lg '> Muller's
                    </span>
                    Blog

                </Link>
                <p className=' text-blue-700 text-[18px] m-4'>
                Valuable information will be shared in this blog, where anyone can access and read the posts, as well as leave comments.</p>,

                </div>
                {/* right */}
        <div className=' flex justify-center items-center md:w-1/2 w-full md:h-screen h-auto
        dark:bg-gray-700
        dark:border-gray-1000 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 
        dark:hover:border-gray-800 dark:hover:shadow-lg dark:hover:shadow-lg '>

        <form className="bg-white shadow-md rounded px-4 pt-4 pb-8 mb-4  w-3/4 h-2/3  dark:bg-gray-500 dark:text-white ">
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******"
            onChange={handleChange}
          />
        </div>

            {
                errorMessage&& 
                ( 
                    <div  className=' flex w-full h-8   rounded-lg m-2 justify-center items-center '>
                <p  className='text-red-500 m-2 text-[14px] font-semibold justify-center items-center'>
                    {errorMessage}
                    </p>
                    </div>
                    
                ) 
            }

        <div className="mb-6">
          <button
            className="w-full bg-gradient-to-r from-yellow-600 to-red-600
             hover:bg-red-600
             text-white font-bold text-[24px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
             {loading? ( 
             <><Spinner className="animate-spin" />
             <span> Loading...</span>
             </>)
             :"Login" }
             
            
          </button> 
        </div>
        <GoogleAuth /> 
        <p className="text-center text-gray-500 text-xs dark:text-white">
          Have not account?{' '}
          <Link to='/signup' className="text-blue-500 hover:text-blue-900 dark:text-blue-800" >
            Sign up
          </Link>
        </p>
      </form>


            </div>

        </div>
    
        
            
    )
}

export default SignIn;
