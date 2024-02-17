
import { Outlet, Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

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
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const openProfile = () => {
    navigate('/profile');
  }

  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} style={{color:'darkblue'}}>
            BlogBridges
          </Typography>
          {user && (
            <>
              <Button color="inherit" component={Link} style={{color:'darkblue'}} to="/">Home</Button>
              <Button color="inherit" component={Link} style={{color:'darkblue'}} to="/blog">Blogs</Button>
              <Avatar alt={user.username} src={user.avatar} sx={{ marginLeft: 2 }} onClick={openMenu} />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem onClick={openProfile}><SettingsIcon sx={{ marginRight: 1 }} />Settings</MenuItem>
                <MenuItem onClick={handleLogout}><LogoutIcon sx={{ marginRight: 1 }} />Logout</MenuItem>
              </Menu>
            </>
          )}
          {!user && (
            <>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/signup">Signup</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
