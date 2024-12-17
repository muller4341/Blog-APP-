import  { BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Signin from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/Home/Home'
import Dashboard from './Pages/Dashboard/Dashboard'
import Projects from './Pages/Projects/Projects'
import About from './Pages/About/About'
import Navbar from './Pages/Navbar/Navbar'
import Footer from './Pages/footer/footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './Pages/createPost/createPost'
import AdminPrivateRoute from './components/adminPrivateRoute'
import UpdatePost from './Pages/UpdatePost/UpdatePost'
import PostPages from './Pages/PostPages/PostPages.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
 

function App() {
  

  return (
    
<Router>
  <ScrollToTop/>
  <Navbar/>
<Routes>
  <Route path="/post/:postSlug" element={<PostPages/>} />
<Route path="/" element={<Home/>} />
<Route path="/signin"element={<Signin/>} />
<Route path="/signup" element={<SignUp/>} />
<Route path="/create_post" element={<CreatePost/>} />

<Route path="/projects" element={<Projects/>} />r
<Route path="/about" element={<About/>} />
   <Route element={<PrivateRoute/>} >
<Route path="/dashboard" element={<Dashboard/>} />
  </Route>
<Route element={<AdminPrivateRoute/>} >
<Route path="/create_post" element={<CreatePost/>}/>
<Route path="/update-post/:postId" element={<UpdatePost/>}/>
  </Route>




 

  </Routes> 
  
  <Footer/>






    </Router>      
  )
}

export default App
