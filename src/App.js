import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {DataProvider} from "./context/DataContext";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from './EditPost';
import About from "./About";
import Missing from "./Missing";


/*import { format } from 'date-fns';
import api from "./api/posts";
import useWindowSize from './hooks/useWindowSize';*/
import { useEffect } from "react";
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';


function App() {
 /* const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3001/posts");


  useEffect(() => {
    setPosts(data);
    console.log(data);
  }, [data]);


  useEffect(() => {
    const filterResult = posts.filter((post) => (
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase())
    ))
    setSearchResults(filterResult.reverse());
  }, [posts, search])


  const handleSubmit = async () => {
    const id = posts.length ? (posts[posts.length - 1].id + 1) : 1;
    const datetime = format(new Date(), 'MMMM dd , yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post(`/posts/`, newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
    } catch (err) {
      console.log(`Erroe:${err.message}`);
    }
  };
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd , yyyy pp');
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(posts.map((post) => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');

    } catch (err) {
      console.log(`Erroe:${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
    } catch (err) {
      console.log(`Erroe:${err.message}`);
    }
  };*/

const setPosts=useStoreActions((actions)=>actions.setPosts);


  const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3001/posts");

  useEffect(() => {
      setPosts(data);
  }, [data, setPosts]);
  return (
    <Router>
      <div className="App">
        <Header 
            title="React JS Blog-výukový"
            /*width={width} */
        />
        <DataProvider>

          <Nav
            /*search={search}
            setSearch={setSearch}*/
          />
          <Routes>
            <Route path='/' element={<Home
              /*posts={searchResults}*/
              fetchError={fetchError}
              isLoading={isLoading}
            />} />
            <Route path='/post' element={<NewPost
              /*handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}*/
            />} />
            <Route path='/edit/:id' element={<EditPost
              /*posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}*/
            />} />
            <Route path='/post/:id' element={<PostPage 
           /* posts={posts} 
            setPosts={setPosts} 
            handleDelete={handleDelete} */
            />} />
            <Route path='/about' element={<About />} />
            <Route path='/*' element={<Missing />} />
          </Routes>
          <Footer />
        </DataProvider>
      </div>
    </Router>
  );
}

export default App;
