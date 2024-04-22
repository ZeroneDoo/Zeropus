import { createContext, useContext, useEffect, useState } from "react";
import { getData, storeData } from "../helper/LocalStorage.tsx";
import { fetchWithToken } from "../helper/Api.tsx";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false)
    const isLogin = () => {
        const token = localStorage.getItem("token") ?? null
        if(token) {
            return true;
        }else {
            return false
        }
    }

    useEffect(() => {
        getUser()
        updateUser()
    }, [])
    
    const updateUser = async () => {
        try {
            const response = await fetchWithToken("/profile")
            storeData("user", response)
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = () => {
        try {
            const data = getData("user")
            setUser(data)
            return data
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{ isLogin, getUser, user, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useLogin = () => useContext(AuthContext)

export default AuthProvider