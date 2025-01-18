

import { Sidebar } from 'flowbite-react';
//import { BiBuoy } from 'react-icons/bi';
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser,  } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOutSuccess } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export function DashSidebar() {
    const location = useLocation();   
    const dispatch = useDispatch();
    const {currentUser }= useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
          setTab(tabFromUrl);}
  }, [location.search]);

  const handelSignOut = async () => {
    try {
      const res= await fetch(`/api/user/signout`,{
        method: 'POST',
      });  
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Sidebar aria-label="Sidebar with content separator example">
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-2'>
        {currentUser.isAdmin &&
           ( <Link to='/dashboard?tab=dash'>
          <Sidebar.Item  
          icon={HiChartPie } label={'dashboard'}
          active={tab==='dash' || !tab}
          as='div'>
            Dashboard
          </Sidebar.Item>
          </Link>)
          
          }  
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item  
        icon={HiUser} 
        label={currentUser.isAdmin ? 'Admin' : 'User'} 
        active={tab==='profile'}
        as='div'>
            Profile
          </Sidebar.Item>
          </Link>

          {currentUser.isAdmin &&
           ( <Link to='/dashboard?tab=posts'>
          <Sidebar.Item  
          icon={HiDocumentText } label={'posts'}
          active={tab==='posts'}
          as='div'>
            Posts
          </Sidebar.Item>
          </Link>)
          
          }  

          {currentUser.isAdmin &&
          ( <Link to='/dashboard?tab=users'>
          <Sidebar.Item  
          icon={HiOutlineUserGroup } label={'users'}
          active={tab==='users'}
          as='div'>
            Users
          </Sidebar.Item>
          </Link>)
            
            }
            

           
            {currentUser.isAdmin &&
          ( <Link to='/dashboard?tab=comments'>
          <Sidebar.Item  
          icon={HiAnnotation } label={'comments'}
          active={tab==='comments'}
          as='div'>
            Comments
          </Sidebar.Item>
          </Link>)
            
            }


        <Sidebar.Item 
         icon={HiArrowSmRight} 
         onClick={handelSignOut}>
            Log Out
          </Sidebar.Item>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
