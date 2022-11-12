import styled from 'styled-components'
import Axios from 'axios';
import { useState,useEffect,useSearchParams } from 'react';
import { Route, Navigate, useNavigate } from "react-router-dom";


const Label = styled.label`
    color: blue
`

const LoginContainer = styled.section`
    margin: 10px 0px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`

const LoginInput = styled.input`
    display: flex;
    margin: 5px 0px;
    border: 2px solid  rgb(234, 36, 69);
    border-radius: 5px;
`
const LoginInputContainer = styled.div``


function Login () {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState(null)

    const navigate = useNavigate()

    useEffect(()=>{
        if (user){
        navigate(`/user/${user}`)
        }
    })

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const getUserHandler = () => {
        Axios.post('http://localhost:3001/test',{
            username: username
        })
        .then((response) => {
            console.log(response)
        })    
    }

    const loginHandler = (req,res) => {
        Axios.post('http://localhost:3001/login',{
            username: username,
            password: password
        })
        .then((response) => {
            const selectedUser = response.data[0].username

            if(selectedUser){
                setUser(selectedUser)
            } else if(!selectedUser){
                setUser(false)
            }
        })    
    }

    const addUserHandler = () => {
    Axios.post('http://localhost:3001/adduser',{
        username: username,
        password: password
    })
        .then((response) => {
            console.log(response)
        })
    }
    return(
        <section>
            <LoginContainer>
                <LoginInputContainer>
                    <Label >Username</Label>
                    <LoginInput type="text"  name ="username" placeholder="Username" onChange={usernameHandler}></LoginInput>
                </LoginInputContainer>
                <LoginInputContainer>
                    <Label >Password</Label>
                    <LoginInput type="text" name ="password" placeholder="Password" onChange={passwordHandler}></LoginInput>
                </LoginInputContainer>
                <button onClick={loginHandler} id='loginButton'>Check Login</button>
                <button onClick={addUserHandler} >Add User</button>
                <button onClick={getUserHandler} >Get User</button>
            </LoginContainer>
        </section>
    )
}

export default Login