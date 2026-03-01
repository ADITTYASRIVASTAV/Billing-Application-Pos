 import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Utils/API";

 export const getUserProfile = createAsyncThunk("user/getProfile",
    async(token, {rejectedWithValue})=>{
        try{
            const res = await api.get("api/users/profile",{
                headers:{Authorization:`Bearer ${token}`},
            });

            console.log("User profile get Succesfully " , res.data);
            return res.data
            
        }

        catch(error)
        {
            console.log("error" , error?.response?.data);
            return rejectedWithValue(error?.response?.data?.message||"failed to fetch profile");
            
        }
    }
  )



   export const getAllCustomer = createAsyncThunk("user/getCustomer",
    async(token, {rejectedWithValue})=>{
        try{
            const res = await api.get("api/users/Customer",{
                headers:{Authorization:`Bearer ${token}`},
            });

            console.log("User Customer get Succesfully " , res.data);
            return res.data
            
        }

        catch(error)
        {
            console.log("error" , error?.response?.data);
            return rejectedWithValue(error?.response?.data?.message||"failed to customer");
            
        }
    }
  )



   export const getAllCashier = createAsyncThunk("user/getcasier",
    async(token, {rejectedWithValue})=>{
        try{
            const res = await api.get("api/users/cashier",{
                headers:{Authorization:`Bearer ${token}`},
            });

            console.log("cashier profile get Succesfully " , res.data);
            return res.data
            
        }

        catch(error)
        {
            console.log("error" , error?.response?.data);
            return rejectedWithValue(error?.response?.data?.message||"failed to fetch cashier");
            
        }
    }
  )


     export const getUserById = createAsyncThunk("user/getById",
    async(userId, {rejectedWithValue})=>{
        try{
            const res = await api.get(`api/users/${userId}`,{
                headers:{Authorization:`Bearer ${token}`},
            });

            console.log("cashier profile get Succesfully " , res.data);
            return res.data
            
        }

        catch(error)
        {
            console.log("error" , error?.response?.data);
            return rejectedWithValue(error?.response?.data?.message||"failed to fetch userByID");
            
        }
    }
  )



       export const Logout = createAsyncThunk("user/logout",
    async(userId, {rejectedWithValue})=>{
        try{

             localStorage.removeItem("jwt")
        }

        catch(error)
        {
            console.log("error" , error);
            return rejectedWithValue("failed to  logout");
            
        }
    }
  )