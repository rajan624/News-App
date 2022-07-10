import React, { Component } from 'react'
import './About.css'
import NavBar from './NavBar';
import img from '../img.jpeg'
export default class About extends Component {
  render() {
    return (
      <div style={{background: "linear-gradient(to right, rgb(192, 72, 72), rgb(72, 0, 72))" ,marginTop:"-4vw"}} >
        <NavBar/>
<div style={{background: "linear-gradient(to right, rgb(95, 44, 130), rgb(73, 160, 157))"}} className="about-section">
  <h1>About Us Page</h1>
  <p> OneTouch News feed app you can read all latest news updates on your fingertips. Application updates information from different source in Systematized way. Stay updated with breaking news, current events & daily news headlines on politics , business, technology ,sports & more for India & world.You can share your News.</p>
</div>

<h2 style={{textAlign:"center"}}>Our Team</h2>
<div className="row">
  <div className="column">
    <div style={{background: "linear-gradient(to right, rgb(95, 44, 130), rgb(73, 160, 157))"}} className="card">
      <img src={img} alt="Jane" style={{width:"50%" , marginLeft:"8vw"}}/>
      <div className="container">
        <h2>Rajan</h2>
        <p className="title">CEO & Founder</p>
        <p>System Software Engineer at Krishworks.com.</p>
        <p><button className="button">  <a style={{textDecoration: "none",color: "white"}} href="https://www.youtube.com/c/jamesqquick" target={"blank"}>
    Contact
      </a></button></p>  
      </div>
    </div>
  </div>

  <div className="column">
    <div style={{background: "linear-gradient(to right, rgb(95, 44, 130), rgb(73, 160, 157))"}}  className="card">
      <img src={img} alt="Mike" style={{width:"50%", marginLeft:"8vw"}}/>
      <div className="container">
        <h2>Rajan</h2>
        <p className="title">Art Director</p>
        <p>System Software Engineer at Krishworks.com.</p>
        <p><button className="button"><a style={{textDecoration: "none",color: "white"}} href="https://www.youtube.com/c/jamesqquick" target={"blank"}>
    Contact
      </a></button></p>
      </div>
    </div>
  </div>
  
  <div className="column">
    <div style={{background: "linear-gradient(to right, rgb(95, 44, 130), rgb(73, 160, 157))"}} className="card">
      <img src={img} alt="John" style={{width:"50%" , marginLeft:"8vw"}}/>
      <div className="container">
        <h2>Rajan</h2>
        <p className="title">Designer</p>
        <p>System Software Engineer at Krishworks.com</p>
        <p><button className="button"><a style={{textDecoration: "none",color: "white"}} href="https://www.youtube.com/c/jamesqquick" target={"blank"}>
    Contact
      </a></button></p>
      </div>
    </div>
  </div>
</div>

      </div>
    )
  }
}
