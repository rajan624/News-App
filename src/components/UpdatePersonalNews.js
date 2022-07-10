import React from 'react'
import { useState ,useEffect } from 'react';
import { db, storage } from '../FirebaseCofig';
import Spinner from "./Spinner";
import Cookies from 'universal-cookie';
import NavBar from './NavBar';
import Popup from 'reactjs-popup';
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable} from '@firebase/storage';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Delete, TextFields, Upload } from '@mui/icons-material';
import { TextField } from '@material-ui/core';
import 'reactjs-popup/dist/index.css';
import { collection, getDocs , query,setDoc,doc,getDoc, addDoc,Timestamp , where} from 'firebase/firestore';
function UpdatePersonalNews() {
  const [name , setname] = useState('');
  const [email , setemail] = useState('');
  const [flag , setflag] = useState(0);
  const [heading , setheading] = useState('');
  const [text , settext] = useState('');
  const [refernce , setrefence] = useState('');
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  }
  const [image1, setImage1] = useState(null);
  const [file1 , setfile1] = useState(null);
  const[url1 , seturl1] = useState("");
  const [progress1 , setprogress1] = useState(0);
  const [Open ,setOpen] = useState(false);
    const [Details , setDetails] = useState([]);
    const [loading  ,setloading] = useState(true);
    
    useEffect(() => { 
      firstCall();
        getUsers();
      }, [flag]);
      const firstCall =()=>{
        const cookies = new Cookies();
          console.log(cookies.get('Name'));
          console.log(cookies.get('email'));
          setname(cookies.get('Name'));
          setemail(cookies.get("email"))
      }
      const defaultUrl = "https://i.pinimg.com/originals/d1/a6/2a/d1a62a6d8969170025f279115470e34b.jpg"
      const getUsers = async () => {
        const cookies = new Cookies();
         
          const value = cookies.get('email');
                const usercollectionRef = query(collection(db, `PersonalNews`),where("email", "==",value));
        const data = await getDocs(usercollectionRef);
        console.log(data);
        setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setloading(false);
      };
    const deleteImage1 = (file) =>{
      const desertRef = ref(storage, file);
     deleteObject(desertRef).then(() => {
       seturl1("");
       alert("deleted succefully")
     }).catch((error) => {
       console.log(error);
     }); 
     };
     const uploadFiles1 = (file)=>{
      if(!file) return;
      let date = new Date();
      let ModifiedDate =  (date.toString().replaceAll(" ","")).substring(0,20).replace(/[^a-z0-9 -]/gi, '');
        const storageref = ref(storage, `/files/${file.name}_${ModifiedDate}`);
      const  uploadTask = uploadBytesResumable(storageref,file);
      uploadTask.on("state_changed",(snapshot)=>{
         const prog = Math.round((snapshot.bytesTransferred/snapshot.totalBytes*100));
         setprogress1(prog);
      },(err)=>console.log(err),()=>{
         getDownloadURL(uploadTask.snapshot.ref).then(url =>console.log(seturl1(url)));
      });
    }
   const onImageChange1 = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage1(URL.createObjectURL(event.target.files[0]));
    }
     setfile1( event.target.files[0]);
   }
   const updateDataOnFirebase =async()=>{
    if(heading=="" || text==""){
      alert("please fill the details")
    }else{
    const docData = {   
      Creator:name,
      Heading:heading,
      ImageUrl:url1,
      Location:"",
      Text:text,
      allow:false,
      email:email,
      time:Timestamp.fromDate(new Date()),
      url:refernce,
      rejected:false,
      reason:"",
      Comment:[]
   };
 await addDoc(collection(db, "PersonalNews"),docData).then(()=>{
alert("News Update successfully");
   seturl1('');
   settext('')
   setheading('');
   setprogress1(0);
   setflag(flag+1);
 });
}
   }
  return (
    <>
    <NavBar/>
    <div className="container">
    <h1 className="text-center " style={{ margin: "35px" }}>
    Category - My News
   </h1>
   <div style={{    justifyContent: "right"}} className="d-flex justify-content-right">
          <button type="button" onClick={handleOpen} /* disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextButton} */ className="btn btn-dark">Add Own News</button>
        </div>  
   <div className="rounded mx-auto d-block">
     {loading && <Spinner />}
   </div>
    <div className="row ">
    {Details.map((details, i) => {
        return (
        <div className="col-md-4 my-2 ">
    <div className="card" >
      <img src={details.ImageUrl==""?defaultUrl:details.ImageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{details.Heading}</h5>
        <p className="card-text">{details.Text}</p>
        <label>Approved by Admin</label> <input type="checkbox"  defaultChecked={details.allow} checked={details.allow} /> <br />
       {details.rejected?<label>Reason For Rejection : {details.reason}</label>:""}
        <p className="text-muted my-2"> by <b>{details.Creator==""?"unknown":details.Creator}</b> on {new Date(details.time.toDate()).toGMTString()} </p>
        {details.url==""?<></>:<a href={details.url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Refrence</a>}
      </div>
    </div>
    </div>
    );
          })}
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

          <TextField variant="outlined" maxlength="30" type="text" value={heading} placeholder='Heading' onChange={(event) => { setheading(event.target.value); }} />
         <br /> <br />
          <label >Image : </label> 
    <input  type="file"  onChange={onImageChange1} />
    <span >uploaded {progress1}%</span>
          <img  src={url1} alt=""width="193" height="130" /><br/> <br />
        <Button  onClick={()=> uploadFiles1(file1)} variant="contained" sx={{height:"25px",padding:"5px",marginRight:"5px"}} startIcon={<Upload/>}>upload</Button>
        <Button  onClick={()=> deleteImage1(url1)} variant="contained" sx={{height:"25px",padding:"5px",marginRight:"85px"}} startIcon={<Delete/>}>Delete</Button>
        <br /> <br />
        <label>News Text  : </label> <br />
        <textarea value={text}  cols="30" rows="5"  placeholder='News Text' onChange={(event) => { settext(event.target.value) }}> </textarea>
          
          <br /> <br />
          <TextField variant="outlined" maxlength="30" type="text" value={refernce} placeholder='Refrence url' onChange={(event) => { setrefence(event.target.value); }} />
         <br /> <br />
        
        </DialogContent>
        <DialogActions><Button type="submit" onClick={updateDataOnFirebase} >Submit</Button>
            <Button sx={{color:"red"}}onClick={handleClose}  >Cancel</Button></DialogActions>
      </Dialog>
    </div>
    </>
  )
}

export default UpdatePersonalNews