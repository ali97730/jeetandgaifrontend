import { useState ,useEffect, } from "react";
import  Navbar  from "../screens/Navbar"
import axios from "axios";
import validator from 'validator';
import { Button, Form, FormGroup, Label, Input,InputGroup, InputGroupAddon, InputGroupText,FormFeedback, CustomInput,
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { saveAs } from 'file-saver';

import { toast,ToastContainer } from "react-toastify";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "./PrivateScreen.css"
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadingIcon from '@mui/icons-material/Downloading';
import FallbackScreen from "../../FallbackScreen";
import { Divider } from "@mui/material";

const StudentPrivateScreen = ({history,match}) => {
  
    useEffect(() => {

        if(!localStorage.getItem("authToken")){
            history.push("/studentlogin")
        }

        const getUserDetails= async()=>{

          let {data} =  await axios.get(`/api/private/details/${match.params.user_id}`,config)
               
           console.log(data)
          if(data.user){
            //  setData({
            //    subject:data.subject,
            //    time:data.time,
            //    classofFaculty:data.classofFaculty,
            //    userId:data.user,
            //  })
             
          
             setitems(data.items)
          }
  
      }
     
        getUserDetails()
       
    }, []);


    const [items,setitems] = useState([])

    const [item,setItem] = useState({
        studentName:"",
        enrollmentNumber:"",
        })
    
      const {studentName,enrollmentNumber} = item
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      const handleChange=name=>event=>{


     
   
        if(name ==="image"){
          let arr = Array.from(event.target.files)
          setItem({...item,image:arr})
        }else{
          const value = event.target.value
          console.log(value)
          setItem({...item,[name]:value})
        }
       
    }
    let formData = new FormData();

    const submitHandler = async (e)=>{
      e.preventDefault()
      
      console.log(localStorage.getItem("studentid"))
        // formData.set("subject",subject)
        // formData.set("time",time)
        // formData.set("classofFaculty",classofFaculty)
      setitems([...items,item])

        formData.set("items",JSON.stringify(items))
        formData.set("studentid",localStorage.getItem("studentid"))
    
        
        
          await axios.put(`/api/private/details/${match.params.user_id}`,formData,config).then(
            (response)=>{
                console.log(response)
                toast("successFull Attendnce",{type:"success"})
              
              }
          ).catch((err)=>{
            toast("Not successFull Attendnce",{type:"error"})
            history.push("./studentlogin")
          })
        
        } 

  return (
    <>



<Form onSubmit={submitHandler} className="container parentContainer">
    <ToastContainer/>
       <FormGroup className="row formRow">
          <div className="col-3 offset-1">
            <Label  className="formLabel" htmlFor="studentName"><h3> </h3></Label>
          </div>
          <div className="col-7">
            <Input type="text" name="subject"  id="studentName"  value={studentName}  onChange={handleChange("studentName")} placeholder="Firstname Middlename Lastname" />
         </div>
       </FormGroup>
       <Divider light/>

       <FormGroup className="row formRow">
          <div className="col-3 offset-1">
            <Label  className="formLabel" htmlFor="time"><h3>Time </h3></Label>
          </div>
          <div className="col-7">
            <Input type="text" name="time"  id="time"  value={enrollmentNumber}  onChange={handleChange("enrollmentNumber")} placeholder="Firstname Middlename Lastname" />
         </div>
       </FormGroup>
       <Divider light/>
<Fab type="submit" variant="extended"style={{alignSelf:"center",margin:"2%",width:"40%",height:"100%"}} onClick={(e)=>{submitHandler(e)}}>Submit</Fab>

       </Form>
      
    </>
  );
};

export default StudentPrivateScreen;