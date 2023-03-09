import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Other from "./pages/Other";
import "bootstrap/dist/css/bootstrap.min.css"
import LoginForm from "./LoginForm"
import "./styles/login.css"
import { BrowserRouter } from "react-router-dom"

function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/other" element={<Other />} />
        <Route path="/login" element={<LoginForm />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
