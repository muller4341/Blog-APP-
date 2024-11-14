import { Link,useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Spinner } from 'flowbite-react';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import { useSelector } from 'react-redux';



const Signup = () => {
    const [formData, setFormData] = useState()
    const navigate = useNavigate();
    const {theme } =useSelector((state=>state.theme))
    
    const [loading, setLoading] = useState(false);
    const[errorMessage, setErrorMessage] = useState(null);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()})
    };
    const handleSubmit =  async(e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            setErrorMessage('All fields are required. please fill them out');
            return;
        }
        try {
            setLoading(true);
            setErrorMessage(null);
        const res= await fetch('api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success=== false) {
                return setErrorMessage(data.message);
            }
            if (res.ok){
            navigate('/signin');
            }
        }
        catch (error) {
            setErrorMessage(error.message);    
        }

        finally {
            setLoading(false);
        }


    }



    console.log(formData)

    return (
            <div className=" flex  md:flex-row flex-col w-full h-full  ">
              
                {/* left */}
                <div 
  className="flex flex-col justify-center items-center md:w-1/2 w-full md:h-screen h-auto bg-yellow-100 text-gray-700
"
>
  <Link 
    to='/' 
    className='self-center whitespace-nowrap text-2xl sm:text-3xl font-semibold dark:text-white'
  >
    <span 
      className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white rounded-lg'
    >
      Muller's
    </span>
    Blog
  </Link>
  
  <p className='text-blue-700 text-[18px] m-4'>
    Valuable information will be shared in this blog, where anyone can access and read the posts, as well as leave comments.
  </p>
</div>

                
                {/* right */}
        <div className=' flex justify-center items-center md:w-1/2 w-full md:h-screen h-auto'>

        <form className="bg-white shadow-md rounded px-4 pt-4 pb-8 mb-4  w-3/4 h-2/3 ">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>

        {
          errorMessage && 
        ( 
            <div  className=' flex w-full h-8   rounded-lg m-2 justify-center items-center '>
        <p  className='text-red-500 m-2 text-[14px] font-semibold justify-center items-center'>
            {errorMessage}
            </p>
            </div>
            
        ) 
}


        <div className="mb-6">
          <button onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-yellow-600 to-red-600
             hover:from-yellow-700 hover:to-red-700
             text-white font-bold text-[24px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            disabled={loading}
          >
          { loading? ( 
            <>
            <Spinner className='w-8 h-8' color='gray' />
            <span className='ml-2'>Loading...</span>
            </> )
          
         : 'Sign Up'}   
          </button>
        </div>
        <GoogleAuth />
        <p className="text-center text-gray-500 text-xs">
          Already have an account?{' '}
          <a className="text-blue-500 hover:text-blue-700" href="/signin">
            Log in
          </a>
        </p>
      </form>


            </div>

        </div>
    
        
            
    )
}

export default Signup;
