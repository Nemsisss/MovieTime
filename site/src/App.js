import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp"

function App() {
  return (
    <div>
      <Routes>
          <Route path="/signUp" element={<SignUp />} />
        {/* 404 page not found redirect */}
        <Route path="*" element={<Navigate to="/signUp" replace />} />
      </Routes>
    </div>
  );
}

export default App;
