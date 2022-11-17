import React from 'react';
import { useParams } from "react-router"
import styled from 'styled-components'

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: roboto mono;
`

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-text: center;
    align-items: center;
`

const GameList = styled.ul`
    padding:0px 0px;
    margin: auto;
    text-align: center;
    align-items: center;
`

const Game = styled.li`
    all:unset;
    display:flex;
    padding:0px 0px;
    justify-content: center;
    align-items: center;
    margin: auto;
`

function UserHomepage ()  {
    const { username } = useParams('')
    return(
        <PageContainer>
            <Section>
                <h1>Welcome {username}</h1>
                <p>This is your homepage. You can't customize it right now, but maybe you can in the future.</p>
            </Section>
            <Section>
                <h2>This is where you make your picks</h2>
                <h3>Games today</h3>
                <GameList>
                    <Game>Syracuse vs Illinois</Game>
                    <Game>Ohio St vs Kentucky</Game>
                    <Game>Villanova vs Eastern Mississippi</Game>
                    <Game>Boston College vs Albany</Game>
                </GameList>
            </Section>
        </PageContainer>
    )
}

export default UserHomepage