import { TextInput } from "flowbite-react";
import { useSelector } from "react-redux";
import {Button} from  'flowbite-react';
import { useState , useRef, useEffect} from "react";
import {app}  from  "../../firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {  getDownloadURL,   getStorage, ref,  uploadBytesResumable} from 'firebase/storage';
import {Alert} from "flowbite-react";
import { set } from "mongoose";


const DashProfile = () => {
    const {currentUser} = useSelector((state)=>state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] =useState(0);
    const [imageFileUploadError, setImageFileUploadError] =useState(null);
    const filePickerRef = useRef();
    const imageChangeHandler = (e) => {
      const file = e.target.files[0];
      if(file){
        setImageFile(file);
        setImageFileUrl ( URL.createObjectURL(file));
        
      }
    };
         useEffect(() => {
        if(imageFile){
          uploadImage(imageFile);
          }
      }, [imageFile]);
    const uploadImage = async () => {
      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write: if request.resource.size< 2*1024*1024 && 
      //       request.resource.contentType.matches('image/.*')
      //     }
      //   }
      // }
      const storage= getStorage(app)
      const fileName= new  Date().getTime() + imageFile.name;
      const storageRef= ref(storage, fileName);
      const uploadTask= uploadBytesResumable(storageRef, imageFile)
      uploadTask.on(
        'state_changed', 
        (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
              setImageFileUploadProgress(progress.toFixed(0));

        }

      ),
            (error) =>{
        setImageFileUploadError("image could not upload , file muse be less than 2mb", error);

        setImageFile(null);
        setImageFileUploadProgress(null);
        setImageFileUrl(null);

      }
      ,
      ()=>{

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setImageFileUrl(downloadURL);
        })

      }

    };
    


    return(
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="text-center p-5 font-semibold text-[24px]">Profile</h1>
      <form className="flex flex-col gap-2">
        <input type="file"  accept='image/*' onChange={imageChangeHandler} ref={filePickerRef}
        hidden />
        <div className=" relative w-32 h-32 self-center cursor-pointer shadow-md
        rounded-full overflow-hidden " onClick={()=> filePickerRef.current.click()}>
          {imageFileUploadProgress && (<CircularProgressbar 
          value={imageFileUploadProgress} 
          text={`${imageFileUploadProgress}%`}
          strokeWidth={5}
          styles= {{
                root:{
                  height:'100%',
                  width:'100%',
                  position:'absolute',
                  top:0,
                  left:0
                },
                path:{
                  stroke:`rgba(62, 138, 224, ${imageFileUploadProgress/100})`,
                  transition:'stroke-dashoffset 0.5s ease 0s',
                },
          }}
          />) }  
        <img src={imageFileUrl || currentUser.profilePicture} alt="profile"  
        className={`rounded-full w-full h-full border-8 border-gray-300
        object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
        </div>
        {imageFileUploadError && <Alert Alert className="text-red-500">{imageFileUploadError}</Alert>}
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
