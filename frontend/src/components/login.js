import React, { useState, useRef, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Login() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(""); // store error message
  const navigate = useNavigate();

  const nameref = useRef(null);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const loginEmailRef = useRef(null);
  const loginPasswordRef = useRef(null);

  // Auto-focus fields on mount (using useEffect)
  useEffect(() => {
    if (isLogin) {
      loginEmailRef.current.focus();
    } else {
      nameref.current.focus();
    }
  }, [isLogin]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    let endpoint = "https://prescriptoo-xhav.onrender.com/api/user";

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
          localStorage.setItem("userId", result.user._id);
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

        setError(""); // Clear error on success
    } catch (error) {
        console.error("Error:", error);
        setError(error.message); // Set the error message
    } finally {
        setLoading(false); // Stop loading
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
                <input type='text' required className='inputvalue mt-1' ref={loginEmailRef}></input>
              </div>
              <div className='w-full'>
                <p>Password</p>
                <input type='password' required className='inputvalue mt-1' ref={loginPasswordRef}></input>
              </div>
              {error && <p className="error-message">{error}</p>} {/* Show error below fields */}
              <button 
                className="w-full py-2 my-2 createaccbtn" 
                type="submit" 
                disabled={loading} // Disable button during loading
              >
                {loading ? "Logging in..." : "Login"} {/* Change button text */}
              </button>
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
              {error && <p className="error-message">{error}</p>} {/* Show error below fields */}
              <button 
                className="w-full py-2 my-2 createaccbtn" 
                type='submit' 
                disabled={loading} // Disable button during loading
              >
                {loading ? "Creating account..." : "Create account"} {/* Change button text */}
              </button>
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
