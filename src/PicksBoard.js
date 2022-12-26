import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import PicksTable from './PicksTable';

const PicksBoard = () => {

    const [allUsers, setAllUsers] = useState('')
    useEffect(() => {
        getAllUsers()
        async function getAllUsers() {
            try {
                const getUserHandler = await Axios.post('http://localhost:3001/allusers')
                setAllUsers(getUserHandler.data)
            } catch (err) {
                console.log(err)
            }
        }
    }, [])

    return (
        <>
            <h2>Displays everyone picks </h2>
            {allUsers ? <PicksTable userList={allUsers} /> : <section />}
        </>
    );

}

export default PicksBoard;