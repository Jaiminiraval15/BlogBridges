import { Outlet,Link } from "react-router-dom";
import "../index.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Layout(){
    const {logout} = useLogout()
  const {user} = useAuthContext()
     
    return(
        <>
             
             {user ? (
        <nav className="navbar">
          <div className="logo">BlogBridges</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <button onClick={logout}>Logout</button>
          </div>
        </nav>
      ) : (
        <nav className="navbar">
          <div className="logo">BlogBridges</div>
          <div className="nav-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/">Home</Link>
          </div>
        </nav>
      )}
           
            <Outlet/>
        </>
    )
}