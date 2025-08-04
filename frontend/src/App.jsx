import React from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Signup from "./components/Signup";
import Add from  "./components/Add"
import Login from "./components/Login";
import Account from "./components/Account";
import BlogDetail from "./components/BlogDetail";
import { AuthProvider } from "../context/authcontext";
import { useAuth } from "../context/authcontext";

import { BrowserRouter, Route, Router, Link, Routes } from "react-router-dom";

const App = () => {
 
  return (
    <>
      <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Hero />}        />
          <Route path="/Add" element={<Add />}       />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login/>}    />
          <Route path="/Account" element={<Account/>}/>
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
