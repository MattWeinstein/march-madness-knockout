import styled from 'styled-components'
import './Login.css'

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
    return(
        <form method="post">
            <LoginContainer>
                <LoginInputContainer>
                    <Label for="nameLogin">Username</Label>
                    <LoginInput type="text"  name ="username" placeholder="Username" required></LoginInput>
                </LoginInputContainer>
                <LoginInputContainer>
                    <Label for="passwordLogin">Password</Label>
                    <LoginInput type="text" name ="password" placeholder="Password" required></LoginInput>
                </LoginInputContainer>
                <button type='submit' id='loginButton'class="button">Register</button>
            </LoginContainer>
        </form>
    )
}

export default Login