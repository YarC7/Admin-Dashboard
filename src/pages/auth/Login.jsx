import { Button, Input } from "@nextui-org/react"
import { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser, setToken } from "../../lib/authSlice";
import { setUsername } from "../../lib/userSlice";
import { useCookies } from 'react-cookie';
function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['token'], {
    doNotParse: true,doNotUpdate: true
  });
  const handleLogin = async () => {
    if (!username || !password) {
        alert('Please enter username and password');
        return;
    }
    const account = {username, password}
    console.log(account);
    const url = `${import.meta.env.VITE_API_ENDPOINT}/api/admin/login`;
    const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data)
      if (data.success == true ) {
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(data.user));  // Assuming data.user contains user information
        // dispatch(setToken(data.token)); // Assuming data.token contains the JWT token
        // dispatch(setUsername(username)); // Assuming data.token contains the JWT token
        setCookie('token', data.token);
        sessionStorage.setItem("token", data.token); // Assuming data.token contains the JWT token
      }
      else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if ( !isAuthenticated ) {
    return (
      <div className="relative flex min-h-dvh flex-col pt-16">
          <div className="flex items-center justify-center p-4 ">
              <div className="flex w-full max-w-sm flex-col gap-4  px-8 pb-10 pt-6 border-2 rounded-2xl border-black">
                  <p className="pb-4 text-left text-3xl font-semibold ">Login form</p>
                  <Input
                      type="email"
                      label="Email"
                      labelPlacement="outside"
                      placeholder="Enter your email"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                  />
                  <Input
                      type="password"
                      label="Password"
                      labelPlacement="outside"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={handleLogin}>Login</Button>
              </div>
          </div>  
      </div>
    )
  } else {
    return (
      <div>
        {/* You are ready login , get back to  <Link to={"home"}>dashboard</Link> */}
        <Navigate to={"/home"}/>
      </div>
    )
  }

  
}

export default Login