
import { useLocation, } from "react-router-dom"
import DashProfile from "./DashProfile";
import {DashSidebar} from "./DashSidebar";
import DashPosts from "./DashPosts";
import DashUsers from "./DashUsers";
import DashComments from "./DashComments";
import {  useEffect, useState } from "react";
import DashboardComponent from "./DashboardComponent";
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
        if(tabFromUrl){
          setTab(tabFromUrl);}
  }, [location.search]);


  return (
    <div className="min-h-screen flex md:flex-row  flex-col md:py-16 py-20">
      {/* sidebar*/}
      <div>
        <DashSidebar />
      </div>
      {/* profile */}
      {tab==='profile' && <DashProfile />}
      {/* posts */}
      {tab==='posts' && <DashPosts />}
      {/* users */}
      {tab==='users' && <DashUsers />}
      {/* comments */}
      {tab==='comments' && <DashComments/>}
      {/*dashboard comp*/}
      {tab==='dash' &&<DashboardComponent/>
      }


    </div>
  );
}

export default Dashboard;
