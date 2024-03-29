import { Route, Routes } from "react-router-dom";
import Admin from "./Routes/Admin.jsx";
import Layout from "./Routes/Layout.js";
import PersistLogin from "./Routes/PersistLogin.js";
import RequireAuth from "./Routes/RequireAuth.js";
import Homepage from "./Routes/homepage.jsx";
import Login from "./Routes/login.jsx";
import Register from "./Routes/register.jsx";
import Unauthorized from "./Routes/unauthorized.jsx";
import './styles/forms.scss';
import AdminUsers from "./Routes/AdminUsers.jsx";
import Product from "./Routes/Product.jsx";
import Checkout from "./Routes/Checkout.jsx";




function App() {

  return (
    <>

      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<RequireAuth allowedRoles={[501, 502]} />}>
              <Route path="/" element={<Homepage />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>


            <Route element={<RequireAuth allowedRoles={[501]} />}>
              <Route path="admin" element={<Admin />} >
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<h1>products</h1>} />
                <Route path="categories" element={<h1>categories</h1>} />
              </Route>
            </Route>

            <Route path="/*" element={<h1>404 not found !</h1>} />
          </Route>
        </Route>

      </Routes>

    </>
  )
}



export default App;
