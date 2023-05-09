import "./singlepost.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import axios from "axios";
import parse from "html-react-parser";
import { MyContext } from "../../context/Context";
import JoditEditor from "jodit-react";



export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { user } = useContext(MyContext);
  const [title,setTitle]=useState("");
    const editor = useRef(null);
    const [desc,setDesc]=useState("");
  const[updateMode,setUpdateMode]=useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
        .get(`http://localhost:5000/api/posts/` + path)
        .then(function (response) {
          setPost(response.data);
          setTitle(response.data.title);
            setDesc(response.data.desc);
          console.log(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${post._id}`,{
       data:{ username:user.username}
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
                username: user.username,
                title,
                desc,
            });
            setUpdateMode(false); // switch back to view mode
        } catch (error) {
            console.log(error);
        }
    };

console.log(user.body);
  if (isLoading) return <h1>Please wait page is loading !!</h1>;
  return (
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo && (
              <img
                  className="singlePostImg"
                  src={`http://localhost:5000/api/image/file/${post.photo}`}
                  alt=""
              />
          )}
          {
           updateMode ? (
               <input type="text"
                      value={title}
                      className="singlePostTitleInput"
                      autoFocus
                      onChange={(e)=>setTitle(e.target.value)}/> ):(

          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                  <i
                      className="singlePostIcon far fa-trash-alt"
                      onClick={handleDelete}
                  ></i>
                </div>
            )}
          </h1>)}
          <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
            <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
          </div>
            {updateMode ? (
                <JoditEditor
                    className="singlePostDescInput"
                    ref={editor}
                    value={desc}
                    onChange={(e) => setDesc(e)}
                />
            ) : (
                <p className="singlePostDesc">{parse(desc)}</p>
            )}
            {updateMode && (
                <button className="singlePostButton" onClick={handleUpdate}>
                    Update
                </button>
            )}

        </div>
      </div>
  );
}
