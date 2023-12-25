import React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../api/authToken';
import { useAuth } from '../../Context/AuthContext';

/**
 * The navigation bar component.
 */
const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const token = getAccessToken();

  /**
   * Handle the opening of the user menu.
   * @param event The click event.
   */
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget && event.currentTarget instanceof HTMLElement) {
      setAnchorEl(event.currentTarget);
    }
  };

  /**
   * Handle the closing of the user menu.
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handle the user logging out.
   */
  const handleLogOut = () => {
    logOut();
    navigate('/login');
  };

  /**
   * Handle the user logging in.
   */
  const handleLogIn = () => {
    navigate('/login');
  };

  /**
   * Handle navigating to the user's page.
   */
  const handleMyPage = () => {
    navigate('/mypage');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shogi Web
          </Typography>
          {!token ? (
            <Button color="inherit" onClick={handleLogIn}>Login</Button>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleMyPage}>My Page</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;