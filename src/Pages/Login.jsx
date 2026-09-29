import React from "react";

export default function login(){
    return(
        <>
        <div>
        <div className="log">
            <h1>Welcome Back</h1>
            <p>Login to continue exploring educational events</p>
            <input type="text" placeholder="Email / Username"></input>
            <input type="password" placeholder="Password"></input>
            <input type="checkbox">Remember me</input>
            <span>Forgot Password?</span>
            <button>Login</button>
            <p>Don't have an account? <span>Sign Up</span></p>
        </div>
        <div>
            <h1>Hello,Friend!</h1>
            <p>Create your EventFlow account and start discovering educational events</p>
            <button>REGISTER →</button>
        </div>
        <div>'
            <h1>Create Your Account</h1>
            <p>Join EventFlow and start exploring educational events</p>
            <input type="text" placeholder="Enter Your Full Name"></input>
             <input type="email" placeholder="Enter Your Email"></input>
              <input type="password" placeholder="Create a password"></input>
               <input type="password" placeholder="Confirm your password"></input>
               <button></button>
        </div>
        </div>
        </>
    )
}