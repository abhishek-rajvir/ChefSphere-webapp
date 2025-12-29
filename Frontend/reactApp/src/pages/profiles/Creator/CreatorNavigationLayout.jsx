import React from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import NotFoundPage from '../../error/NotFoundPage';
import CreatorPage from './CreatorPage';
import CreatorSignUp from './CreatorSignUp';
import LoginForm from '../../../../form/LoginForm';
import LoginPage from '../../LoginPage';

export default function CreatorNavigationLayout() {
    
    // param is the name of key
    const parmeter = useParams().param.trim();

    // // If there is no param (route is /creators), show 404
    // // handle invalid ? # urls
    //  if (!parmeter) return <NotFoundPage/>;

    // // If it's a valid number → Creator details page
    // if (/^\d+$/.test(parmeter)) {
    //     return <CreatorPage/>;
    // }
    // Handle keyword routes
    switch (parmeter) {
        case "signup":
            return <CreatorSignUp/>;
        case "login":
            return <Navigate to="/login" replace />;
        case "posts":
            return <CreatorPage postPage={true}/>;
        case "profile":
            return <CreatorPage postPage={false}/>;
        case "followers":
            return <CreatorPage postPage={false}/>;
        case "update":
            return <CreatorUpdate/>;
        case "delete":
            return <CreatorDelete/>;
        default:
            return <NotFoundPage/>;
    }
}
