import styled from 'styled-components'
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


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

const Button = styled.button`
    all:unset;
    margin:10px;
    cursor:pointer;
    padding: 2px 15px;
    border: 2px solid black;
    border-radius: 5px;
    &:hover{
        background:silver;
    }
    &:active{
        background:gray;
    }
`


function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate(`/user/${user}`, { state: { user: user } })
        }
    })

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const loginHandler = (user) => {
        setUser(user)
    }

    const logoutHandler = () => {
        setUser(null)
    }

    const getUserHandler = () => {
        Axios.post('http://localhost:3001/allusers')
            .then((response) => {
                console.log(response)
            })
    }

    const checkLoginHandler = (req, res) => {
        Axios.post('http://localhost:3001/login', {
            username: username,
            password: password
        })
            .then((response) => {
                const selectedUser = response.data[0].username
                if (selectedUser) {
                    loginHandler(selectedUser)
                } else if (!selectedUser) {
                    setErrorMessage(response.data)
                    setUser(false)
                }
            })
    }

    const addUserHandler = () => {
        Axios.post('http://localhost:3001/adduser', {
            username: username,
            password: password
        })
            .then((response) => {
                setErrorMessage(response.data)
            })
    }
    return (
        <section>
            <LoginContainer>
                <LoginInputContainer>
                    <Label >Username</Label>
                    <LoginInput type="text" name="username" placeholder="Username" onChange={usernameHandler}></LoginInput>
                </LoginInputContainer>
                <LoginInputContainer>
                    <Label >Password</Label>
                    <LoginInput type="text" name="password" placeholder="Password" onChange={passwordHandler}></LoginInput>
                </LoginInputContainer>
                <Button onClick={checkLoginHandler} id='loginButton'>Check Login</Button>
                <Button onClick={addUserHandler} >Add User</Button>
                <Button onClick={getUserHandler} >Get User</Button>
                <div>{errorMessage}</div>
            </LoginContainer>
        </section>
    )
}

export default Login