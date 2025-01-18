import { Link } from "react-router-dom";
import CallToAction from "../PostPages/CallToAction";
import PostCard from "../PostPages/PostCard";
import { useEffect } from "react";
import { useState } from "react";
const Home = () => {
  const[posts, setPosts]= useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }
  , []);


  return (
    <div>
      <div className=" flex flex-col gap-6 p-28  px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center lg:text-5xl">
          Welcome to the Home Page
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm">here you will find different posts of photos and other thing thatcan make the write thing</p>
        <Link to="/search" className="text-teal-500 text-xs sm:text-sm font-bold hover:underline  w-auto">
        View Posts
      </Link>

      </div>
      <div className="p-3 bg-amber-100 dark:bg-sate-700"> d
        <CallToAction/>

      </div>
      <div className="max-w-6x1 mx-auto p-3 flex flex-col gap-8 py-7">

        {posts&& posts.length>0 &&(
         <div className=" flex flex-col gap-6">
          <h2 className="text-2x1 font-semibold"> Recent Posts</h2>
          <div className="flex flex-wrap gap-4">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />

            ))}
            </div>
            <Link to="/search" className="text-teal-500 text-xs sm:text-sm font-bold hover:underline  w-auto">
            View all posts
            </Link>
          </div>

        )}
      </div>
       

    </div>
  );
}

export default Home;

