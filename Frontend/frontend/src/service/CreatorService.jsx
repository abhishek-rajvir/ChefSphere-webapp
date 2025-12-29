import { request, requestJwt, requestParamJwt } from '../jwt/axios_helper';

// login user
const RegisterCreator = async (details) => {
  try {
    const res = await request("POST", "/creators/signUp", details,"Creator "+res.data.name+" was Registered");
    return res.data;
  } catch (err) {
    throw new Error("Register Failed: invalid creator details");
  }
};

const getCreatorsPosts = async ()=>{
  try{
    const res = await requestJwt("GET","/posts/listAll");
    return res.data;
  }
  catch(err){
    throw new Error("Post fetch failed");
  }
}

const getFollowers = async (cid)=>{
  try{
    const res = await requestParamJwt("GET","/creators/followers",{},cid,"");
    return res.data;
  }
  catch(err){
    throw new Error("failed to fetch all followers");
  }
}

export default {
  RegisterCreator,
  getCreatorsPosts,
  getFollowers
}

