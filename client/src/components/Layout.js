import { Outlet,Link } from "react-router-dom";
import "../index.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";



export default function Layout(){
    const {logout} = useLogout()
  const {user} = useAuthContext()
  const navigate = useNavigate();
  const handleSubmit = () => {
    logout();
   navigate('/')
  };
    return(
        <>
             
             {user && (
        <nav className="navbar">
          <div className="logo">BlogBridges</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/blog">Blogs</Link>
            {/* <button onClick={handleSubmit}>Logout</button> */}
            <Button onClick={handleSubmit} variant="contained" color="secondary">Logout</Button>
          </div>
        </nav>
      ) }{!user && (
        <nav className="navbar">
          <div className="logo">BlogBridges</div>
          <div className="nav-links">
          <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            
          </div>
        </nav>
      )}
           
            <Outlet/>
        </>
    )
}