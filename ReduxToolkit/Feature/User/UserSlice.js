import { createSlice } from "@reduxjs/toolkit"
import { logout } from "../Auth/AuthSlice"
import { getAllCashier, getAllCustomer, getUserById, getUserProfile, Logout } from "./UserThunk"

const initialState={

    userProfile:null,
    users:[],
    customer:[],
    cashier:[],
    selectedUser:null,
    loading:false,
    error:null

}

const userslice=createSlice({
    name:"user",
    initialState,
    reducers:{
        ClearUserState:(state)=>{
            state.userProfile=null,
            state.selectedUser=null,
            state.users=[],
            state.customer=[],
            state.cashier=[],
            state.error=null

        }
    },

    extraReducers:(builder)=>{
        builder
        .addCase(getUserProfile.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.userProfile=null
        })
            .addCase(getUserProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.userProfile=action.payload
        })
         .addCase(getUserProfile.rejected,(state , action)=>{
            state.loading=true;
            state.error=action.payload;
    
        })

      .addCase(getAllCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
      })

      .addCase(getAllCashier.fulfilled, (state, action) => {
        state.cashier = action.payload;
      })

      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.userProfile = null;
        state.selectedUser = null;
        state.error = null;
      })
    }
})

export default userslice.reducer;