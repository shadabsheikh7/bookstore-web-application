/** @format */

import React, { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourite from "./components/Profile/Favourite";
import Settings from "./components/Profile/Settings";
import Newcom from "./components/Profile/Newcom";
import Allorders from "./pages/Allorders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (id && token && savedRole) {
      dispatch(authActions.login());
      dispatch(authActions.changerole(savedRole));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* BOOKS */}
        <Route path="/all-books" element={<AllBooks />} />

        {/* CART */}
        <Route path="/cart" element={<Cart />} />

        {/* PROFILE */}
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourite />} />
          ) : (
            <Route index element={<Allorders />} />
          )}

          {role === "admin" && (
            <Route path="add-book" element={<AddBook />} />
          )}

          <Route path="settings" element={<Settings />} />

          <Route path="orderHistory" element={<Newcom />} />
        </Route>

        {/* AUTH */}
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* BOOK DETAILS */}
        <Route
          path="/view-book-details/:id"
          element={<ViewBookDetails />}
        />

        {/* EDIT BOOK */}
        <Route
          path="/update-book/:id"
          element={<UpdateBook />}
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;