import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import {Table,Modal, Button} from "flowbite-react"
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";



const DashUsers = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    console.log ("users",users)
    useEffect(() => {
        
        const fetchUsers= async() =>{
     try {
        
        const res = await fetch ('/api/user/getusers')
        const data = await res.json()
        if (res.ok ){
            setUsers(data.users);
            if (data.users.length < 9){
                setShowMore(false)
             }

     } 
    }
     
     catch (error) {
        console.log(error.message)
        
     }

        };
        if (currentUser.isAdmin){
             fetchUsers();
           
        }
    }, [currentUser._id]);

    

const handelShowMore= async() => {

    const startIndex = users.length;

    try {
            
            const res = await fetch (`/api/user/getusers?startIndex=${startIndex}`)
            const data = await res.json()
            if (res.ok ){
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9){
                    setShowMore(false)
                }
    
            }


        } 
        
        catch (error) {
            console.log(error.message)
            
        }


};
const handelDeleteUser= async() => {
    setShowModal(false);
    try{
        const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`, {
            method: 'DELETE',
            
        });
        const data = await res.json();
        if (res.ok){
            console.log(data.message)
        }
        else
        {
            setUsers((prev) => prev.filter((post) => post._id !== postIdToDelete));
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
            {currentUser.isAdmin && users.length > 0? (
                <>
                <Table hoverable className = 'shadow-md'>
                    <Table.Head>
                        <Table.HeadCell> Date  created </Table.HeadCell>
                        <Table.HeadCell> User  Image</Table.HeadCell>
                        <Table.HeadCell> Username</Table.HeadCell>
                        <Table.HeadCell> Email</Table.HeadCell>
                        <Table.HeadCell> Admin </Table.HeadCell>
                       <Table.HeadCell> Delete</Table.HeadCell>
            
                    </Table.Head>
                    {users.map((user) => (
                        <Table.Body className="divide-y" key={user._id}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>
                                     { new Date (user.createdAt).toLocaleDateString()}
                                </Table.Cell>
                                <Table.Cell>
                                    
                                    <img src={user.profilePicture} 
                                    alt={user.username}
                                     className="h-20 w-20 object-cover  rounded-full
                                     bg-gray-500"/>
                                
                                </Table.Cell>
                                <Table.Cell>
                                    
                                    {user.username}
                                </Table.Cell>
                                <Table.Cell>
                                    {user.email}
                                </Table.Cell>
                                <Table.Cell>
                                    {user.isAdmin?<FaCheck className="text-green-500 text-[20px]"/>
                                    :<FaTimes className="text-red-500 text-[20px]"/>}
                                </Table.Cell>
                                <Table.Cell>
                                    <span  onClick={() => {
                                    setShowModal(true);
                                    setUserIdToDelete(user._id);


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
                    No users found

                    </p>
                )}

        <Modal show={showModal} onClose={()=> setShowModal(false)}  popup size='md'>
          <Modal.Header/>
          <Modal.Body>
            <div  className=" flex  flex-col justify-center items-center">
              <HiOutlineExclamationCircle className="text-red-500 text-[50px]"/>
              <p className="text-red-600"> Are you shure you want to delete this user?
                
              </p>  
              <div className="flex flex-row  mx-4  md:space-x-20 space-x-4 mt-2">
                <Button onClick={handelDeleteUser} color='failure' >yes,I'm sure</Button>
                <Button onClick={()=> setShowModal(false)} >No, cancel</Button>



              </div>

            </div>
          </Modal.Body>
            


          </Modal>

            </div>

    )
}



export default DashUsers
