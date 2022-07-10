import React, { useState } from "react";
import "../Style/Login.css";
import { MdOutlineMail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { BsEyeFill } from "react-icons/bs";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import GoogleLogin from "react-google-login";
import { sendPasswordResetEmail } from "firebase/auth";
import { app } from "../FirebaseCofig";
import { useNavigate } from "react-router-dom";
import { ReactComponent as YourSvg } from "../loginpage.svg";
import { ReactComponent as GoogleSvg } from "../googleIcon.svg";
import Cookies from 'universal-cookie';
import Logo from "../pexels-lisa-fotios-1369476.jpg"
function Login() {
  const CLIENT_ID ="163665332436-h327v3d8l6avv1v1i04tufm6s0hhse0n.apps.googleusercontent.com";
  const [eamil, seteamil] = useState("");
  const [password, setpassword] = useState("");
  const [visiPassword, setvisiPassword] = useState(true);
  const [change, setchange] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [userName, setUserName] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNameError, setUserNameError] = useState('');

  const clearInputs = () => {
    setUserNameError("");
    setpassword("");
  };

  const clearErrors = () => {
    setUserNameError("");
    setPasswordError("");
  };

  const handleLogin = () => {

    clearErrors();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, eamil, password)
      .then((userCredential) => {

        const user = userCredential.user;
      /*   setCookie("UID", user.uid); */
      const cookies = new Cookies();
      cookies.set('Admin', "Admin@123", { path: '/' });
      cookies.set('Name', "Admin", { path: '/' });
      cookies.set('Image', "", { path: '/' });
        alert("successfully login");
        goToHomepage();
      })
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-username":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setUserNameError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };
  const inputStyle = {
    width: "24.75vw",
    height: "32px",
    background: "#ffffff",
    border: "1.44px solid #dfdfdf",
    borderRadius: "4px",
    padding: "0",
    margin: "0",
    paddingLeft: "1vw",
    fontSize: "17px",
  };
  const buttonStyle = {
    padding: "0",
    margin: "0",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    background: "#007aff",
    borderRadius: "6px",
    padding: "1.5vw",
    height: "35px",
    border: "none",
    cursor: "pointer",
    marginTop: "1.5vw",
  };
  const hide = {
    display:"none"
  };
  //  const goToLoginPage = () => navigate('/vendor-registration-details',window.name = "John"{userDetails});
  const goToHomepage = () => navigate("/home");
  /*     const hello =async(res)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ 
            "idToken":res,
            "ssoType": "google",
            "vendor": true })
        };
        
    } */
    const sendmail = () => {
      if(eamil==""){
        alert("Pleae enter mail")
      }else{
      const auth = getAuth();
  
      var actionCodeSettings = {
        url: "http://localhost:3000",
        handleCodeInApp: false,
      };
          sendPasswordResetEmail(auth, eamil, actionCodeSettings)
            .then(() => {
              alert("Reset link sent");
              setUserNameError("");
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setUserNameError(errorMessage);
              // ..
              console.log(errorCode + errorMessage);
            });
          }
          }
  const onSuccess = async (res) => {
    console.log(res.profileObj)
    const cookies = new Cookies();
    cookies.set('Image', res.profileObj.imageUrl, { path: '/' });
    cookies.set('Name', res.profileObj.name, { path: '/' });
    cookies.set('email', res.profileObj.email, { path: '/' });
 
    cookies.set('One', "LOG", { path: '/' });
    window.Image = res.profileObj.imageUrl;
    goToHomepage();
          /*.then(response => this.setState({ totalReactPackages: response.data.total }));
             axios({
                url: 'https://api.uat.stylerentindia.com/api/auth/login',
                method: 'get',
                headers: {
                    'Bearer': response1.data.token,
                    'Content-Type': 'application/json'
                }
             })
             .then(response => {
                console.log(response)
             }) 
             .catch(err => {
                console.log(err);
             }); */
            };
    /*   hello(res.tokenId)
        /* const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
            "idToken":res.tokenId,
            "ssoType": "google",
            "vendor": true })
        };
          await fetch('https://api.uat.stylerentindia.com/api/auth/login', requestOptions).then(response => console.log(response.json()))
        .then(data => console.log(data.id)); */
  const onFailure = (res) => {
    console.log(res);
  };
  const seePassword = () => {
    setvisiPassword(!visiPassword);
  };
  const formHandle = (e) => {
    e.preventDefault();
  };
  const focusEmail = () => {
    console.log("hello");
    document.getElementById("emailInputField").focus();
  };
  return (
    <div style={{background: "linear-gradient(to right, rgb(54, 0, 51), rgb(11, 135, 147))"}}>
      {/* <YourSvg color='red' fill='blue' /> */}
      <div style={{background: "linear-gradient(to right, rgb(54, 0, 51), rgb(11, 135, 147))"}} className="loginPage">
        <div style={{background: "linear-gradient(to right, rgb(54, 0, 51), rgb(11, 135, 147))"}} className="loginLeft">
          <div className="companyLogo">
            {/* <img src={product} alt="logo" className='logoimage'/>
                    <p className="companyName">
                        Stylerent
                    </p> */}
         {/*    <Logo /> */}
          </div>
          <div  className="centralContent">
            <div className="centralContetnItems">
              <p style={{fontSize:"15px", fontWeight:" 200px", color:"white"}} className="tagLine">START YOUR EXPERIENCE WITH OneTouch</p>
              <p style={{color:"white"}} className="loginAccountText">Login your account</p>
              <form
                onSubmit={formHandle}
                id="emailPasswordForm"
                className={change?"emailPasswordForm":"hide"}
              >
                <div className="email">
                  <p className="label">E-mail</p>
                  <div className="field">
                    <MdOutlineMail
                      onClick={focusEmail}
                      color="#DFE2E6"
                      size={20}
                      className="emailIcon"
                    />
                    <input
                      type="email"
                      value={eamil}
                      className="emailInputField"
                      placeholder="Your E-mail"
                      onChange={(event) => {
                        seteamil(event.target.value);
                      }}
                    />
                  </div>
                <span style={{color:"white"}} > {userNameError}</span> 
                </div>
                <div className="email">
                  <p className="label">Passoword</p>
                  <div className="field">
                    <div className="emailIcon-div">
                      <IoMdKey
                        onClick={focusEmail}
                        color="#DFE2E6"
                        size={20}
                        className="emailIcon"
                      />
                    </div>
                    <input
                      value={password}
                      type={visiPassword ? "password" : "text"}
                      className="emailInputField"
                      placeholder="Your Password"
                      onChange={(event) => {
                        setpassword(event.target.value);
                      }}
                    />
                    <div className="emailIcon-div">
                      <BsEyeFill
                        onMouseOver={seePassword}
                        onMouseOut={seePassword}
                        onClick={focusEmail}
                        color="#DFE2E6"
                        size={20}
                        className="emailIconEye"
                      />
                    </div>
                  </div>
                 <span style={{color:"white"}}>{passwordError}</span> 
                </div>
                <div className="loginRegistrationButton">
                  {/* <button type="submit" className="register">
                    Register
                  </button> */}
                  <button
                    onClick={() => {
                      handleLogin();
                    }}
                    type="submit"
                    className="loginSubmit"
                  >
                    Login As Admin
                  </button>
                </div>
                <div className="rememberForgetButtons">
                  <div className="rememberMe">
                    <input type="checkbox" className="checkbox" />

                    <p className="rememberMeText">Remember me</p>
                  </div>
                  <a  href="#" className="forgetPasswordLink">
                    <button className="for" style={{background: "linear-gradient(to right, rgb(54, 0, 51), rgb(11, 135, 147))" , color:"white"}} onClick={sendmail}>Forgot Password?</button>
                    
                  </a>
                </div>
                <div className="or">
                  <div className="or-bar">
                    <div className="or-bar-cnt"></div>
                  </div>
                  <div className="text">or</div>
                  <div className="or-bar">
                    <div className="or-bar-cnt"></div>
                  </div>
                </div>
              </form>
              {/* <button onClick={handleEvent}>click</button> */}

              {/*  <div  className ="loginSubmit" hidden={admin}>
                        <label>Email</label><br />
                        <input style={inputStyle} type="email"  onChange={(event) => { seteamil(event.target.value); }}/>
                        <br /><br />
                        <label>Password</label><br />
                        <input style={inputStyle} type="password"  onChange={(event) => { setpassword(event.target.value); }} /> <br /><br />
                        <button style={buttonStyle} onClick={()=>{logingAsAdmin()}}> <p className="text">Login</p></button>
                        </div> */}
              <div className="googleLogin">
                <GoogleLogin
                  style={{ marginTop: "2.5vh", backgroundColor: "red" }}
                  clientId={CLIENT_ID}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      className="googleButton"
                    >
                      <div className="iconGoogle">
                        <GoogleSvg
                          style={{
                            padding: "0px",
                            margin: "0px",
                            height: "19px",
                            width: "30px",
                          }}
                        />
                      </div>
                      <p
                        className="googleButtontext"
                        style={{
                          width: "17vw",
                          color: "#ffffff",
                          fontSize: "16px",
                        }}
                      >
                        LOGIN WITH GOOGLE
                      </p>
                    </button>
                  )}
                  buttonText="Login with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>
              </div>
               <form
                onSubmit={formHandle}
                id="emailPasswordForm"
                className="emailPasswordForm"
              >
              </form>
              <br />
            </div>
          </div>
          <div  className="bottom-main">
            <div className="bottom">
              <p className="contactSupport">Contact Support</p>
              <p className="privacyPolicy">Privacy Policy</p>
            </div>
          </div>
        </div>
        <div className="loginRight">
          <img src={Logo} alt="prod" className='rightIamge' />
        </div>
      </div>
    </div>
  );
}

export default Login;
