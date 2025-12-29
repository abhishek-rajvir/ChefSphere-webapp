import { useState } from "react"
import { addFoodie } from "../state/slice/foodiesSlice";
import { useDispatch } from "react-redux";

// ask use for input to add foodie
export const FoodieInput = () => {
    // useState to keep track of what user is adding
    const[newFoodie,setNewFoodie] = useState("");

    const dispatch = useDispatch();
    // a function which will add movie when button is clicked
    const handleAddFoodie = ()=>{
        if(newFoodie){
            // dispatch allows to call any action from the store
            dispatch(addFoodie(newFoodie));
            // set foodie state to empty after add operation.
            setNewFoodie("");
        }
    }

    return(
        <>
            <div style={{textAlign:"center"}}>
            <input onChange={(e)=>setNewFoodie(e.target.value)} value={newFoodie}/>
            <button type="button" onClick={handleAddFoodie}>Add Foodie</button>
            </div>
        </>
    )
}