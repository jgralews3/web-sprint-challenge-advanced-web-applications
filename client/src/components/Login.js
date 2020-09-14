import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const Login = () => {
    const {push} = useHistory();
    const initialState = {username: "", password: ""}

    const [user, setUser] = React.useState(initialState);

    const handleChanges = e => {
        setUser({...user, [e.target.name]: e.target.value});
        console.log(user)
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/login", user)
        .then((res)=> {
            console.log("success:", res);
            localStorage.setItem("token", res.data.payload);
            push('/bubbles');
        })
        .catch(err=>console.log("failed login:", err))
    }

    return (
        <div>
          <h1>Welcome to the Bubble App!</h1>
            <form>
                <input name="username" placeholder="Username" onChange={handleChanges} />
                <input name="password" placeholder="Password" onChange={handleChanges} />
                <button onClick={handleSubmit}>Log In</button>
            </form>
        </div>
    )
}

export default Login;