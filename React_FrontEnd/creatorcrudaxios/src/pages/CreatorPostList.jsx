import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CreatorService from "../service/CreatorService";

export default function CreatorPostList(){
    const params = useParams();
    const location = useLocation();
    const [post,setpost] = useState({})

    useEffect(()=>{
        // setPost (location.state.creatdata)

        CreatorService.getById(params.c_id)
        .then((result)=>{
            setpost({...result.data.data})
        })
        .catch((err)=>{
            console.log(err)
        })

    },[params,id])

    return(
        // <Link to=""
        <>
        <h5>You have selected {params.c_id} </h5>
        </>

    )
}