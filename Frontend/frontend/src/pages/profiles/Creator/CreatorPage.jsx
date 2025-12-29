import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

import CreatorService from "../../../service/CreatorService";
import CreatorTable from "./CreatorTable";
import { requestLog } from "../../../jwt/axios_helper";

export default function CreatorPage({postPage=false,profilePage=false,followersPage=false}) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);

  const navigate = useNavigate();

  const loadUser = () => {
    const data = sessionStorage.getItem("userCred");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getListOfFollowers = async (name,id) => {
    try {
      requestLog("Fetched all followers of creator "+name+" ID: "+id);
      const data = await CreatorService.getFollowers(id);
      console.log(data);
      return data;
    } catch (err) {
      return [];
    }
  };

  const getPosts = async (name,id) => {
    try {
      requestLog("Fetched creator posts for "+name+" ID: "+id);
      const data = await CreatorService.getCreatorsPosts();
      console.log(data);
      return data;
    } catch (err) {
      return [];
    }
  };

  const unloadUser = (name,id) => {
    const data = sessionStorage.removeItem("userCred");
    console.log("User Logged out");
    navigate("/login", { replace: true });
    requestLog("CREATOR "+name +" ID: "+id+" Logged Out");
  };

  useEffect(() => {
    const u = loadUser();
    if (!u) {
      navigate("/login", { replace: true });
      return;
    }
    setUser(u);

    if(postPage){
      // async function implicitly called
      (async () => {
        const p = await getPosts(u.name,u.id);
        setPosts(p);
      })();
    }
    
    else if(followersPage){
      (async () => {
        const f = await getListOfFollowers(u.name,u.id);
        setFollowers(f);
      })();
    }

  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink
            to="/creators/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            aria-current={({ isActive }) => (isActive ? "page" : undefined)}
          >
            👨‍🍳{user.name}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <NavLink
                to="/creators/posts"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                Posts
              </NavLink>
            
              <NavLink
                to="/creators/profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                Profile
              </NavLink>
            
              <NavLink
                to="/creators/followers"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current={({ isActive }) => (isActive ? "page" : undefined)}
              >
                Followers
              </NavLink>
              {/* <li className="nav-item">
                <a href="/followers" className="nav-link active" aria-current="page">
                  Followers
                </a>
              </li> */}
              <li>
                <button className="btn btn-outline-success me-2" type="button" onClick={()=>unloadUser(user.name,user.id)}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">

          { postPage ?(
              posts ? (
                <div>
                  <CreatorTable posts={posts} />
                </div>
              ) : (
                <h4 align="center">You have no posts show</h4>
              )
            )
            :
            
            followersPage ?(
              followers ? (
                <div>
                  <CreatorTable followers={followers} />
                </div>
              ) : (
                <h4 align="center">You have no followers</h4>
              )
            )
            :
            <></>
          }
      </div>
    </>
  );
}
