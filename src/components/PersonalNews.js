import React from 'react'
import { useState ,useEffect } from 'react';
import { db } from '../FirebaseCofig';
import Spinner from "./Spinner";
import { collection, getDocs } from 'firebase/firestore';
import NavBar from './NavBar';
function PersonalNews() {
    const [Details , setDetails] = useState([]);
    const [loading  ,setloading] = useState(true);
    
    useEffect(() => { 
        const getUsers = async () => {
            const usercollectionRef = collection(db, `PersonalNews`)
          const data = await getDocs(usercollectionRef);
          console.log(data);
          setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setloading(false);
        };
        getUsers();
      }, []);
    const defaultUrl = "https://i.pinimg.com/originals/d1/a6/2a/d1a62a6d8969170025f279115470e34b.jpg"
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
        {details.url==""?<></>:<a href={details.url} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Refrence</a>}
      </div>
    </div>
    </div>
    );
          })}
          </div>
    </div>
    </>
  )
}

export default PersonalNews