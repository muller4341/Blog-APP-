
//import Google from "../../assets/google.png";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import {signInSuccess} from "../../redux/user/userSlice";
import { app} from "../../firebase";
import { useNavigate } from "react-router-dom";



const GoogleAuth = () => {
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const navigate = useNavigate();


    const provider= new GoogleAuthProvider();
    //console.log('provider', provider);
    
    const handleOnClick = async (event) => {
        event.preventDefault();
        
        provider.setCustomParameters({prompt: 'select_account'});
        console.log('provider', provider);

        try {
            const resultFromGoogle = await signInWithPopup (auth, provider);
            const res= await fetch('/api/auth/google', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email,
                    photoURL: resultFromGoogle.user.photoURL,

                }),
            })
            const data = await res.json();
            if (res.ok)
                   {
                   dispatch(signInSuccess(data));
                     navigate('/');

                   }
        }
        catch (error) {
            console.error('Error during fetch:', error);
        }
    }
    




    return (
        <div>
        <button className=" w-full h-10 border-1 flex justify-center items-center gap-2
        
        rounded-lg text-black font-semibold text-[18px]  outline-yellow-600 outline  dark:text-white  hover:bg-yellow-900"
         type="button " 
        
         onClick={(event)=>handleOnClick(event)} >

            
            continue with google
        </button>
        </div>
    )
}

export default GoogleAuth;