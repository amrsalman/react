import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import jwtDecode from "jwt-decode";
import Cart from "./components/Cart/Cart";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";
import ProductsDetails from "./components/ProductsDetails/ProductsDetails";

export default function App() {
  let [user, setUser] = useState(null);
  function currentStateUser() {
    let token = localStorage.getItem("UserToken");
    let decoder = jwtDecode(token);
    setUser(decoder);
  }
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      currentStateUser();
    }
  }, []);
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout user={user} setUser={setUser} />,
      children: [
        { index: true, element: <Home /> },
        { path: "Register", element: <Register /> },
        {
          path: "Login",
          element: <Login currentStateUser={currentStateUser} />,
        },
        { path: "Product", element: <Products /> },
        { path: "Product/:id", element: <ProductsDetails /> },
        {
          path: "Cart",
          element: (
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
}
