import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import {Table,Modal, Button} from "flowbite-react"
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";



const DashComments = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    console.log ("comment ",comments)
    useEffect(() => {
        
        const fetchComments= async() =>{
     try {
        
        const res = await fetch ('/api/comment/getcomments')
        const data = await res.json()
        if (res.ok ){
            setComments(data.comments);
            if (data.comments.length < 9){
                setShowMore(false)
             }

     } 
    }
     
     catch (error) {
        console.log(error.message)
        
     }

        };
        if (currentUser.isAdmin){
             fetchComments();
           
        }
    }, [currentUser._id]);

    

const handelShowMore= async() => {

    const startIndex = comments.length;

    try {
            
            const res = await fetch (`/api/comment/getComments?startIndex=${startIndex}`)
            const data = await res.json()
            if (res.ok ){
                setComments((prev) => [...prev, ...data.comments]);
                if (data.comments.length < 9){
                    setShowMore(false)
                }
    
            }


        } 
        
        catch (error) {
            console.log(error.message)
            
        }


};
const handelDeletecomment= async() => {
    setShowModal(false);
    try{
        const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
            method: 'DELETE',
            
        });
        const data = await res.json();
        if (res.ok){
            console.log(data.message)
        }
        else
        {
            setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
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
            {currentUser.isAdmin && comments.length > 0? (
                <>
                <Table hoverable className = 'shadow-md'>
                    <Table.Head>
                        <Table.HeadCell> Date  created </Table.HeadCell>
                        <Table.HeadCell> comment content</Table.HeadCell>
                        <Table.HeadCell> Number of likes</Table.HeadCell>
                        <Table.HeadCell> PostId</Table.HeadCell>
                        <Table.HeadCell> UserId </Table.HeadCell>
                       <Table.HeadCell> Delete</Table.HeadCell>
            
                    </Table.Head>
                    {comments.map((comment) => (
                        <Table.Body className="divide-y" key={comment._id}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>
                                     { new Date (comment.createdAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.content}
                                   
                                </Table.Cell>
                                <Table.Cell>
                                    
                                    {comment.numberOfLikes}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.postId}
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.userId}
                                </Table.Cell>
                                <Table.Cell>
                                    <span  onClick={() => {
                                    setShowModal(true);
                                    setCommentIdToDelete(comment._id);


                                    }}
                                     className="font-medium text-red-500 hover:underline cursor-pointer"> Delete
                                    </span>

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
                    No comments found

                    </p>
                )}

        <Modal show={showModal} onClose={()=> setShowModal(false)}  popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div  className=" flex  flex-col justify-center items-center">
              <HiOutlineExclamationCircle className="text-red-500 text-[50px]"/>
              <p className="text-red-600"> Are you shure you want to delete this comment?
                
              </p>  
              <div className="flex flex-row  mx-4  md:space-x-20 space-x-4 mt-2">
                <Button onClick={handelDeletecomment} color='failure' >yes,I'm sure</Button>
                <Button onClick={()=> setShowModal(false)} >No, cancel</Button>



              </div>

            </div>
          </Modal.Body>
            


          </Modal>

            </div>

    )
}



export default DashComments
