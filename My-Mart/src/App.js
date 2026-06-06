
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import Categories from './components/layouts/Categories';
import Home from './components/layouts/Home';
import Proddetail from './components/layouts/Proddetail';
import SelectProd from './components/layouts/SelectProd';
import Multiprodimg from './components/layouts/resuable/Multiprodimg';
import React, {useState} from 'react'
import ProtectedRoute from './components/layouts/ProtectedRoute.tsx';
import Loader from './components/layouts/resuable/Loader.jsx';
const Cart = React.lazy(() => import('../src/components/layouts/resuable/Cart'));

// import Snowfall from 'react-snowfall';


function App() {
  const hideNavbarRoutes = ['/login', '/signUp']
  const location = useLocation()
  const [categoryId, setCategoryId] = useState(null)

  const hideNavbar = hideNavbarRoutes.includes(location.pathname)
  return (
    <div className='bg-[#F8FAFC] min-h-screen font-semibold tracking-wider' >
      {/* <Snowfall/> */}
   <div>
    {!hideNavbar && <Navbar/>}
    <div className=''>
   {!hideNavbar && <Categories setCategoryId={setCategoryId}/>}

    <Routes>
      <Route path='/' element={<Home categoryId={categoryId}/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/prodetail' element={<Proddetail/>}/>
      <Route path='/selectprod/:id' element={<SelectProd/>}/>
      <Route path='/loader' element={<Loader/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/cart' element={<Cart/>}/>
      </Route>
      <Route path='/multi' element={<Multiprodimg/>}/>
    </Routes>
</div>
   </div>
    </div>
  );
}

export default App;
