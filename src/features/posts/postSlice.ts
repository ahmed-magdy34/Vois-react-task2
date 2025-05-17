import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Post } from "./postTypes"; // Adjust the path if needed

// Define the shape of our posts state.
interface PostsState {
  posts: Post[];
}

// Initialize the state with type safety.
const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Replace the posts array with new data.
    updatePosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    // Append a new post to the posts list.
    addPost(state, action: PayloadAction<Post>) {
      state.posts.push(action.payload);
    },
    // Remove a post identified by its unique id.
    removePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    // Update an existing post based on its id.
    updatePost(
      state,
      action: PayloadAction<{ id: string; data: Partial<Post> }>
    ) {
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
