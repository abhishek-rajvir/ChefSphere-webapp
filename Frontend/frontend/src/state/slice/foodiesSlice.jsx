import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodies : [
        {
            id:1,
            name:"Interstellar"
        },
        {
            id:2,
            name:"Harry Potter"
        }
    ],
}

const foodiesSlice = createSlice({
    name:"foodies",
    
    // tell how the slice will be initially that is empty
    initialState,

    // tell the slice how to interact with the slice when action happens
    reducers:{
        // we can dispatch or call this function when we want to make mutations to the state
        addFoodie:(state,action)=>{
            // state is autopopulated by dispatch
            // since action is passed as string object
            const newId = state.foodies.length ? state.foodies[state.foodies.length-1].id +1 : 1;
            console.log(newId);
            const newFoodie = {
                // check if foodies is empty
                // get the last element from the state and increment it
                id: newId,
                name:action.payload,
            };
            // action payload  = contents to be pushed
            state.foodies.push(newFoodie);
        },
        removeFoodie:(state,action)=>{
            state.foodies = state.foodies.filter((f)=> f.id !== action.payload);
        }
    }

})

export const{addFoodie,removeFoodie} = foodiesSlice.actions;
export default foodiesSlice.reducer;