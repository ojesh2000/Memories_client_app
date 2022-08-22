import React , { useState , useEffect  } from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import memories from '../.././images/memories.png';
import useStyles from "../../styles.js"
import {  Link  } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import {  useNavigate , useLocation  } from 'react-router-dom';
import decode from "jwt-decode";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user , setUser]=useState(JSON.parse(localStorage.getItem('profile')));
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({type: "LOGOUT"});
    navigate("/");
  }

  useEffect(() => {
    const token = user?.token;
    

    // JWT...
    if(token){
      const decodedToken = decode(token);
      if(decodedToken.expiry * 1000 < new Date().getTime()){
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  } , [location]);



  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
          <Typography component={Link} to="/"  className={classes.heading } variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60"/>
      </div>
       <Toolbar className={classes.toolbar}>
        {
          user ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">Log Out</Button>
            </div>
          ) : (
              <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar