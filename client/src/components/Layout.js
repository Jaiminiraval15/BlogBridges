
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
    <nav className="site-nav">
      <div className="container">
        <div className="menu-bg-wrap">
          <div className="site-navigation">
            <div className="row g-0 align-items-center">
              <div className="col-2">
                <Link to="/" className="logo m-0 float-start">BlogBridges<span className="text-primary">.</span></Link>
              </div>
              <div className="col-8 text-center">
                <ul className="js-clone-nav d-none d-lg-inline-block text-start site-menu mx-auto">
                  <li className="active"><Link to="/">Home</Link></li>
                  {user && (
                    <>
                      <li><Link to="/blog">My Blogs</Link></li>
                      <li><Link to="/allblogs">All Blogs</Link></li>
                    </>
                  )}
                </ul>
              </div>
              <div className="col-2 text-end">
                {user && (
                  <>
                    <Avatar alt={user.username} src={user.avatar} sx={{ marginRight: 2 }} onClick={openMenu} />
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
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <Outlet />
   

  </div>
  );
}
