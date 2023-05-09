import axios from "axios";
import JoditEditor from "jodit-react";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Context";
import "./write.css";

export default function Write() {
  const { user } = useContext(MyContext);

  const editor = useRef(null);
  let navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");

  const handleSubmit = async (e) => {
    //  Save image .
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    if (imageName === "") {
      alert("Image is empty");
      return;
    }
    try {
      const response = await axios.post(
          "http://localhost:5000/api/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    // Save Blog data
    const newPost = {
      username: user.username,
      title: title,
      desc: content,
      categories: [],
      photo: imageName,
    };
    axios
        .post(`http://localhost:5000/api/posts`, newPost)
        .then((res) => {
          navigate(`/post/${res.data._id}`);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
      <div className='write'>
        {file && (
            <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
        )}
        <form className='writeForm'>
          <div className='writeFormGroup'>
            <label htmlFor='fileInput'>
              <i className='writeIcon fas fa-plus'></i>
            </label>
            <input
                type='file'
                id='fileInput'
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setImageName(e.target.files[0].name);
                }}
            />
            <input
                type='text'
                placeholder='Title'
                className='writeInput'
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='writeFormGroup'>
            {

              <JoditEditor
                  ref={editor}
                  value={content}
                  onChange={(newContent) => setContent(newContent)}
              />
            }
          </div>
          <button className='writeSubmit' type='button' onClick={handleSubmit}>
            Publish
          </button>
        </form>
      </div>
  );
}