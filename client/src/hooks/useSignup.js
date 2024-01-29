import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom';
export const useSignup = () => {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const { dispatch } = useAuthContext();
   
    const navigate = useNavigate();
    const signup = async (email,password,firstname,lastname,username) =>{
        setIsLoading(true)
        setError(null)
        const res = await fetch('http://localhost:2000/api/routes/signup',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password,firstname,lastname,username})
        })
        const data = await res.json()
        if (!res.ok){
            setIsLoading(false)
            setError(data.error)
        }
        if(res.ok){
            //save the user to session
            sessionStorage.setItem('user',JSON.stringify(data))
            //update authContext
            dispatch({type: 'LOGIN',payload:data})
            setIsLoading(false)
            navigate('/blog')
        }

    }
    return {isLoading,error,signup}
}