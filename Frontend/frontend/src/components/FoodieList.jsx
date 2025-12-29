// hooks
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFoodie } from "../state/slice/foodiesSlice";

export const FoodieList = ()=>{
    // useSelector helps selecting a specified state from the store and its derived data
    const foodies = useSelector(
        // callback function 
        (state)=>(
            // name of the slice to access followed by name of state in the slice
            state.foodies.foodies
        )
    )

    const dispatch = useDispatch();

    const handleRemoveFoodie = (id)=>{

        // payload contains id to delete 
        dispatch(removeFoodie(id));
    }

    return(
        <>
        <div>
        <h2 align="center">List of Foodies</h2>

        {/* Calls a defined callback function on each element of an array, and returns an array that contains the results. */}
        {foodies.length>0 ? 
            <table align="center" cellPadding={5}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody style={{textAlign:"left"}}>

                    {foodies.map(
                        (f)=>(
                            // each element becomes a div tag of given id and contents to display
                            <tr key={f.id}>
                                <td>{f.name}</td>
                                <td><button type="button" onClick={()=>{handleRemoveFoodie(f.id)}}>Delete Foodie</button></td>
                            </tr>
                        )
                    )}

                </tbody>
            </table>
        :<></>}

        </div>
        </>
    )
}
