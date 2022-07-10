import React, { useState, useEffect } from 'react';
import { db, storage } from '../FirebaseCofig';
import { collection, getDocs, getDoc, doc, deleteDoc, updateDoc , arrayRemove , query,where} from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import Spinner from "./Spinner";
import './Admin.css'
import Cookies from 'universal-cookie';
import { getDownloadURL, uploadBytesResumable} from '@firebase/storage';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { style, width } from '@mui/system';
import NavBar from './NavBar';
import { Delete, TextFields, Upload } from '@mui/icons-material';
import { TextField } from '@material-ui/core';
function AdminComponent() {
  const [Details, setDetails] = useState([]);
  const [heading , setheading] = useState('');
  const [id , setid] = useState('');
  const [text , settext] = useState('');
  const [name , setname] = useState('');
  const [reason , setreason ] = useState('');
  const [Approved , setApproved] = useState(false);
  const [email , seteamil] = useState('');
  const [refernce ,setrefence] = useState('');
  const [loading  ,setloading] = useState(true);
  const [flag , setflag] = useState(0);
  const[url1 , seturl1] = useState("");
  const [time , settime] = useState('');
  const [Open ,setOpen] = useState(false);
  useEffect(() => { 
      getUsers();
    }, [flag]);
    const defaultUrl = "https://i.pinimg.com/originals/d1/a6/2a/d1a62a6d8969170025f279115470e34b.jpg"
    const getUsers = async () => {
      const cookies = new Cookies();
       
        const value = cookies.get('email');
        const usercollectionRef = query(collection(db, `PersonalNews`),where("allow", "==",false));
      const data = await getDocs(usercollectionRef);
      console.log(data);
      setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setloading(false);
    };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (i) => {
    setOpen(true);
    setname(Details[i].Creator);
    settext(Details[i].Text);
    seturl1(Details[i].ImageUrl);
    setid(Details[i].id);
    setrefence(Details[i].url);
    setheading(Details[i].Heading);
    seteamil(Details[i].email);
    settime(Details[i].time.toDate())
  }
  const updateDataOnFirebase=async()=>{
   const Ref = doc(db, "PersonalNews", id);
   var rej = false;
   var all = false;
   var mes ;
   if(Approved){
       rej = false;
       all = true;
       mes = ""
   }else{
    rej = true;
    all = false;
    mes = reason
   }
   await updateDoc(Ref, {
    rejected:rej,
    reason:mes,
    allow:all
   }).then(()=>{
    alert("data updated succefully");
    setOpen(false);
    setflag(flag+1);
   })
    
 }
 async function deleteDetails(i){
    if (window.confirm("Are you sure")) {      
    await deleteDoc(doc(db, `PersonalNews/${Details[i].id}`)).then(()=>{
        setflag(flag+1)
        alert("News Deleted Successfully");
    });   
    } 
  }
  return (
    <div  className="App">
    <NavBar/>
      <h2>User News Data</h2>
      <div style={{background: "linear-gradient(to right, rgb(116, 116, 191), rgb(52, 138, 199))",height:"38.5vw" }}  className="rounded mx-auto d-block">
     {loading && <Spinner />}
   
      <table style={{width:"100%" ,background: "linear-gradient(to right, rgb(116, 116, 191), rgb(52, 138, 199))"}} className='content-table'>
        <thead>
          <tr style={{ borderCollapse: "collapse", width: "10%" }}>
            <th style={{ borderCollapse: "collapse", width: "5%" }}>S No.</th>
            <th style={{ borderCollapse: "collapse", width: "30%" }}>Name</th>
            <th style={{ borderCollapse: "collapse", width: "30%" }}>Email</th>
            <th style={{ borderCollapse: "collapse", width:"50%" }}>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {Details.map((details, i) => {
            return (
              <tr key={i} style={{ borderCollapse: "collapse", textAlign: "center", padding: "8px"}}>
                <td style={{ borderCollapse: "collapse", textAlign: "center", height: "5px", padding: "8px"  }} >{i + 1}</td>
                <td style={{ borderCollapse: "collapse", textAlign: "center", padding: "8px" ,wordWrap:"break-word",maxWidth:"100px"}} >{details.Creator}
                  <br /><br />
               </td>
                <td style={{ borderCollapse: "collapse", textAlign: "center", padding: "8px" ,wordWrap:"break-word",maxWidth:"100px"}} >{details.email}
                  <br /><br />
               </td>
               <td align='center'>
               <button className = "edit" onClick={()=>handleOpen(i)}>Edit</button>
               <button className='delete' onClick={()=>deleteDetails(i)}>Delete</button>
               </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      <Dialog onClose={handleClose} open={Open} style={{padding:"30px"}} PaperProps={{style:{
        borderRadius: "20px",
        height:"779px", padding:"10px",
        width:"700px"
      }}}>
          <DialogTitle sx={{fontSize:24,color:"#308efe",fontWeight:"bold"}}>Upload News</DialogTitle>
          <DialogContent>
            <br />
            <br />
            <label>Creator Name  : </label> <br /> 
          <TextField disabled={true} variant="outlined" maxlength="30" type="text" value={name} placeholder='Heading' /> <br /> <br />
          <label>Creator Email  : </label> <br /> 
          <TextField disabled={true} variant="outlined" maxlength="30" type="text" value={email} placeholder='Heading'  /> <br /> <br />
          <label>News Heading  : </label> <br /> 
          <TextField disabled={true} variant="outlined" maxlength="30" type="text" value={heading} placeholder='Heading' /> <br />   <br />
          <label >Image : </label> <br />
          <img  src={url1} alt=""width="193" height="130" /><br/> <br />
        <label>News Text  : </label> <br />
        <textarea disabled={true} value={text}  cols="30" rows="5"  placeholder='News Text' > </textarea>
          
          <br /> <br />
          <label>Refrence Url : </label> <br />
          <TextField disabled={true} variant="outlined" maxlength="30" type="text" value={refernce} placeholder='Refrence url'/>
         <br /> <br />
         <label>Approved : </label> <input type="checkbox" checked={Approved} onChange={()=>{setApproved(!Approved)}}  /> <br /> <br />
         <label>Reason : </label> <br />
         {!Approved?<TextField variant="outlined" maxlength="30" type="text" value={reason} placeholder='Reason For Rejection' onChange={(event) => { setreason(event.target.value); }} />:<></>}
        </DialogContent>
        <DialogActions><Button type="submit" onClick={updateDataOnFirebase} >Submit</Button>
            <Button sx={{color:"red"}}onClick={handleClose}  >Cancel</Button></DialogActions>
      </Dialog>
    </div>
  );
}
export default AdminComponent;