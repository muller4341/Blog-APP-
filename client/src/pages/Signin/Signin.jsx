import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Spinner } from 'flowbite-react';


const Signin = () => {



    const [formData, setFormData] = useState()
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const[errorMessage, setErrorMessage] = useState(null);
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value.trim()})
    };
    const handleSubmit =  async(e) => {
        e.preventDefault();

        if ( !formData.email || !formData.password) {
            setErrorMessage('All fields are required. please fill them out');
            return;
        }
        try {
            setLoading(true);
            setErrorMessage(null);
        const res= await fetch('api/auth/signin', {
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
                navigate('/');
                }
            
        }
        catch (error) {
            console.error('Error during fetch:', error);
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
                <div className=' flex  flex-col justify-center items-center bg-yellow-100 md:w-1/2 w-full md:h-screen h-auto' >
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
        <div className=' flex justify-center items-center md:w-1/2 w-full md:h-screen h-auto'>

        <form className="bg-white shadow-md rounded px-4 pt-4 pb-8 mb-4  w-3/4 h-2/3 ">
        
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
          <button
            className="w-full bg-gradient-to-r from-yellow-600 to-red-600
             hover:bg-red-600
             text-white font-bold text-[24px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
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
        <p className="text-center text-gray-500 text-xs">
          Have not account?{' '}
          <a className="text-blue-500 hover:text-blue-700" href="/signup">
            Sign up
          </a>
        </p>
      </form>


            </div>

        </div>
    
        
            
    )
}

export default Signin;
