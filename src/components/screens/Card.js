import React,{useState,useEffect} from 'react'
import axios from "axios";
import QRCode from 'qrcode.react';
import ReactToPdf from "react-to-pdf";
import  Navbar  from "../screens/Navbar"
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import Fab from '@mui/material/Fab';
import FallbackScreen from '../../FallbackScreen';





const Card = ({match}) => {

    useEffect(() => {
        const getUserDetails= async()=>{
          setLoading(false)
          let {data} =   await axios.get(`/api/private/details/${match.params.user_id}`,config)
          console.log(match.params.user_id+"called")
           if(data){
              setData({
              subject:data.subject,
              time:data.time,
              classofFaculty:data.classofFaculty,
              userId:data.user,
              })
              
           }
           setLoading(false)
       }



        getUserDetails()
      },[] )// eslint-disable-line react-hooks/exhaustive-deps
      const [loading,setLoading] = useState(false);
      const [data,setData] = useState({
        subject:"",
              time:"",
              classofFaculty:"",
              userId:"",
      })

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

    const ref = React.createRef();
    
    return (
       loading?(
          <FallbackScreen/>
       ):(
        < >
        <Navbar/>
         
         <div style={{display:"flex" ,justifyContent:"center",alignItems:"center",overflowX:"scroll"}}>
              <div ref={ref}  style={{width: 800, height:500}}>
              <div  style={{width: 800, height: 500,position:"relative",
             backgroundSize:"100%",backgroundRepeat:"no-repeat"
             }} >
                     <div style={{position:"absolute",marginTop:150,marginLeft:40,display:"flex"}} >
                             <QRCode
                                     value={`http://192.168.43.55:3000/qrscan/${match.params.user_id}/`}
                                    //  value={`https://onenationonehealth1.herokuapp.com/otherUser/${match.params.user_id}/`}
                                     size={200}
                                     bgColor={"#ffffff"}
                                     fgColor={"#000000"}
                                     level={"L"}
                                     includeMargin={false}
                                     renderAs={"svg"}
                                     // imageSettings={{
                                     //   src:`${logoimage}`,
                                     //   x: null,
                                     //   y: null,
                                     //   height: 34,
                                     //   width: 34,
                                     //   excavate: true,
                                     // }}
                                     />
                         <div className="container" style={{marginLeft:30}}>
                         
                         <div className="row ">
                                 <div className="col-3">
                                           <h4>Subject</h4>
                                 </div>
                                   <div className="col-1">
                                     <h2><DoubleArrowRoundedIcon/></h2>
                                   </div>
                                   <div className="col-8">
                                       <h3>{data.subject}</h3>
                                   </div>           
                        </div>
                        <div className="row ">
                                 <div className="col-3">
                                           <h5>Time</h5>
                                 </div>
                                   <div className="col-1">
                                     <h5><DoubleArrowRoundedIcon/></h5>
                                   </div>
                                   <div className="col-8 ">
                                     <h5>{data.time}</h5>
                                   </div>           
                        </div>
                        <div className="row ">
                                 <div className="col-3">
                                           <h5>Class</h5>
                                 </div>
                                   <div className="col-1">
                                     <h5><DoubleArrowRoundedIcon/></h5>
                                   </div>
                                   <div className="col-8">
                                     <h5>{data.classofFaculty}</h5>
                                   </div>           
                        </div>

                             
                         {/* <h3>DOB:{data.time?new Date(data.time).toISOString().split("T")[0]:""}</h3> */}
                         
                         </div>
                         </div>            
             </div>
             </div>
         </div> 
 
        <div style={{marginBottom:"20%",marginLeft:"46vw"}}>
        <ReactToPdf targetRef={ref} filename="div-blue.pdf">
                     {({toPdf}) => (
                         <Fab variant="extended"style={{alignSelf:"center",backgroundColor:"green",color:"white"}} onClick={toPdf}>Generate pdf</Fab>
                     )}
              </ReactToPdf>
        </div>
 
         
         </>
       )
    )
}

export default Card;
