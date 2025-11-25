
// functional component for navbar

import { NavLink } from "react-router-dom";

// only one default func / classNameName can exist
export default function MainNavBar(){ // lambda funtion
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/creators">Creator List</NavLink>
                </li>
                {/* <li className="nav-item">
                <a className="nav-link" href="">Creator List</a>
                </li> */}
                <li>
                    <NavLink className="nav-link" to="/Posts" ></NavLink>
                </li>
                <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">About us</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </>
    );
}