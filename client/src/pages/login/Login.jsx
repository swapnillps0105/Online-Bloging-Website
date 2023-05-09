import axios from "axios";
import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Context";
import "./login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const {
    setLogin,
    setUser,
  } = useContext(MyContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    axios.post(`http://localhost:5000/api/auth/login`,{
        username: userRef.current.value,
        password: passwordRef.current.value,
    })
    .then(response=>{
        localStorage.setItem('userData', JSON.stringify(response.data));
        console.log(response.data);
        setUser(response.data);
        setLogin(true);
        toast.success(`🦄 Wow so easy!,Welcome back ${response.data.username}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        navigate("/")
    })
    .catch(error=>{
      toast.error("Something went wrong please console !!",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        console.log(error);
    })
  };

  return (
    <div className='login'>
      <span className='loginTitle'>Login</span>
      <div className='loginForm' >
        <label>Username</label>
        <input
          className='loginInput'
          type='text'
          placeholder='Enter your username...'
          ref={userRef}
        />
        <label>Password</label>
        <input
          className='loginInput'
          type='password'
          placeholder='Enter your password...'
          ref={passwordRef}
        />
        <button className='loginButton' type='button'  onClick={handleSubmit}>
          Login
        </button>
      </div>
      <button className='loginRegisterButton'>
        <Link className='link' to='/register'>
          Register
        </Link>
      </button>
    </div>
  );
}
