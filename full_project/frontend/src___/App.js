import React from "react";
import { Route, Routes } from "react-router-dom";
import { PostListPage } from "./pages/PostListPage";
import { LoginPage } from "./pages/LoginPage";
import { PostPage } from "./pages/PostPage";
import { WritePage } from "./pages/WritePage";
import { RegisterPage } from "./pages/RegisterPage";
import { Helmet } from 'react-helmet-async';


function App() {
  return (
    <>
    <Helmet><title>REACT</title></Helmet>
    <Routes>
      <Route element={<PostListPage />} path='/' />
      <Route element={<PostListPage />} path='/@:username' />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<WritePage />} path="/write" />
      <Route element={<PostPage />} path="/@:username/:postId" />
    </Routes>
    </>
  );
}

export default App;
