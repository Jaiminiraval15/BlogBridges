import { useEffect ,useState} from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";
import {Card,CardActionArea,CardContent,CardActions,Typography} from '@mui/material';
export default function Blog(){
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const [blogs,setBlogs] = useState([]);
    useEffect(()=>{
        if(user){
            fetchData();
        }
        else{
            navigate('/login')
        }
    },[user])
    const fetchData = async()=>{
        try {
            if(user && user.token){
                const res = fetch('http://localhost:2000/api/routes/blog',{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Authorization':`Bearer ${user.token}`
                    },
                })
                const data = await res.json();
                setBlogs(data);
            }
            if(!res.ok){
                throw new Error("Error fetching blogs");

            }
           

        } catch (error) {
            console.log(error);
        }
    }
    return(<>
     
    </>)
}