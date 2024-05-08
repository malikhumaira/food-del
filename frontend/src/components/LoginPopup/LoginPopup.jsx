import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
  const {url, setToken}= useContext(StoreContext)

    const [currState, setCurrState] = useState("Sign Up")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
      // onChangeHandler() will get input values and will store them in dataState variable
    const onChangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value
      // to set these values in the above data state variable
      setData(data => ({...data, [name]:value}))
    }
    // useEffect(()=>{console.log(data)},[data])

    const onLogin = async (event)=> {
      event.preventDefault();
      
      let newUrl = url;
      if(currState==="Log In") {
        newUrl += "/api/user/login"
      } else {
        newUrl += "/api/user/register"
      }
      // api call
      const response = await axios.post(newUrl, data);
      if(response.data.success){
        // if it is success then we will get one token(JWT) & will save it in local storage
         setToken(response.data.token);
        localStorage.setItem("token", response.data.token)
        // to hide login page after successfully loging in
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    }
  return (
    <div className="login-popup">
       <form onSubmit={onLogin} action="" className="login-popup-container">
           <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
           </div>
           <div className="login-popup-inputs">
            {currState==="Log In"? <></> : <input name='name' value={data.name} onChange={onChangeHandler} type="text" placeholder='Your name' required/>}
            
            <input type="email" name='email' value={data.email} onChange={onChangeHandler} placeholder='Your email' required/>
            <input type="password" name="password" value={data.password} onChange={onChangeHandler} placeholder='Password' required/>
           </div>
           <button type='submit'>{currState==="Sign Up"?"Create account":"Log In"}</button>
           <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
           </div>
           {currState==="Log In"
           ? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>  Click here</span></p>
           : <p>Already have an account? <span onClick={()=>setCurrState("Log In")}>Login here</span> </p>}
           
        </form> 
    </div>
  )
}

export default LoginPopup