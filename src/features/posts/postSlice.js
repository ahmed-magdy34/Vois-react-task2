// src/features/posts/postsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Replace the posts array with new data.
    updatePosts(state, action) {
      state.posts = action.payload;
    },
    // Append a new post to the posts list.
    addPost(state, action) {
      state.posts.push(action.payload);
    },
    // Remove a post identified by its unique id.
    removePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    // Update an existing post based on its id.
    updatePost(state, action) {
      const { id, data } = action.payload;
      const index = state.posts.findIndex((post) => post.id === id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...data };
      }
    },
  },
});

export const { updatePosts, addPost, removePost, updatePost } =
  postsSlice.actions;
export default postsSlice.reducer;
