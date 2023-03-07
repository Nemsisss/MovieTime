import axios from "axios";
import React from "react";
import "regenerator-runtime/runtime.js";


const httpRequest = async (url)=>{
    const result= await axios.get(url);
    return result;
}

export default httpRequest;