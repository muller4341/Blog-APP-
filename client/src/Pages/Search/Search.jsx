import  {useEffect, useState} from 'react'
import { TextInput , Select, Button} from 'flowbite-react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import PostCard from '../PostPages/PostCard'
const Search = () => {
    const[sidebarData, setSidebarData] = useState({
        search:'',
        sort:'desc',
        category:'uncategorized'
    })
    const [posts, setPosts] = useState([ ]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSidebarData({...sidebarData,
                 searchTerm:searchTermFromUrl,
                sort:sortFromUrl,
                category:categoryFromUrl

                
                
                });
                console.log('sidebarData', sidebarData);
        }
        const  fechPosts = async () => {
            setLoading(true);
           
            try {
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/post/getposts?${searchQuery}`);
               
                if(!res.ok){
                    setLoading(false);
                    return;
                }
                if(res.ok){
                    const data = await res.json();
                    setPosts(data.posts);
                    setLoading(false);
                    if (data.posts.length ===9) {
                        setShowMore(true);
                    }
                    else{
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        fechPosts();
    }, [location.search]);
    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({...sidebarData,
                 searchTerm:e.target.value});
        }
        if (e.target.id === 'sort') {
            const order =e.target.value || 'desc';
            setSidebarData({...sidebarData, sort:order});
        }
        if (e.target.id === 'category') {
            const category = e.target.value || 'uncategorized';
            setSidebarData({...sidebarData, category});
        }
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search); // Use location.search to get current query params
        urlParams.set('start', startIndex); // Add 'start' parameter for pagination
    
        const searchQuery = urlParams.toString(); // Generate the query string
        try {
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) {
                console.error("Failed to fetch more posts.");
                return;
            }
            const data = await res.json();
        setPosts([...posts, ...data.posts]); // Append new posts to the current list
        setShowMore(data.posts.length === 9); // If less than 9 posts, disable 'Show More'
    } catch (error) {
        console.error("Error fetching more posts:", error);
    }
};





    return (
        <div className='flex flex-col md:flex-row py-20'>
        <div className=" p-7 border-b md:border-r  md:min-h-screen border-gray-500">
            <form className='flex flex-col gap-8' onSubmit={handleSubmit} >
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>search Term</label>
                    <TextInput placeholder='search...'
                    id='searchTerm'
                    type='text'
                    value={sidebarData.searchTerm}
                    onChange={handleChange}>
    
                    </TextInput>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Sort</label>
                 <Select 
                 id='sort'
                 onChange={handleChange} 

                 value={sidebarData.sort}>
                    
                        <option value='desc'>Newest</option>
                        <option value='asc'>Oldest</option>
                 </Select>
                    

                </div>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Category</label>
                 <Select
                  id='category' onChange={handleChange} 
                 value={sidebarData.category}>
                   
                        <option value='uncategorized'>uncategorized</option>
                        <option   value="athlete">  Athlete      </option>
                        <option   value="expert">  Expert    </option>
                        <option   value=" background">  Background     </option>
                 </Select>
                    

                </div>
                <Button type='submit' className='bg-blue-500 text-white rounded-md p-2'>Search</Button>
            </form>
            
        </div>
        <div className='w-full'>
        <h1 className='text-31 font-semibold sm:border-b border-gray-500
        p-3 mt-5'>Posts result:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
            {
                !loading && posts.length === 0 && (
                    <h1 className='text-2xl text-gray-500'>No posts found</h1>
                )


            }
            {
                loading && (
                    <h1 className='text-2xl text-gray-500'>Loading...</h1>
                )
            }
            {
                !loading && posts && posts.map((post) => (
                    <PostCard key={post._id} post={post} /> 
                ))

            }
            {
                showMore&& (
                    <Button className='bg-blue-500 text-white rounded-md p-2' onClick={handleShowMore}>Show More</Button>

                )
            }

           
        </div>
        </div>
        </div>
    )
}

export default Search