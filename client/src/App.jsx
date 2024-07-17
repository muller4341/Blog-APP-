import  { BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Projects from './pages/Projects/Projects'
import About from './pages/About/About'
import Navbar from './pages/Navbar/Navbar'
import Footer from './pages/footer/footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/createPost/createPost'
import AdminPrivateRoute from './components/adminPrivateRoute'

function App() {
  

  return (
<Router>
  <Navbar/>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/signin"element={<Signin/>} />
<Route path="/signup" element={<Signup/>} />

<Route path="/projects" element={<Projects/>} />r
<Route path="/about" element={<About/>} />
<Route element={<PrivateRoute/>} >
<Route path="/dashboard" element={<Dashboard/>} />
  </Route>
<Route element={<AdminPrivateRoute/>} >
<Route path="/createpost" element={<CreatePost/>}/>
  </Route>




 

  </Routes> 
  
  <Footer/>






    </Router>      
  )
}

export default App
