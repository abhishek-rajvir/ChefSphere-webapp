import axios from "axios";

// Rest api url for fetching
const API_URL = "http://localhost:9001/foodies/list";

/*
Response Example
{
    "f_id": 5,
    "firstName": "Kai",
    "lastName": "Johnson",
    "username": "kaimoves",
    "email": "kai.johnson@example.com",
    "gender": "non-binary"
}
*/
 
 const FoodieService = async () => {
   try {
     // method : get 
     const response = await axios.get(API_URL);
     // return data if succesfull
     return response.data;
     // else axios error
  } catch (err) {
    console.error("Foodie Axios error:", err);
    throw err;
  }
};

export default FoodieService;
