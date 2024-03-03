import { Link } from 'react-router-dom';

const Signin = () => {

    return (
            <div className=" flex  md:flex-row flex-col w-full h-full  ">
                {/* left */}
                <div className=' flex  flex-col justify-center items-center bg-yellow-100 md:w-1/2 w-full md:h-screen h-auto' >
                <Link to='/' className='self-center whitespace-nowrap 
                text-2xl sm:text-3xl font-semibold dar:text-white '>
                    <span className='text-2xl sm:text-3xl font-bold
                    bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white rounded-lg '> Muller's
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
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
          />
        </div>
        <div className="mb-6">
          <button
            className="w-full bg-red-400
             hover:bg-red-600
             text-white font-bold text-[24px] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Log in
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
