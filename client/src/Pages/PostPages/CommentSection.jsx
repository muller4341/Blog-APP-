
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Alert} from 'flowbite-react';
import {TextInput} from 'flowbite-react'
import {useState} from 'react';
import { set } from 'mongoose';

const CommentSection =({postId} )=> {
    const{currentUser} = useSelector(state => state.user);
    const [comment , setComment] = useState('');
 const [commentError, setCommentError] = useState(null);
 const[success, setSuccess] = useState(null);

    const handleSubmit =async (e) => {
        e.preventDefault();
        if (comment.length < 1 || comment.length > 200) {
            setCommentError('Comment must be between 1 and 200 characters');
            setSuccess(null);
            return;
        }
        try{
    
        const res = await fetch('/api/comment/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                postId,
                content: comment,
                userId: currentUser._id,
            }), 
        });
        const data = await res.json();
        if(res.ok) {
            setComment('');
            setCommentError(null);
            setSuccess('Comment has been added successfully');
            console.log('success:','Comment has been added successfully');

        } else {

            setCommentError(data.message);
            setSuccess(null);

        }
    }
    catch (error) {

        setCommentError(error.message);
        setSuccess(null);
    }


    };
    const handleCommentChange = (e) => {
        setComment(e.target.value);
        setCommentError(null); // Clear error while typing
        setSuccess(null); // Clear success message while typing
    };
    return (
        <div className='max-w-2x1 mx-auto w-full p-3'>
        {currentUser? (
            <div className=' flex flx-row items-center gap-2 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img src={currentUser.profilePicture} alt={""} className='w-10 h-10 rounded-full object-cover'/>
                <Link to='/dashboard?tab=profile' className='text-cyan-600 test-xs hover:underline'>
                
                @{currentUser.username}
                
                </Link>
                
                
                
                
               </div>





        ):(
            <div className='text-sm tet-teal-500 my-5 flex gap-1'>
                <p>Want to join the conversation?</p>
                <Link to={'/signin'} className='text-blue-500 hover:underline'>
                    Sign in
                </Link>
            </div>

        )}
        {currentUser && (
            <form onSubmit={handleSubmit}    className='border border-teal-500 rounded-md p-3'>
                <TextInput
                placeholder='Add a comment...'
                rows='3'
                maxLength='200'
                onChange={handleCommentChange}
                value={comment}

                />
                <div className='flex justify-between items-center mt-5'>
                <p className='text-gray-500 text-sm'>{200 - comment.length} characters remaining </p>
                <Button 
                gradientDuoTone='purpleToBlue'

                type='submit'   
        
                
                >
                    Comment 


                </Button>

        


                </div>

                
                
              
         {commentError && (
            <Alert color='failure' className='mt-5'>
                {commentError}

            </Alert>
        )}
        {/* Success Alert for Successful Comment */}
        {success && (
                        <Alert color="success " className="mt-5">
                            {success}
                        </Alert>
                    )}

            </form>
            
            
            
            
        )}


            

        </div>
    );
    }

export default CommentSection;