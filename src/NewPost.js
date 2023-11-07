import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
/*import api from "./api/posts"
import { useState,useContext } from "react";
import DataContext from "./context/DataContext";*/
import { useStoreActions,useStoreState } from "easy-peasy";

const NewPost = (/*{ postTitle, setPostTitle, postBody, setPostBody, handleSubmit }*/) => {
  const postTitle=useStoreState((state)=>state.postTitle);
  const postBody=useStoreState((state)=>state.postBody);
  const posts=useStoreState((state)=>state.posts);

  const setPostTitle=useStoreActions((actions)=>actions.setPostTitle);
  const setPostBody=useStoreActions((actions)=>actions.setPostBody);
  const savePost=useStoreActions((actions)=>actions.savePost);
  /*const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const { posts,setPosts }=useContext(DataContext);*/
  
  const handleSubmit =() => {
    const id = posts.length ? (posts[posts.length - 1].id + 1) : 1;
    const datetime = format(new Date(), 'MMMM dd , yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    /*try {
        const response = await api.post(`/posts/`, newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle("");
        setPostBody("");
    } catch (err) {
        console.log(`Error:${err.message}`);
    }*/
    savePost(newPost);
};
  let navigace=useNavigate();
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={(e)=>{e.preventDefault();handleSubmit(); navigace("/");}}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit"> Submit</button>
      </form>
    </main>
  )
}

export default NewPost
