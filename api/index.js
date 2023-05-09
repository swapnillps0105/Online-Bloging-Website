const express=require('express')
const app=express();
const mongoose=require('mongoose');
const url='mongodb://localhost/BlogDBex'
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require("./routes/posts")
const categoryRoute=require("./routes/categories")
const fileRoute=require("./routes/FileRoutes")

const cors=require("cors")
const path = require("path");
app.use(express.json());
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(url,{
  useNewUrlParser:true,
  useUnifiedTopology:true,

})
const con=mongoose.connection
con.on('open',()=> {
  console.log('connected...')
})


  

app.use("/api/auth", authRoute); 
app.use("/api/users", userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",categoryRoute);
app.use("/api/image",fileRoute)

app.listen('5000',()=>{
    console.log('Server Started')
})