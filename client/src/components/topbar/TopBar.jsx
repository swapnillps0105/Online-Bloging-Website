import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopBar.css";
import { MyContext } from "../../context/Context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function TopBar(){
    let navigate=useNavigate();
    const {
        isLogin,
        setLogin,
        user,
        setUser,
        baseUrl
      } = useContext(MyContext);
      const handleLogout=()=>{
        setUser({});
        localStorage.removeItem('userData')
        toast.success(`🦄 See you soon !`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        setLogin(false);
        navigate("/login")
      }
    return (
        <div className="top">
           <div className="topLeft">
               <i className="topIcon fa-brands fa-square-facebook"></i>
               <i className="topIcon fa-brands fa-square-twitter"></i>
               <i className="topIcon fa-brands fa-square-pinterest"></i>
               <i className="topIcon fa-brands fa-square-instagram"></i>
           </div>
            <div className="topCenter">
               <ul className="topList">
                   <li className="topListItem" onClick={()=>{
                       navigate("/")}}> HOME</li>
                   <li className="topListItem" onClick={()=>{
                       navigate("/About")}}>ABOUT</li>
                   <li className="topListItem" onClick={()=>{
                       navigate("/Contact")}}>CONTACT</li>
                   <li className="topListItem" onClick={()=>{
                       navigate("/Write")
                   }}>WRITE</li>
                   <li className="topListItem" onClick={handleLogout}>
                       { isLogin&&"LOGOUT"}</li>
               </ul>
            </div>

            <div className="topRight">
                {
                    isLogin ? (
<Link to="/settings" >
                        <img className="topImg"
                             src={`http://localhost:5000/api/image/file/`+user.profilePic}
                             alt=""/>
</Link>
                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>

                        </ul>
                    )
                }
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
)
}