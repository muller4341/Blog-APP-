import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Spinner } from 'flowbite-react';
import {signInStart, signInSuccess,signInFail} from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import {amanuel3} from '../../assets';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';




const SignIn = () => {

    const dispatch = useDispatch();
    const [isFirstSentence, setIsFirstSentence] = useState(true);

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

    useEffect(() => {
        const interval = setInterval(() => {
          setIsFirstSentence((prev) => !prev);
        }, 4000); // Switch every 2 seconds (adjust timing as needed)
        return () => clearInterval(interval);
      }, []);
    
      
      const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
      };
    



    return (
            <div className=" flex  md:flex-row flex-col w-full h-full  dark:bg-gray-500">
                {/* left */}
                <div className=' py-28 md:py-0 flex  flex-col justify-center items-center bg-yellow-100 md:w-1/2 w-full md:h-screen h-auto
                dark:bg-gray-900
                dark:border-gray-1000 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 
                dark:hover:border-gray-800 dark:hover:shadow-lg dark:hover:shadow-lg ' >
                <img src={amanuel3} alt='logo' className='md:w-60 md:h-60 h-40 w-40 inline' />
                <AnimatePresence mode="wait">
        {isFirstSentence ? (
          <motion.h1
            key="welcome"
            className="text-3xl font-bold text-center lg:text-5xl bg-gradient-to-r
             from-pink-500 to-yellow-500 bg-clip-text text-transparent
             font-[cursive] italic tracking-wide ml-2 "
              style={{ fontFamily: 'Garamond, Georgia, serif' }}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 1,
              staggerChildren: 0.5,
            }}
          >
            <motion.span variants={wordVariants}>Welcome </motion.span>
            <motion.span variants={wordVariants}>to </motion.span>
            <motion.span variants={wordVariants}>Amanuel </motion.span>
            <motion.span variants={wordVariants}>Hub</motion.span>
          </motion.h1>
        ) : (
          <motion.h1
            key="home"
            className="text-3xl font-bold text-center lg:text-5xl bg-gradient-to-r
             from-pink-500 to-yellow-500 bg-clip-text text-transparent
             font-[cursive] italic tracking-wide ml-2 "
            style={{ fontFamily: 'Garamond, Georgia, serif' }}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: 1,
              staggerChildren: 0.5,
            }}
          >
            <motion.span variants={wordVariants}>The </motion.span>
            <motion.span variants={wordVariants}>Home </motion.span>
            <motion.span variants={wordVariants}>of </motion.span>
            <motion.span variants={wordVariants}>Everyone</motion.span>
          </motion.h1>
        )}
      </AnimatePresence>
                </div>
                {/* right */}
        <div className=' flex justify-center items-center md:w-1/2 w-full md:h-screen h-auto
        dark:bg-gray-900
        dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-1000 dark:hover:text-gray-100 
        dark:hover:border-gray-800 dark:hover:shadow-lg dark:hover:shadow-lg '>

        <form className="bg-white shadow-md rounded rounded-md px-4 pt-4 pb-8 mb-4  w-3/4 h-2/3  dark:bg-gray-800 dark:text-white ">
        
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
            className="w-full outline-yellow-600 outline
             hover:bg-yellow-900
             text-white font-bold md:text-[20px]  text-[18px] py-2 px-4 rounded "
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
        <p className=" text-[16px] font-semibold text-center text-gray-500 text-xs dark:text-white py-2">
          Have not account?{' '}
          <Link to='/signup' className=" text-[16px] text-blue-500 hover:underline  dark:text-blue-800 px-2 font-semibod" >
            Sign up
          </Link>
        </p>
      </form>


            </div>

        </div>
    
        
            
    )
}

export default SignIn;
