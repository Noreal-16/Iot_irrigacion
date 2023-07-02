import React, { useReducer } from "react";
import { AuthReduser} from "./AuthReduser";
import { types } from "../types/types";
import {AuthContext} from "./AuthContext";
export const AuthProvider = ({children}) => {
    const init =()=>{
        const  user = JSON.parse(localStorage.getItem("user"))
        return {
            logged: !!user,
            user
        }
    };

    const [state, dispatch] = useReducer(AuthReduser, {}, init);
    const login = async (name = "")=>{
        const user ={
            id: "ABC",
            name
        };
        const action ={
            type: types.login,
            payload: user
        };
        localStorage.setItem("user", JSON.stringify(user))
        dispatch(action);
    }
    const logout = () => {
        localStorage.removeItem("user");
        const action = {
            type: types.logout,
        };
        dispatch(action);
    };

    return (
        <div>
            <AuthContext.Provider value={{ ...state, login, logout }}>
                {children}
            </AuthContext.Provider>
        </div>
    );
}
