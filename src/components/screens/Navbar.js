import  React from 'react';
import {useHistory} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';



export default function Navbar({id}) {

  const history = useHistory()
  return (
    <Box sx={{ flexGrow: 1 }} style={{color:"rgb(35, 13, 56)"}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            One Nation One Health
          </Typography>
          <Button onClick={()=>{
             history.push("/home")
          }} color="inherit">Home</Button>
          {!localStorage.getItem("authToken")?(
            <Button onClick={()=>{
              history.push("/register")
          }} color="inherit">Register</Button>
          ):(<></>)}
          {localStorage.getItem("userid")?(
            <Button onClick={()=>{
              history.push(`/details/${localStorage.getItem("userid")}`)
          }} color="inherit">Generate Card</Button>
          ):(<></>)}
          
          <Button onClick={()=>{
              if(localStorage.getItem("authToken")){
                localStorage.removeItem("authToken");
                localStorage.removeItem("userid")
                history.push("/home")
              }else{
                history.push("/login")
              }
          }} color="inherit">{localStorage.getItem("authToken")?"Logout":"Login"}</Button>
          

        </Toolbar>

      </AppBar>
      
    </Box>
  );
}
