import React from 'react'
import { useState ,useEffect } from 'react';
import { db } from '../FirebaseCofig';
import Spinner from "./Spinner";
import { collection, getDocs ,doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { TextField } from '@material-ui/core';
import Cookies from 'universal-cookie';
import { FaRegCommentDots } from "react-icons/fa";
import { BiCommentAdd } from "react-icons/bi";
import NavBar from './NavBar';
function PersonalNews() {
    const [Details , setDetails] = useState([]);
    const [newsId , setnewsId] = useState('');
    const [flag , setflag] = useState(0);
    const [newComment , setnewComment] = useState('')
    const [commmet , setcommment] = useState([]);
    const [commetAdd , setcommetAdd] = useState(true);
    const [loading  ,setloading] = useState(true);
    const [Open ,setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
      setcommetAdd(true);
    };
    const handleOpen = () => {
      setOpen(true);
      setcommetAdd(true);

    }
    useEffect(() => { 
        const getUsers = async () => {
            const usercollectionRef = collection(db, `PersonalNews`)
          const data = await getDocs(usercollectionRef);
          console.log(data);
          setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setloading(false);
        };
        getUsers();
      }, [flag]);
    const defaultUrl = "https://i.pinimg.com/originals/d1/a6/2a/d1a62a6d8969170025f279115470e34b.jpg"
    const updateDataOnFirebase =async()=>{
      const cookies = new Cookies();
        console.log(cookies.get('Name'));
        const id  = cookies.get('Name');
        const query = {id:id,comment:newComment}
      const data = doc(db, `PersonalNews/${newsId}`);
                await updateDoc(data, { Comment: arrayUnion(query)}).then(async()=>{
      alert("Comment added");
      setOpen(false);
      setcommetAdd(true);
      setflag(flag+1);
                })
    }
   /*  const addComment =()=>{
      setcommetAdd(false);
      const cookies = new Cookies();
        console.log(cookies.get('Name'));
        const id  = cookies.get('Name');
        const query = {id:id,comment:""}
        setcommment(commment => commment.concat(query));
    } */
  return (
    <>
    <NavBar/>
    <div className="container">
    <h1 className="text-center " style={{ margin: "35px" }}>
    Category - LocalNews
   </h1>
         
   <div className="rounded mx-auto d-block">
     {loading && <Spinner />}
   </div>
    <div className="row ">
    {Details.map((details, i) => {
        return (
        <div style={{display:details.allow?"":"none"}} className="col-md-4 my-2 ">
    <div className="card" >
      <img src={details.ImageUrl==""?defaultUrl:details.ImageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{details.Heading}</h5>
        <p className="card-text">{details.Text}</p>
        <p className="text-muted my-2"> by <b>{details.Creator==""?"unknown":details.Creator}</b> on {new Date(details.time.toDate()).toGMTString()} </p>
      <FaRegCommentDots onClick={()=>{handleOpen();setcommment(details.Comment);setnewsId(details.id)}} size={30}/>
      <p style={{fontSize: "18px",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "800",
    textAlign: "center",
    lineHeight: "10px",
    display:"inline",
    margin: 0,
    padding: 0,
    marginRight:"13vw",}} >{details.Comment.length}</p>
        {details.url==""?<></>:<a href={details.url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Refrence</a>}
      </div>
    </div>
    </div>
    );
          })}
          </div>
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
            {commmet.map((details, i) => {
        return (
          <>
          <label> comment by - {details.id}</label> <br />
          <TextField variant="outlined"  disabled={true} maxlength="30" type="text" value={details.comment} placeholder='Refrence url' onChange={(event) => {  
            setcommment((prev) => {
                              return prev.filter((curvalue, idx) => {
                                if (idx == i) {
                                  curvalue.Comment = event.target.value;
                                }
                                return curvalue;
                              })
                            }) }} />
         <br /> <br />
         </>
         );
        })}
        {commetAdd?<></>:<TextField variant="outlined"  maxlength="30" type="text" value={newComment} placeholder='Refrence url' onChange={(event) => { setnewComment(event.target.value) }} />}
       {commetAdd?<BiCommentAdd  onClick={()=>{setcommetAdd(false)}} size={30}/>:<></>}
        </DialogContent>
        <DialogActions><Button type="submit" onClick={updateDataOnFirebase} >Submit</Button>
            <Button sx={{color:"red"}}onClick={handleClose}  >Cancel</Button></DialogActions>
      </Dialog>
    </>
  )
}

export default PersonalNews