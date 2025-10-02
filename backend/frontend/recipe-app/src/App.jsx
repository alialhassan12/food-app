import { Routes,Route } from 'react-router-dom'
import './App.css'

//route component imports
import Home from './pages/Home';
import SignIn from './pages/Signin';
import Register from './pages/Register';
import AddRecipe from './pages/AddRecipe';
import Profile from './pages/Profile';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path='/user/signin' element={<SignIn/>}></Route>
        <Route path='/user/register' element={<Register/>}></Route>
        <Route path='/recipe/add' element={<AddRecipe/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
      
    </>
  )
}

export default App
