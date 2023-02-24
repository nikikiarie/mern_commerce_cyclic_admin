import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/home/Home";
import NewProduct from "./pages/newProduct/NewProduct";
import NewUser from "./pages/newUser/NewUser";
import Product from "./pages/product/Product";
import Products from "./pages/products/Products";
import User from "./pages/user/User";
import Users from "./pages/users/Users";
import LogIn from "./pages/login/LogIn";
import Layout from "./pages/pathway/Layout";
import { useSelector } from "react-redux";


function App() {
  const user = useSelector((state)=>state.user.currentUser?.isAdmin)
  console.log(user);
 
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login"/>}>

            <Route path="/home" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/newProduct" element={<NewProduct />} />
            <Route path="/newUser" element={<NewUser />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

