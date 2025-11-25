import { useEffect, useState } from "react";
import CreatorService from "../service/CreatorService";
import { Link } from "react-router-dom";

export default function CreatorList(){
    const [cre_arr,setcre_arr] = useState([])

    // initialisation useEffect , it is same as lifecycle method
    // best place to call apis
    useEffect(()=>{
        // gets list of creators and stores them at initialization

        // retrieve and add data
        fetchData();
    },[])

    const fetchData= async ()=>{
        const result = await CreatorService.getAllCreators()
        result.then((res)=>{
            console.log(res.data);
            setcre_arr(res.data);
        })
        <div className="catch"></div>{
            console.log("Failed to load creator list");
        }
    }

    return(
        <>
        <Link to="/creators"></Link>
        <table className="table table-striped table-hover" style={{'textAlign':"center"}}>
              <thead>
                <tr>
                <th scope="col">Sr.no</th>
                <th scope="col">Name</th>
                {/* <th scope="col">Firstname</th>
                <th scope="col">Lastname</th> */}
                <th scope="col">Username</th>
                {/* <th scope="col">Email</th>
                <th scope="col">Gender</th> */}
                <th scope="col">View</th>
                </tr>
            </thead>
            <tbody>
                {cre_arr.map((creatr)=>
                    // set row number based on creator id
                    <tr key={creatr.c_id}>
                        <th scope="row">{creatr.c_id}</th>
                        <td>{creatr.username}</td>
                        <td>{creatr.firstName} {creatr.lastName}</td>
                        {/* <td>{creatr.email}</td> */}
                        {/* <td>{creatr.gender}</td> */}
                        <td>
                            <Link to={`${creatr.c_id}/view/posts`} state={{creatordata:creatr}}>
                            <button type="button" class="btn btn-info">Posts</button>
                            </Link>
                            &nbsp;
                            &nbsp;
                            {/* <Link to={`${creatr.c_id}/view/blogs`} state={{creatordata:creatr}}> */}
                            <button type="button" class="btn btn-info">Blogs</button>
                            {/* </Link> */}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        </>
    )
}