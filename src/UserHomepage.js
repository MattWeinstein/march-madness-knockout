import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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



function UserHomepage() {
    const location = useLocation()
    const [user, setUser] = useState('')
    const [games, setGames] = useState([])
    const getLiveGames = () => {
        Axios.post('http://localhost:3001/livegames')
            .then((response) => {
                setGames(response.data)
            })
    }
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate(`/user/${user}`)
        }
        getLiveGames()

    }, [])

    return (
        <PageContainer>
            <Section>
                <h1>Welcome {user} </h1>
                <p>This is your homepage. You can't customize it right now, but maybe you can in the future.</p>
            </Section>
            <Section>
                <h2>This is where you make your picks</h2>
                <h3>Games today</h3>
                <GameList>
                    {games.map((ele, index) =>
                        <Game key={index}>{ele.team1} vs. {ele.team2}</Game>
                    )}
                </GameList>
            </Section>
        </PageContainer>
    )
}

export default UserHomepage
