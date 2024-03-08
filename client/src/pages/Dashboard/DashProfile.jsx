import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import {Button} from  'flowbite-react';

const DashProfile = () => {
    const {currentUser} = useSelector((state)=>state.user);

    return(
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="text-center p-5 font-semibold text-[24px]">Profile</h1>
      <form className="flex flex-col gap-2">
        <div className="  w-32 h-32 self-center cursor-pointer shadow-md
        rounded-full overflow-hidden">
        <img src={currentUser.profilePicture} alt="profile"  
        className="rounded-full w-full h-full border-8 border-gray-300
        object-cover"/>
        </div>
        <TextInput type="text" id="username" value={currentUser.username} placeholder="username"/>
        <TextInput type="email" id="email" value={currentUser.email} placeholder="email"/>
        <TextInput type="password"  placeholder="password"id='password'/>
        <Button type='submit' outline>
          <p className="text-[20px]">Update</p>

        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer"> Delate Account</span>
        <span className="cursor-pointer"> Sign out</span>
      </div>

    </div>
            )
}

export default DashProfile;
