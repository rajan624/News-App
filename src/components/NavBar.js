import React, { Component ,useEffect,useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import './NavBar.css'
import { CgProfile } from "react-icons/cg";
import { MdArrowDropDown } from "react-icons/md";
function NavBar() {
  const [logout, setLogout] = useState(true);
  const [Admin , setAdmin]  = useState(false);
  const [name , setname] =useState('');
  const [image , setimage] = useState('');
  const loggingOut = () => {
    setLogout(!logout);
    const cookies = new Cookies();
    cookies.set('Image', "", { path: '/' });
    cookies.set('Name', "", { path: '/' });
    cookies.set('email', "", { path: '/' });
    cookies.set('Admin', "", { path: '/' });
  };
  const navigate = useNavigate();
  const goToLoginPage = () => navigate("/");
  useEffect(()=>{
      const cookies = new Cookies();
        console.log(cookies.get('Name'));
        console.log(cookies.get('email'));
        console.log(cookies.get('Admin'));
        if(cookies.get('Admin')=="Admin@123"){
          setAdmin(true)
        }else{
          setAdmin(false)
        }
        setname(cookies.get('Name'));
        setimage(cookies.get("Image"))

  },[])
  return (
    <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/general">NewsApp</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/general">Home</Link>
                    </li>
                    
                    <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Category
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                        <li><Link className="dropdown-item" data-bs-target="#navbarSupportedContent" to="/general">general (default)</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" to="/business">business</Link></li>
                        <li><Link className="dropdown-item" to="/entertainment">entertainment</Link></li>
                        <li><Link className="dropdown-item" to="/health">health</Link></li>
                        <li><Link className="dropdown-item" to="/science">science</Link></li>
                        <li><Link className="dropdown-item" to="/sports">sports</Link></li>
                        <li><Link className="dropdown-item" to="/technology">technology</Link></li>
                        
                        
                    </ul>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to='/LocalNews'>Local News</Link>
                    </li>
                   {!Admin? <li className="nav-item">
                    <Link className="nav-link" to='/updateNews'>My News</Link>
                    </li>:<></>}
                   {Admin?<li className="nav-item">
                    <Link className="nav-link" to='/AdminComponents'>Admin view</Link>
                    </li>:<></>}
                    <li className="nav-item">
                    <Link className="nav-link" to='/about'>About</Link>
                    </li>
                    
                </ul>
                {/* you can add this search if you wont */}

                {/* <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form> */}

<div className="rightside">
          
    {image=="" ||image==undefined?<CgProfile size={36}/>:  
           <img src={image} className='profileImage'/>}
          <p className="name">{name}</p> 
          <MdArrowDropDown className="icon" onClick={loggingOut} />
          <div className="logout">
            <button
              onClick={goToLoginPage}
              className={"logoutButton" }
              hidden={logout}
            >
              Logout
            </button>
          </div>
        </div>
                </div>
            </div>
        </nav>

      </div>
  )
}

export default NavBar

