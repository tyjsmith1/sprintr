import React from "react"

function Tickets({tickets}) {

    return (
        <ul className="ticket-list">
            {tickets.map((ticket) => (
                <li key={ticket.id}>{ticket.title}</li>
            ))}
        </ul>
    )
}

export default Tickets