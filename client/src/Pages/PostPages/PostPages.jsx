import { set } from "mongoose";
import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { Button, Spinner } from 'flowbite-react'
import { Link } from "react-router-dom";
import CallToAction from "./CallToAction";

const PostPages = () => {
    const {postSlug} = useParams();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [error, setError] = useState(false);
   
   


    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    console.log(data.message);
                    return;
                }
               if (res.ok) {
                   setPost(data.posts[0]);
                   setLoading(false);
                   setError(false);
                   return
               }
            } catch (error) {
               
                setError(true);
                setLoading(false);
            }
        };

        fetchPost();
    }
    , [postSlug]);
    if(loading) 
        return (
            <div className="flex items-center justify-center h-screen">
            <Spinner size="xl" />
          </div>
        );

    return(
    <div className="container mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-800  my-4">
            {post && post.title}</h1>
            <Link to={`/search?category=${post && post.category}`}
        className='self-center '>
            <Button color='gray' pill size='xs '>{post && post.category}</Button>
            </Link>
            <div className="flex justify-center items-center bg-gray-700 w-3/4 mx-auto">
            <img src={post && post.image} alt={post && post.title}
             className="w-3/4 h-1/10 object-cover my-4"/>
            </div>
             <div className="flex justify-between p-3 border-b border-slate-500">
                <span>
                    {post && new Date(post.createdAt).toLocaleDateString()} 
                </span>

                <span>{post && (post.content.length/100).toFixed(0)} mins read</span>  
                
             </div>
             <div className="p-3 max-w-2xl mx-auto w-full post-content"
             dangerouslySetInnerHTML={{ __html: post && post.content }}

              >

             </div>

             <div className="max-w-4x1 mx-auto w-full">
                <CallToAction />
             </div>

    </div>
    );
 

    
};

export default PostPages;