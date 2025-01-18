import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiAnnotation, HiArrowSmUp, HiDocument, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const DashboardComponent = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
      const currentUser = useSelector((state) => state.user.currentUser);
      useEffect(() => {
        const fetchUsers = async () => {
            try {
            const res = await fetch('/api/user/getusers?limit=5');
            const data = await res.json();
            if (res.ok) {
                setUsers(data.users);
                setTotalUsers(data.totalUsers);
                setLastMonthUsers(data.lastMonthUsers);
                console.log('lastMonthUsers:', data.lastMonthUsers);
            }
        }
    
     catch (error) {
        console.log(error.message);
    }
        }
        const fetchPosts = async () => {
            try{
            const res = await fetch('/api/post/getposts?limit=5');
            const data = await res.json();
            if (res.ok) {
                setPosts(data.posts);
                setTotalPosts(data.totalPosts);
                setLastMonthPosts(data.lastMonthPosts);
        }
    }catch (error) {
        console.log(error.message);
        }
    }
        const fetchComments = async () => {
                try {
            const res = await fetch('/api/comment/getcomments?limit=5');
            const data = await res.json();
            if (res.ok) {
                setComments(data.comments);
                setTotalComments(data.totalComments);
                setLastMonthComments(data.lastMonthComments);
            }
        }
        catch (error) {
            console.log(error.message);
        } 

        }
        if (currentUser.isAdmin) {
        fetchUsers();
        fetchPosts();
        fetchComments();
        }
        
    }
    , [currentUser] );



    


    return (
        <div className='p-3 md:mx-auto'>
         <div className='flex-wrap gap-4 flex justify-center '>
        <div className='flex flex-col p3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
                <div className="">
                    <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                    <p className='text-2x1'>{totalUsers}</p>
                </div>
                    <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-[30px] p3 shadow-lg'/> 
            </div>
                <div className='flex gap-2 text-sm'>
                    <span className=" text-green-500 flex items-center">
                        <HiArrowSmUp/>
                       {lastMonthUsers}
                    </span>
                    <div className='tet-gray-500'> Last moth users </div>
                </div>
        </div>
        <div className='flex flex-col p3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
                <div className="">
                    <h3 className='text-gray-500 text-md uppercase'>Total comments</h3>
                    <p className='text-2x1'>{totalComments}</p>
                </div>
                    <HiAnnotation className='bg-indigo-600 text-white rounded-full text-[30px] p3 shadow-lg'/> 
            </div>
                <div className='flex gap-2 text-sm'>
                    <span className=" text-green-500 flex items-center">
                        <HiArrowSmUp/>
                       {lastMonthComments}
                    </span>
                    <div className='tet-gray-500'> Last moth comments </div>
                </div>
        </div>
        <div className='flex flex-col p3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
            <div className='flex justify-between'>
                <div className="">
                    <h3 className='text-gray-500 text-md uppercase'>Total posts</h3>
                    <p className='text-2x1'>{totalPosts}</p>
                </div>
                    <HiDocumentText className='bg-lime-600 text-white rounded-full text-[30px] p3 shadow-lg'/> 
            </div>
                <div className='flex gap-2 text-sm'>
                    <span className=" text-green-500 flex items-center">
                        <HiArrowSmUp/>
                       {lastMonthPosts}
                    </span>
                    <div className='tet-gray-500'> Last moth posts </div>
                </div>
        </div>
        </div>
        <div className=' flex flex-wrap gap-4 justify-center py-3 mx-auto'>
            <div className='flex flex-col p-2 dark:bg-gray-800 gap-4 md:w-auto w-full rounded-md shadow-md'>
                <div className=' flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent users</h1>
                    <Button outline gradientDuoTone='purpleToPink' className=''>
                        <Link to={"/dashboard?tab=posts"}>View all </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell> User image </Table.HeadCell>
                        <Table.HeadCell> User name</Table.HeadCell>
                    </Table.Head>
                    {users && users.map((user) => (
                    <Table.Body key={user._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>
                                <img src={user.profilePicture} alt="user" className='w-10 h-10 rounded-full bg-gray-500'/>
                            </Table.Cell>
                            <Table.Cell>
                                {user.username}
                            </Table.Cell>
                        </Table.Row>
                        
                            
                    
                    </Table.Body>
                    ))}
                         

                </Table>
            </div>
            <div className='flex flex-col p-2 dark:bg-gray-800 gap-4 md:w-auto w-full rounded-md shadow-md'>
                <div className=' flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent comments</h1>
                    <Button outline gradientDuoTone='purpleToPink' className=''>
                        <Link to={"/dashboard?tab=comments"}>View all </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell> comment content  </Table.HeadCell>
                        <Table.HeadCell> Likes</Table.HeadCell>
                    </Table.Head>
                    {comments && comments.map((comment) => (
                    <Table.Body key={comment._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell className='w-96'>
                               <p className='line-clamp-2'>{comment.content}</p>
                            </Table.Cell>
                            <Table.Cell>
                                {comment.numberOfLikes}
                            </Table.Cell>
                        </Table.Row>
                        
                            
                    
                    </Table.Body>
                    ))}
                         

                </Table>
            </div>
            <div className='flex flex-col p-2 dark:bg-gray-800 gap-4 md:w-auto w-full rounded-md shadow-md'>
                <div className=' flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent posts</h1>
                    <Button outline gradientDuoTone='purpleToPink' className=''>
                        <Link to={"/dashboard?tab=users"}>View all </Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell> Post image </Table.HeadCell>
                        <Table.HeadCell> Post title</Table.HeadCell>
                        <Table.HeadCell> Category</Table.HeadCell>
                    </Table.Head>
                    {posts && posts.map((post) => (
                    <Table.Body key={post._id} className='divide-y'>
                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <Table.Cell>
                                <img src={post.image} alt="user" className='w-14 h-10 rounded-md bg-gray-500'/>
                            </Table.Cell>
                            <Table.Cell className='w-96'> {post.title} </Table.Cell>
                            <Table.Cell className='w-5'> {post.category} </Table.Cell>
                        </Table.Row>
                        
                            
                    
                    </Table.Body>
                    ))}
                         

                </Table>
            </div>

        </div>
        </div>
    );
    }

export default DashboardComponent;