import { createStore, action, thunk, computed } from "easy-peasy";
import api from './api/posts';

export default
    createStore({
        posts: [],
        setPosts: action((state, payload) => {
            state.posts = payload;
        }),

        postTitle: [],
        setPostTitle: action((state, payload) => {
            state.postTitle = payload;
        }),

        postBody: [],
        setPostBody: action((state, payload) => {
            state.postBody = payload;
        }),

        editTitle: [],
        setEditTitle: action((state, payload) => {
            state.editTitle = payload;
        }),
        editBody: [],
        setEditBody: action((state, payload) => {
            state.editBody = payload;
        }),

        search: '',
        setSearch: action((state, payload) => {
            state.search = payload;
        }),

        searchResults: [],
        setSearchResults: action((state, payload) => {
            state.searchResults = payload;
        }),

        postCount: computed((state) => state.posts.length),
        getPostId: computed((state) => {
            return (id) => state.posts.find(post => (post.id).toString() === id);
        }),

        savePost: thunk(async (action, newPost, helper) => {
            const { posts } = helper.getState();
            try {
                const response = await api.post(`/posts/`, newPost);
                action.setPosts([...posts, response.data]);
                action.setPostTitle("");
                action.setPostBody("");
            } catch (err) {
                console.log(`Error:${err.message}`);
            }
        }),

        deletePost: thunk(async (action, id, helper) => {
            const { posts } = helper.getState();
            try {
                await api.delete(`/posts/${id}`);
                const postsList = posts.filter(post => post.id !== id);
                action.setPosts(postsList);
            } catch (err) {
                console.log(`Error:${err.message}`);
            }
        }),

        editPost: thunk(async (action, updatePost, helper) => {
            const {posts} = helper.getState();
            const { id } = updatePost;
            try {
                const response = await api.put(`/posts/${id}`, updatePost);
                action.setPosts(posts.map((post) => post.id === id ? { ...response.data } : post));
                action.setEditTitle('');
                action.setEditBody('');

            } catch (err) {
                console.log(`Error:${err.message}`);
            }
        })

    });
