import React , {  useState  } from 'react';
import {Typography , Avatar , Button , Grid , Container , Paper} from '@mui/material';
import useStyles from "./styles.js";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Input from './Input.js';
import { useScript } from './Hooks/useScript.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {  signin , signup  } from "../../actions/auth.js";


const Auth = () => {
  const classes = useStyles();
  const [showPassword , setShowPassword] = useState(false);
  const [isSignUp , setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData , setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(isSignUp){
      dispatch(signup({formData , navigate}));
    }
    else{
      dispatch(signin({formData , navigate}));
    }

  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  const handleChange = (e) => {
    setFormData({  ...formData , [e.target.name]: e.target.value  });
  }

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  }

  const googleSuccess = async (res) => {
    const token = res?.credential;
    let result = null;
    if(token){
      result = jwt_decode(token);
    }
    try {
      dispatch({type: "AUTH" , data:{   result , token  }});

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  // const googleFailiure = (error) => {
  //   console.log(error);
  //   console.log("Sign In with Google was Unsuccessful. Try Again");
  // }

  useScript("https://accounts.google.com/gsi/client", () => {
    window.google.accounts.id.initialize({
      client_id: "369614217598-hnhl88g2o6l18rubhhd24nm69971ae0c.apps.googleusercontent.com", 
      callback: googleSuccess,
      auto_select: false,
    });
    window.google.accounts.id.renderButton(document.getElementById("GSignIn") , {
      size: "medium",
    });
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.Avatar}>
          <LockOpenIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? `Sign Up` : `Sign In`}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
              {
                isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>
              }
          </Grid>
          <br />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>{(isSignUp ? `Sign Up` : `Sign In`)}</Button>
          <br /><br />
          {/* <GoogleLogin clientId='369614217598-6s5pdtc6hp4hpqka057ihbpad50r9eek.apps.googleusercontent.com' render={(renderProps) => <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Sign In with Google</Button>} 
          onSuccess={googleSuccess}
          onFailure={googleFailiure}
          cookiePolicy="single_host_origin"
          /> */}
          <Button fullWidth color="primary" variant="contained" id="GSignIn" />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode} >
                {(isSignUp ? `Already have an accout ? Sign In` : "Don't have an account ? Sign Up")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

    </Container>
  )
}

export default Auth