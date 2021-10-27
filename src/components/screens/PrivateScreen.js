

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


const PrivateScreen = ({history,match}) => {

    useEffect(() => {
      const getUserDetails= async()=>{

         let {data} =  await axios.get(`/api/private/details/${match.params.user_id}`,config)
              
          console.log(data)
         if(data.user){
            setData({
              subject:data.subject,
              time:data.time,
              classofFaculty:data.classofFaculty,
              userId:data.user,
            })
            
         
            setitems(data.items)
         }
         setLoading(false)
     }
    
       getUserDetails()
     
    },[] )// eslint-disable-line react-hooks/exhaustive-deps
    const [loading,setLoading] = useState(false);
   

    const [item,setItem] = useState({
      studentName:"",
      enrollmentNumber:"",
      
    })
    
    
    
  const [data,setData] = useState({
    subject:"",
    time:"",
    classofFaculty:"",
    userId:"",
    items:[]
  })
  const [items,setitems] = useState([])
  // const [img,setImg] = useState([])
  // const [error,setError] = useState({
  //   fullname:null,
  //   contactNumber:null,
  //   address:null,
  //   pincode:null,
  //   dateOfBirth:"",
  //   emergencyPhoneNumber:null,
  //   familyDoctorNumber:null,
  //   age:null,
  //   userId:""
  // });

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

 
  const {
    subject,
    time,
    classofFaculty,

  } = data

  // function Validation(field,value){
  //       if(field === "contactNumber"){ validator.isNumeric(value) && value.length ===10 && (value%1 === 0 ) ? setError({...error,contactNumber:false}):setError({...error,contactNumber:true})}
  //       if(field === "emergencyPhoneNumber"){ validator.isNumeric(value) && value.length ===10 && (value%1 === 0 ) ? setError({...error,emergencyPhoneNumber:false}):setError({...error,emergencyPhoneNumber:true})}
  //       if(field === "familyDoctorNumber"){ validator.isNumeric(value) && (value.length ===10 || value.length===0) && (value%1 === 0 ) ? setError({...error,familyDoctorNumber:false}):setError({...error,familyDoctorNumber:true})}
  //       if(field === "age"){ (value%1 === 0 )  && value > 0 && value <=100 ? setError({...error,age:false}):setError({...error,age:true})}
  //       if(field === "address"){ value.length > 0 && value.length <=100 ? setError({...error,address:false}):setError({...error,address:true})}
  //       if(field === "pincode"){ validator.isNumeric(value) && value.length <=6 && value >0 ? setError({...error,pincode:false}):setError({...error,pincode:true})}
  //       if(field === "fullname"){validator.isAlpha(value) || /^[A-Za-z\s]+$/.test(value) ? setError({...error,fullname:false}):setError({...error,fullname:true})}

    

  // } 
 
  var formData = new FormData();
  const handleChange=name=>event=>{


     
   
    if(name ==="image"){
      let arr = Array.from(event.target.files)
      setData({...data,image:arr})
    }else{
      const value = event.target.value
      console.log(value)
      setData({...data,[name]:value})
    }
   
}

  
  const submitHandler = async (e)=>{
    e.preventDefault()
      
  try {
    formData.set("subject",subject)
    formData.set("time",time)
    formData.set("classofFaculty",classofFaculty)
    
          setitems([...items,item])
          setItem({
            dateofDiagnosed:"",
            hospitalname:"",
            purpose:""
          })
    formData.set("items",JSON.stringify(items))
    

    if(data.image){
      for(var i=0;i<data.image.length;i++){
        formData.append("image",data.image[i])
      } 
    }
    
      await axios.post(`/api/private/details/${match.params.user_id}`,formData,config).then(
        (response)=>{
            console.log(response)
            setLoading(false)
            history.push(`/facultydetails/qr/${match.params.user_id}`)
          }
      ).catch((err)=>{
        history.push("./login")
      })
    // }else{
    //   setLoading(false)
    //   console.log("called")
    //   await axios.put(`/api/private/details/${match.params.user_id}`,formData,config).then(
    //     (response)=>{
    //         console.log(response)
    //         setLoading(false)
    //         history.push(`/details/certificate/${match.params.user_id}`)
          
    //     }
    //   ).catch((err)=>{
    //     console.log(err)
    //     history.push("/")
    //   })

    // }

  } catch (error) {
    
    console.log(error)
    history.push("/")
  }
  
}



  return(

   loading?(<FallbackScreen/>):(
    <Form onSubmit={submitHandler} className="container parentContainer">
    <ToastContainer/>
       <FormGroup className="row formRow">
          <div className="col-3 offset-1">
            <Label  className="formLabel" htmlFor="subject"><h3>Subject </h3></Label>
          </div>
          <div className="col-7">
            <Input type="text" name="subject"  id="subject"  value={subject}  onChange={handleChange("subject")} placeholder="Firstname Middlename Lastname" />
         </div>
       </FormGroup>
       <Divider light/>

       <FormGroup className="row formRow">
          <div className="col-3 offset-1">
            <Label  className="formLabel" htmlFor="time"><h3>Time </h3></Label>
          </div>
          <div className="col-7">
            <Input type="text" name="time"  id="time"  value={time}  onChange={handleChange("time")} placeholder="Firstname Middlename Lastname" />
         </div>
       </FormGroup>
       <Divider light/>

       <FormGroup className="row formRow">
          <div className="col-3 offset-1">
            <Label  className="formLabel" htmlFor="classofFaculty"><h3>Class of Faculty </h3></Label>
          </div>
          <div className="col-7">
            <Input type="text" name="classofFaculty"  id="classofFaculty"  value={classofFaculty}  onChange={handleChange("classofFaculty")} placeholder="Firstname Middlename Lastname" />
         </div>
       </FormGroup>
<Fab type="submit" variant="extended"style={{alignSelf:"center",margin:"2%",width:"40%",height:"100%"}} onClick={(e)=>{submitHandler(e)}}>Submit</Fab>


       </Form>
   )
  )

};

export default PrivateScreen;


