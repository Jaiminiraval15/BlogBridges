import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
  
  
    const login = async (email,password) =>{
        setIsLoading(true)
        setError(null)
        const res = await fetch('http://localhost:2000/api/routes/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
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
         

        }

    }
    return {isLoading,error,login}
}