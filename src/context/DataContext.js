import { useState, createContext, useEffect } from "react";
/*import { format } from 'date-fns';
import api from "../api/posts";*/
/*import useWindowSize from '../hooks/useWindowSize';*/
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    /*const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');*/
    const [searchResults, setSearchResults] = useState([]);
    /*const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');*/
   /* const { width } = useWindowSize();*/
    const { data, fetchError, isLoading } = useAxiosFetch("http://localhost:3001/posts");

    /* useEffect(() => {
       const fatchPost = async () => {
         try {
           const response = await api.get('/posts');
           setPosts(response.data);
         } catch (err) {
           if(err.response){
             //není 200 přizpůsobený rozsah chyb
           console.log(err.response.data);
           console.log(err.response.status);
           console.log(err.response.header);
           }else{
             console.log(`Error:${err.message}`);
           }
         }
       }
       fatchPost();
     }, [])*/
    useEffect(() => {
        setPosts(data);
    }, [data]);


    useEffect(() => {
        const filterResult = posts.filter((post) => (
            ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
            ((post.title).toLowerCase()).includes(search.toLowerCase())
        ))
        setSearchResults(filterResult.reverse());
    }, [posts, search])

    /*const handleSubmit = async () => {
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
            console.log(`Error:${err.message}`);
        }
    };*/


    /*const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd , yyyy pp');
        const updatePost = { id, title: editTitle, datetime, body: editBody };
        try {
            const response = await api.put(`/posts/${id}`, updatePost);
            setPosts(posts.map((post) => post.id === id ? { ...response.data } : post));
            setEditTitle('');
            setEditBody('');

        } catch (err) {
            console.log(`Error:${err.message}`);
        }
    }*/

    /*const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`);
            const postsList = posts.filter(post => post.id !== id);
            setPosts(postsList);
        } catch (err) {
            console.log(`Error:${err.message}`);
        }
    };*/
    return (
        <DataContext.Provider value={
            {
                /*width,*/ search, setSearch,
                searchResults, setSearchResults, isLoading, fetchError,
                /*postTitle, setPostTitle, postBody, setPostBody, handleSubmit,*/
                posts, setPosts, /*handleEdit, editBody, setEditBody, editTitle, setEditTitle,*/
                /*handleDelete*/
            }
        }>
            {children}
        </DataContext.Provider>
    )

}

export default DataContext;