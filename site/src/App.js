import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm"
import "./styles/login.css"
import SignUp from "./pages/SignUp"

function App() {
    return (
        <div>
            <Routes>
                {/* Root pages, located in /pages/ */}
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                {/* 404 page not found redirect */}
                <Route path="*" element={<Navigate to="/login" replace/>}/>
            </Routes>
        </div>
    );
}


export default App;