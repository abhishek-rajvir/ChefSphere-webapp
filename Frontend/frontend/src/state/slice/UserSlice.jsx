import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :{
        id:0,
        token:""
    }
}

const userSlice = createSlice({
    name:"users",
    
    // tell how the slice will be initially that is empty
    initialState,

    // tell the slice how to interact with the slice when action happens
    reducers:{
        // we can dispatch or call this function when we want to make mutations to the state
        loadUser:(state,action)=>{
            // state is autopopulated by dispatch
            state.user = action.payload;
        },
        unLoadUser:(state,action)=>{
            state.user = initialState.user;
        }
    }

})

export const{loadUser,unLoadUser} = userSlice.actions;
export default userSlice.reducer;