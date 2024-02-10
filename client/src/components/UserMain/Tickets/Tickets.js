import React from "react"
import { MdDelete } from "react-icons/md";

function Tickets({allTickets, handleTicketSelect, handleTicketDelete}) {

    function handleDeleteClick(event, ticketId){
        event.stopPropagation()
        handleTicketDelete(ticketId)
    }

    return (
        <ul className="ticket-list">
            {allTickets.map((ticket) => (
                <li key={ticket.id} className="ticket-item" onClick={() => handleTicketSelect(ticket)}>
                    <span className="ticket-title">{ticket.title}</span>
                    <MdDelete onClick={(event) => handleDeleteClick(event, ticket.id)} className="trash"/>
                </li>
            ))}
        </ul>
    )
}

export default Tickets