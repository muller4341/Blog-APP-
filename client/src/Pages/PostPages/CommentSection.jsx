import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Alert } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Comment from './Comment';

const CommentSection = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    console.log('comments:', comments);
 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length < 1 || comment.length > 200) {
            setCommentError('Comment must be between 1 and 200 characters');
           
            return;
        }
        try {
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

            if (res.ok) {
                setComment('');
                setCommentError(null);
                setComments((prevComments) => [data, ...prevComments]);
                console.log('Comment successfully added');
            } else {
                setCommentError(data.message);
                
            }
        } catch (error) {
            setCommentError(error.message);
           
        }
    };

   
    useEffect(() => {
        const getComments = async () => {   
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId}`); 
                    if (res.ok) {
                        const data = await res.json();
                        setComments(data);
                    }
                
            } catch (error) {
                console.log(error);
                
            }
    }
    getComments();
    }
    , [postId]);




    return (
        <div className="max-w-2x1 mx-auto w-full p-3">
            {currentUser ? (
                <div className="flex flx-row items-center gap-2 my-5 text-gray-500 text-sm">
                    <p>Signed in as:</p>
                    <img src={currentUser.profilePicture} alt="" className="w-10 h-10 rounded-full object-cover" />
                    <Link to="/dashboard?tab=profile" className="text-cyan-600 text-xs hover:underline">
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className="text-sm text-teal-500 my-5 flex gap-1">
                    <p>Want to join the conversation?</p>
                    <Link to={'/signin'} className="text-blue-500 hover:underline">
                        Sign in
                    </Link>
                </div>
            )}
            {currentUser && (
                <form onSubmit={handleSubmit} className="border border-teal-500 rounded-md p-3">
                    <TextInput
                        placeholder="Add a comment..."
                        rows="3"
                        maxLength="200"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-5">
                        <p className="text-gray-500 text-sm">{200 - comment.length} characters remaining </p>
                        <Button gradientDuoTone="purpleToBlue" type="submit">
                            Comment
                        </Button>
                    </div>

                    {/* Render error message */}
                    {commentError && (
                        <Alert color="failure" className="mt-5">
                            {commentError}
                        </Alert>
                    )}
                
                </form>
            )}
            {comments.length ==0? (
                <p className='text-sm my-5'class>No comments yet</p>
                
            ) : (
                <>
                <div className="mt-5 text-sm flex items-center gap-1 ">
                    <p>Comments</p>
                    <div className='border border-gray-400 py-1 px-2'>
                        <p>{comments.length}</p>

                    </div>

                   </div>
                 { comments.map((comment) => (


               <Comment
               key={comment._id}
               
               comment={comment}
               />

                 ))



                 }

                   </>
                )
                }
        </div>
    );
};

export default CommentSection;
