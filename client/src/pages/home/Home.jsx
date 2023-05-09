import "./home.css";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
export default function Home(){
    const [posts,setPosts]=useState([])
    const {search}=useLocation()

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/posts/`+search)
            .then(function (response) {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },[search])
    return (
        <>
        <Header/>
        <div className="home">
            <Posts posts={posts}/>
            <Sidebar/>
        </div>
        </>
    );
};
