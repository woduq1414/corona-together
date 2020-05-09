import React, {useContext} from "react";
import {UserContext} from "../contexts/UserContext";
import {Redirect} from "react-router-dom";

export const isLogin = () => {
    useContext(UserContext).info;
    if (userInfo.id) {
        return true
    }else{
        return false
    }
}