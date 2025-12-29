import React from 'react'

export default function AuthFilter(Url) {
    const data = sessionStorage.getItem("userCred");

    if (!data){
        return <Navigate to={Url} replace />
    }
    else{

    }
    return <Navigate to="/auth" replace />
}
