import React, {useEffect, useState} from "react";
import Tickets from '../UserMain/Tickets/Tickets'

function UserMain() {

    const [tickets, setTickets] = useState([])

    function loadTickets(){
        fetch('/tickets')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTickets(data)
        })
    }

    useEffect(() => {
        loadTickets()
    },[])

    return(
        <div>
            <h1>UserMainPage!</h1>
            <ul>
                <Tickets key={tickets.id} tickets={tickets}/>
            </ul>
        </div>
    )
}

export default UserMain