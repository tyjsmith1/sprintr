import React, { useEffect, useState } from "react";

function UserDropDownFilter({onUserSelection}){
    const [users, setUsers] = useState([])

        // For User Filter
    useEffect(() => {
            fetch('/users')
            .then(response => response.json())
            .then(data => {
                // console.log(data.username)
                setUsers(data)
            })
    },[])

    function handleUserChange(e){
        onUserSelection(e.target.value)
    }

    return (
        <select onChange={handleUserChange} defaultValue="">
            <option value="all" >All User Tickets</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
            ))}
        </select>
    )
}

export default UserDropDownFilter