// this is hook layer it is used to manage the api layer and state layer

import {useContext } from "react";
import{AuthContex} from "../auth.context";
import{login,register,logout,getMe}from "../services/auth.api"

export const useAuth = () =>{


    const contex = useContext(AuthContex);
    const {user,setUser,loading,setLoading} = contex ;
    
    
        const handleLogin = async ({email,password}) => {
            setLoading(true);
            try {
                const data = await login({email,password});
                setUser(data.user);               
            } catch (error) {
                console.log(error)               
            }finally{
                setLoading(false);
            }
            
    }

    const handleRegister = async ({email,password,username}) =>{
        setLoading(true);
        try {
            setUser(data.user);
            const data = await register({email,password,username});            
        } catch (error) {            
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async ()=>{
        setLoading(true);
        try {      
            const data = await logout();
            setUser(null);
        } catch (error) {
            
        }finally{
            setLoading(false);
        }
    }
    return {user,loading,handleLogin,handleLogout,handleRegister}
}
