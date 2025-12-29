import axios from 'axios';

const API = axios.create({
    baseURL:"http://localhost:9000"
})
export default function ChefService() {

    const[foodies,setFoodies] = useState([]);
    const[creators,setCreators] = useState([]);
    const[users,setUsers] = useState([]);

    const[userforms,setUserForms] = useState({
        id:0,
        creation_time:"",
        last_time:"",
        email:"",
        first_name:"",
        gender:"",
        last_name:"",
        password:"",
        pic:"",
        type:"",
        username:""
    })

    return (
        <div>
            {/* ChefService */}
            </div>
    )
}
