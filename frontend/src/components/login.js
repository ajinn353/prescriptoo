import React, { useState, useRef } from 'react';
import Header from './header';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const nameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);

  const handlesubmit = async (e) => {
    e.preventDefault();

    let endpoint = "http://localhost:3300/api/user";

    let formdata = isLogin
        ? { action: "login", email: loginEmailRef.current.value, password: loginPasswordRef.current.value }
        : { action: "signup", name: nameref.current.value, email: emailref.current.value, password: passwordref.current.value };

    try {
        let response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        });

        let result = await response.json();


        if (!response.ok) {
            throw new Error(result.error || "Something went wrong");
        }

        toast.success(result.message || "Success!", { position: "top-right" });

       
        if (result.user) {  
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("islogin", "true");
          
          setTimeout(() => navigate("/"));  
      }

        if (isLogin) {
            loginEmailRef.current.value = "";
            loginPasswordRef.current.value = "";
        } else {
            nameref.current.value = "";
            emailref.current.value = "";
            passwordref.current.value = "";
        }

    } catch (error) {
        console.error("Error:", error);
        toast.error(error.message, { position: "top-right" });
    }
};


  return (
    <div className='container'>
      <Header />
      <form className='login' onSubmit={handlesubmit}>
        <div className='loginform'>
          {isLogin ? (
            <>
              <p className='createacc'>Login</p>
              <p>Please login to book an appointment</p>
              <div className='w-full'>
                <p>Email</p>
                <input type='text' required className='inputvalue mt-1' ref={loginEmailRef} ></input>
              </div>
              <div className='w-full'>
                <p>Password</p>
                <input type='password' required className='inputvalue mt-1' ref={loginPasswordRef} ></input>
              </div>
              <button className="w-full py-2 my-2 createaccbtn" type="submit" >Login</button>
              <p>
                Create new an account?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setIsLogin(false)}
                >
                  <u>click here</u>
                </span>
              </p>
            </>
          ) : (
            <>
              <p className='createacc'>Create Account</p>
              <p>Please sign up to book an appointment</p>
              <div className='w-full'>
                <p>Full Name</p>
                <input type='text' required className='inputvalue mt-1' ref={nameref}></input>
              </div>
              <div className='w-full'>
                <p>Email</p>
                <input type='text' required className='inputvalue mt-1' ref={emailref}></input>
              </div>
              <div className='w-full'>
                <p>Password</p>
                <input type='password' required className='inputvalue mt-1' ref={passwordref}></input>
              </div>
              <button className="w-full py-2 my-2 createaccbtn" type='submit' >Create account</button>
              <p>
                Already have an account?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setIsLogin(true)}
                >
                  <u>Login here</u>
                </span>
              </p>
            </>
          )}
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Login;
