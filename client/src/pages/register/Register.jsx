import "./register.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error,setError]=useState(false);
    const [file,setFile]=useState(null);
    let navigate = useNavigate();
    const handleSubmit = async ()=> {
        const data = {
            username:username,
            email:email,
            password:password,
            profilePic:file.name
        }
        console.log(data);
        const formData = new FormData();
        formData.append("file", file);
        axios.post(
            "http://localhost:5000/api/image/upload",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
            .then(res=>console.log(res))
            .catch(error=>console.log(error))
        setError(false)
        axios.post(`http://localhost:5000/api/auth/register`,data)
        .then(response=>{
            toast.success(`Congratulation your account is created !!`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              navigate("/login")
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
        <div className="register">
            <span className="registerTitle">Register</span>
            <div className="registerForm" >
                <label>Username</label>
                <input
                    className="registerInput"
                    type="text"
                    placeholder="Enter your username..."
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    className="registerInput"
                    type="email"
                    placeholder="Enter your email..."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    className="registerInput"
                    type="password"
                    placeholder="Enter your password..."
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/*Image for User Registration*/}
                <input
                    type='file'
                    id='fileInput'
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        // setImageName(e.target.files[0].name);
                    }}
                />
                <button className="registerButton" onClick={handleSubmit} type={"button"}>
                    Register
                </button>

            </div>
            <button className="registerLoginButton" >
                <Link className="link" to="/login">
                    login
                </Link>
            </button>
            { error&&<span style={{color:"red" ,marginTop:"10px"}}>Something went Wrong!</span>}
        </div>
    );
};