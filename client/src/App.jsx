import  { BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'
import Home from './pages/Home/Home'
import Dashbord from './pages/Dashbord/Dashbord'
import Projects from './pages/Projects/Projects'
import About from './pages/About/About'
function App() {
  

  return (
<Router>
<Routes>

<Route path="/" element={<Home/>} />
<Route path="/signin"element={<Signin/>} />
<Route path="/signup" element={<Signup/>} />
<Route path="/dashbord" element={<Dashbord/>} />
<Route path="/projects" element={<Projects/>} />
<Route path="/about" element={<About/>} />




  </Routes>






    </Router>      
  )
}

export default App
