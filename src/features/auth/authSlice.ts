import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of the authentication state.
interface AuthState {
  token: string | null;
  email: string | null;
}

// Type the initial state.
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Type the action payload using PayloadAction<T>
    setAuth(state, action: PayloadAction<{ token: string; email: string }>) {
      const { token, email } = action.payload;
      state.token = token;
      state.email = email;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    },
    clearAuth(state) {
      state.token = null;
      state.email = null;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
