import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import {Table,Modal, Button} from "flowbite-react"
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";



const DashPosts = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    console.log ("userposts", userPosts)
    useEffect(() => {
        
        const fetchPosts = async() =>{
     try {
        
        const res = await fetch (`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok ){
            setUserPosts(data.posts)
            if (data.posts.length < 9){
                setShowMore(false)
             }

     } 
    }
     
     catch (error) {
        console.log(error.message)
        
     }

        };
        if (currentUser.isAdmin){
             fetchPosts();
           
        }
    }, [currentUser._id]);

const handelShowMore= async() => {

    const startIndex = userPosts.length;

    try {
            
            const res = await fetch (`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json()
            if (res.ok ){
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9){
                    setShowMore(false)
                }
    
            }


        } 
        
        catch (error) {
            console.log(error.message)
            
        }


};
const handelDeletePost = async() => {
    setShowModal(false);
    try{
        const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
            method: 'DELETE',
            
        });
        const data = await res.json();
        if (res.ok){
            console.log(data.message)
        }
        else
        {
            setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
        }

    }
    catch (error) {
        console.log(error.message)


}
};




    return (


        <div className="table-auto overflow-x-scroll md:mx-auto p-3  scrollbar
        scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700
        dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && userPosts.length >0? (
                <>
                <Table hoverable className = 'shadow-md'>
                    <Table.Head>
                        <Table.HeadCell> Date  updated</Table.HeadCell>
                        <Table.HeadCell> Post  Image</Table.HeadCell>
                        <Table.HeadCell> Post  Title</Table.HeadCell>
                        <Table.HeadCell> Category </Table.HeadCell>
                       <Table.HeadCell> Deleted</Table.HeadCell>
                       <Table.HeadCell> 
                        <span> Edit</span>
                       </Table.HeadCell>
                    </Table.Head>
                    {userPosts.map((post) => (
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>
                                     { new Date (post.updatedAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    <Link to={`/post/${post.slug}`}>
                                    <img src={post.image} 
                                    alt={post.title}
                                     className="h-20 w-40 object-cover 
                                     bg-gray-500"/>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link className='font-medium text-black  dark:text-white'to={`/post/${post.slug}`}>
                                    {post.title}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    {post.category}
                                </Table.Cell>
                                <Table.Cell>
                                    <span  onClick={() => {
                                    setShowModal(true);
                                    setPostIdToDelete(post._id);


                                    }}
                                     className="font-medium text-red-500 hover:underline cursor-pointer"> Delete
                                    </span>

                                </Table.Cell>
                                <Table.Cell>
                                    <Link className='text-teal-500  hover:underline 'to={`/update-post/${post._id}`}>
                                    <span> Edit</span>
                                    </Link>
                                </Table.Cell>

                            </Table.Row>
                            

                        </Table.Body>
                    ))

                    
}

                </Table>
                {showMore && (
                                <button className="bg-blue-500 text-white p-2 w-full"
                                onClick={handelShowMore}>
                                    Show More
                                </button>)
                                }
                    </>
                
            ):(
                <p>
                    No posts found

                    </p>
                )}

        <Modal show={showModal} onClose={()=> setShowModal(false)}  popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div  className=" flex  flex-col justify-center items-center">
              <HiOutlineExclamationCircle className="text-red-500 text-[50px]"/>
              <p className="text-red-600"> Are you shure you want to delete this post?
                
              </p>  
              <div className="flex flex-row  mx-4  md:space-x-20 space-x-4 mt-2">
                <Button onClick={handelDeletePost} color='failure' >yes,I'm sure</Button>
                <Button onClick={()=> setShowModal(false)} >No, cancel</Button>



              </div>

            </div>
          </Modal.Body>
            


          </Modal>

            </div>

    )
}



export default DashPosts
