//allows you to send HTTP requests (GET, POST, PUT, DELETE, etc.) to servers and APIs.
import axios from "axios";

const Base_URL = "http://localhost:9001/creators/";

const list_URI = "list";
const signup_URI = "signUp";
const newpost_URI = "{creator_id}/newPost";

// This class provides all required functionalities for creators
class CreatorService{

    /*
    Promise objects These tasks don’t finish instantly, so instead of blocking the code, JavaScript returns a Promise that will complete later.
    */

    getAllCreators(){
        /*
        Response Example
        {
        "c_id": 1,
        "firstName": "Ava",
        "lastName": "Marin",
        "username": "avamakes",
        "email": "ava.marin.creator1@example.com",
        "gender": "female"
        },
        */

        //return a promise object
        return axios.get(Base_URL+list_URI);
    }

    creatorSignUp(){
        /*
        Request Example
        {
            "firstName": "Sofia",
            "lastName": "Green",
            "username": "sofia.storytells",
            "email": "sofia.green.creator5@example.com",
            "password": "S0fia_Tales7",
            "gender": "female"
        }
        */

        //return a promise object
        return axios.post(Base_URL+signup_URI);
    }

    addPost(id){
        /*
        Request Example
        {
        "post_title": "Inosuke Theme V3",
        "description": "A music remix / OST theme (Demon Slayer – Inosuke Hashibira Theme V3)",
        "videoUrl": "https://music.youtube.com/watch?v=ngMk0oAiyZI&list=RDAMVMngMk0oAiyZI"
        }
        */

        //return a promise object
        return axios.post(Base_URL+newpost_URI.replace("{creator_id}",parseInt(id)));
    }
}

export default new CreatorService();


// class CreatorService{
//     constructor(){
//         this.cre_arr = [{c_id:1,firstName:"Ava",lastName:"Marin",username:"avamakes",
//             email:"ava.marin.creator1@example.com", gender: "female"
//         }]
//     }

//     // return list of all creators
//     getAllCreators(){
//         return (this.cre_arr);
//     }

//     getById(){
//         // implement axios first
//         return (this.cre_arr.c)
//     }

//     // // will add new creator to the list
//     // addCreator(creator){
//     //     this.cre_arr.push(creator);
//     // }

// }

// // when not extending react we must manually create and return new instance 
// export default new CreatorService();