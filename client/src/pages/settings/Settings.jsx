import "./settings.css"
import Sidebar from "../../components/sidebar/Sidebar";
import {useContext, useState} from "react";
import {MyContext} from "../../context/Context";
import axios from "axios";


export default function Settings(){
const {user}=useContext(MyContext);

    return (
        <div className="settings">
            <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update Your Account</span>
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
                <form className="settingsForm">
                    <label>Profile Picture</label>

                    <div className="settingsPP">
                        <img
                            src={`http://localhost:5000/api/image/file/`+user.profilePic}
                            alt=""
                        />

                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: "none" }}
                            className="settingsPPInput"
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder="Swapnil"/>
                    <label>Email</label>
                    <input type="email" placeholder="swapnil@gmail.com"/>
                    <label>Password</label>
                    <input type="password"/>
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                </form>
            </div>
                <Sidebar/>

        </div>
    );
};


