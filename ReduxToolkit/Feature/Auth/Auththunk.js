import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Utils/API";

export const signup = createAsyncThunk(
    "auth/signup", 
    async (userData, { rejectWithValue }) => {
        try {
            console.log("Sending signup request:", {
                email: userData.email,
                username: userData.username
            });
        
            const res = await api.post("/auth/signup", userData);
            
            console.log("SignUp response:", res.data);
            
            // Store JWT if it exists in response
            if (res.data.jwt) {
                localStorage.setItem("jwt", res.data.jwt);
                console.log("SignUp JWT stored");
            }
            
            return res.data;
        } catch (error) {
            console.error("SignUp Error Details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                config: {
                    url: error.config?.url,
                    data: error.config?.data
                }
            });
            
            let errorMessage = "Signup failed";
            
            if (error.response) {
            
                const serverError = error.response.data;
                
                if (serverError && typeof serverError === 'object') {
                
                    errorMessage = serverError.message || 
                                  serverError.massage ||  
                                  serverError.error ||
                                  serverError.detail ||
                                  JSON.stringify(serverError);
                } else if (serverError) {
                    errorMessage = serverError;
                }
                
                // Add status code to message for debugging
                errorMessage = `[${error.response.status}] ${errorMessage}`;
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
                errorMessage = "No response from server. Check if backend is running.";
            } else {
                // Error in setting up the request
                errorMessage = `Request setup error: ${error.message}`;
            }
            
            return rejectWithValue(errorMessage);
        }
    }
);

export const Login = createAsyncThunk(
    "auth/Login", 
    async (userData, { rejectWithValue }) => {
        try {
            console.log("Sending login request with email:", userData.email);
            const res = await api.post("/auth/Login", userData);
            
            console.log("Login response received:", res.data);
            
            // Store JWT from AuthResponse
            if (res.data.jwt) {
                localStorage.setItem("jwt", res.data.jwt);
                console.log("JWT stored in localStorage");
                
                // Log email and JWT (first 20 chars)
                console.log("Email:", userData.email);
                console.log("JWT Token (first 20 chars):", res.data.jwt.substring(0, 20) + "...");
                console.log("Login successful");
            }
            
            return res.data;
        } catch (error) {
            console.error("Login Error Details:", {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            const errorMessage = error.response?.data?.massage ||  
                               error.response?.data?.message ||
                               error.response?.data?.title ||
                               error.response?.data?.error ||
                               error.message || 
                               "Login failed";
            
            return rejectWithValue(errorMessage);
        }
    }
);
