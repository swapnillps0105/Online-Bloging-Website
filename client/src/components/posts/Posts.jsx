import "./posts.css"
import Post from "../post/Post";

export default function Posts({posts}){
    return (
        <div className="posts">
            {posts.map((p)=>(
                <Post  key={p.id} post={p} />
            ))}




        </div>
    )
}
