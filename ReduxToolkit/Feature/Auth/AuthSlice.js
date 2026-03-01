import { createSlice } from "@reduxjs/toolkit";
import { signup, Login } from "./Auththunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    token: localStorage.getItem("jwt") || null,
    authMessage: null
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.authMessage = null;
      localStorage.removeItem("jwt");
      console.log("User logged out, JWT removed");
    }
  },

  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.authMessage = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.jwt;
        state.authMessage = action.payload.massage;
        
        console.log("Signup successful in Redux store");
        console.log("User email:", action.payload.user?.email);
        console.log("JWT stored in state");
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authMessage = null;
        console.error("Signup failed:", action.payload);
      })

      // LOGIN
      .addCase(Login.pending, (state) => {
        console.log("Login process started");
        state.loading = true;
        state.error = null;
        state.authMessage = null;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.jwt;
        state.authMessage = action.payload.massage;
        
        console.log("Login successful in Redux store");
        console.log("User email:", action.payload.user?.email);
        console.log("JWT stored in state");
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.authMessage = null;
        console.error("Login failed:", action.payload);
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;