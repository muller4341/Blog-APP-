import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { set } from "mongoose";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const createPost=()=> {
   // const [content, setContent] = useState('');
   const {file , setFile} = useState(null);
   const [imageUploadProgress, setImageUploadProgress] = useState(null);
   const [imageUploadError, setImageUploadError] = useState(null);
   const [formData, setFormData] = useState({       
});
   const handleUploadImage = async () => {
    try {
        if (!file) {  
            setImageUploadError('Please select an image');
             return;
        }
        setImageUploadError(null);
        const storage = getStorage(app);
        const filename = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage,filename);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));
                console.log('Upload is ' + progress + '% done');
                
            },
            (error) => {
                setImageUploadError('An error occurred while uploading the image'); 
                setImageUploadProgress(null);
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUploadProgress(null);
                    setImageUploadError(null);
                    setFormData({ ...formData, image: downloadURL });
                    console.log('File available at', downloadURL);
                });
            }
        );
    } catch (error) {
        setImageUploadError('image upload failed');
        setImageUploadProgress(null);
        console.log(error);
        
    }


return (
<div  className="p-3 mx-auto min-h-screen">
    <h1 className="text-center my-7 font-bold text-[26px] bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-yellow-600 to-red-600">Create Post</h1>
    <form className=" flex flex-col gap-4">
        <div className="flex md:flex-row flex-col  justify-between gap-4 ">
            <TextInput  type="text"      
            placeholder="" required id="title" 
            className="flex-1"/>
            <Select>
                <option value="uncategorized">Select a Category </option>
                <option   value="javascript">  Javascript      </option>
                <option   value="reactjs">  React.js     </option>
                <option   value=" nextjs">  Next.js     </option>

            </Select>
            
            
             </div>
             <div  className="flex items-center  justify-between gap-4 p-3
             border-red-400 border-dotted border-4"> 
             <FileInput
              type='file' 
              accept='image/*'onChange={(e)=>setFile(e.target.files[0])}/>
             <Button type="button" 
             size='sm'  outline
             onClick={handleUploadImage} >
                  Upload Image </Button>
             </div>
             <ReactQuill theme="snow" placeholder="write something..." className="h-72 m-4"/>
             <Button className="m-4 " type="submit" size="lg" outline>
                <p className=" text-[20px] ">publish </p>

                </Button>
        </form>   

</div>


);

   }
}


export default createPost ; 