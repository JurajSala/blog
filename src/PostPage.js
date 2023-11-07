import {useParams, Link, useNavigate} from 'react-router-dom';
/*import { useContext } from 'react';
import api from "./api/posts";
import DataContext from './context/DataContext';*/
import { useStoreActions,useStoreState } from 'easy-peasy';

const PostPage = (/*{posts, handleDelete}*/) => {
  /*const {posts,setPosts}=useContext(DataContext);*/
  const {id}=useParams();
  const navigace=useNavigate();
  const getPostId=useStoreState((actions)=>actions.getPostId);
  const deletePost=useStoreActions((actions)=>actions.deletePost);
  const post=getPostId(id);     /*posts.find(post=>(post.id).toString()===id);*/
  

  const handleDelete = async (id) => {
    deletePost(id);
    /*try {
        await api.delete(`/posts/${id}`);
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
    } catch (err) {
        console.log(`Error:${err.message}`);
    }*/
};
    return (
      <main className='PostPage'>
        <article className='post'>
          {post&& 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
            <button className="deleteButton" onClick={()=> {
              handleDelete(post.id);
              navigace("/");
            } }>
               Delete Post
            </button>
          </>}
          {!post&& <>
          <h2>Post not found</h2>
          <p>Well, that´s disappointing</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
          </>}
          
        </article>
      </main>
    )
  }
  
  export default PostPage
  