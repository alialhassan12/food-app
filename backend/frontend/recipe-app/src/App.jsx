import { Routes,Route } from 'react-router-dom'
import './App.css'

//route component imports
import Home from './pages/Home';
import SignIn from './pages/Signin';
import Register from './pages/Register';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/user/signin' element={<SignIn/>}></Route>
        <Route path='/user/register' element={<Register/>}></Route>
      </Routes>
      
    </>
  )
}

export default App
