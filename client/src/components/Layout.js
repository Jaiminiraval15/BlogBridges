import { Outlet, Link } from "react-router-dom";
import "../index.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import { Avatar, Button,Menu, Typography } from "@mui/material";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
export default function Layout() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
  setAnchorEl(null);
};
const openMenu = (event) => {
  setAnchorEl(event.currentTarget);
}
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const openProfile = () => {
    navigate('/profile');
   
  }

  return (
    <div>
      {user && (
        <nav className="navbar">
          <div className="logo">BlogBridges</div>
          <div style={{display:'flex',alignItems:'center'}}>
         
            <Link to="/"  style={{textDecoration:'none', marginRight: '1em', marginTop: '0.5em' }}>
              <Typography>Home</Typography></Link>
            <Link to="/blog"  style={{ textDecoration:'none',marginRight: '1em', marginTop: '0.5em' }}>
              <Typography>Blogs</Typography></Link>
            <Avatar alt={user.username} src={user.avatar} style={{ float: 'right', marginRight: '1em', marginTop: '0.5em' }} onClick={openMenu} />
            <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={openProfile}><SettingsIcon style={{marginInline:'0.2em'}}/>Settings</MenuItem>
            <MenuItem onClick={handleLogout}><LogoutIcon style={{marginInline:'0.2em'}}/>Logout</MenuItem>
          </Menu>
          </div>
        </nav>
      )}
      {!user && (
        <nav className="navbar">
          <div className="logo">
            <Typography>BlogBridges</Typography></div>
          <div className="nav-links">
            <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
            <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}>Signup</Link>

          </div>
        </nav>
      )}
      <Outlet />
    </div>
  );
}
