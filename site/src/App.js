import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Other from "./pages/Other";
import SignUp from "./pages/SignUp"

function App() {
  return (
    <div>
      <Routes>
        {/* Root pages, located in /pages/ */}
        <Route path="/" element={<Home />} />
        <Route path="/other" element={<Other />} />
          <Route path="/signUp" element={<SignUp />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
