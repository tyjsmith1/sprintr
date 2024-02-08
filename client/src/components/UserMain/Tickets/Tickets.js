import React from "react"
import { MdDelete } from "react-icons/md";

function Tickets({tickets}) {

    return (
        <ul className="ticket-list">
            {tickets.map((ticket) => (
                <li key={ticket.id} className="ticket-item">
                    <span className="ticket-title">{ticket.title}</span>
                    <MdDelete className="trash"/>
                </li>
            ))}
        </ul>
    )
}

export default Tickets