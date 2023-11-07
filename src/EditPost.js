import { useParams, Link, useNavigate } from "react-router-dom";
import { /*useContext,*/ useEffect /*, useState */} from "react";
/*import DataContext from "./context/DataContext";*/
import { format } from 'date-fns';
/*import api from "./api/posts";*/
import { useStoreActions,useStoreState } from "easy-peasy";

const EditPost = (/*{
    posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}*/) => {
    /*const {posts, setPosts}=useContext(DataContext);*/
    const navigace = useNavigate();
    const { id } = useParams();
    const posts=useStoreState((state)=>state.posts);
    const setPosts=useStoreActions((actions)=>actions.setPosts);
    const editTitle=useStoreState((state)=>state.editTitle);
    const setEditTitle=useStoreActions((actions)=>actions.setEditTitle);
    const editBody=useStoreState((state)=>state.editBody);
    const setEditBody=useStoreActions((actions)=>actions.setEditBody);
    const getPostId=useStoreState((actions)=>actions.getPostId);
    const post=getPostId(id);
    const editPost=useStoreActions((actions)=>actions.editPost);
    /*const post = posts.find((post) => (post.id).toString() === id);*/
    /*const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');*/

    useEffect(() => {
        if (post) {
            setEditBody(post.body);
            setEditTitle(post.title);
        }
    }, [post, setEditBody, setEditTitle])


    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd , yyyy pp');
        const updatePost = { id, title: editTitle, datetime, body: editBody };
        editPost(updatePost);
        /*try {
            const response = await api.put(`/posts/${id}`, updatePost);
            setPosts(posts.map((post) => post.id === id ? { ...response.data } : post));
            setEditTitle('');
            setEditBody('');

        } catch (err) {
            console.log(`Error:${err.message}`);
        }*/
    }
    return (
        <main className="NewPost">
            {editTitle &&
                <>
                    <h2>New Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Body:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" onClick={() => { handleEdit(post.id); navigace("/"); }}> Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Page Not Fount.</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to="/">Visit Our Homepage.</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost
