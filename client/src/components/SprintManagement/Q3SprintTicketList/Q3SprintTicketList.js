import React, { useEffect, useState } from "react";
import '../SprintManagement.css'

function Q3SprintTicketList({incompleteTickets,isLoading}) {
    const [priorityTickets, setPriorityTickets] = useState([]);

    useEffect(() => {
        function sortTickets(tickets){
            const ticketsCopy = [...tickets]
            return ticketsCopy.sort((a,b) => {
                if (a.urgency === b.urgency) {
                    return b.story_points - a.story_points
                }
                return b.urgency - a.urgency
            }).slice(0,10)            
        }
        
        setPriorityTickets(sortTickets(incompleteTickets))
    },[incompleteTickets])

    if (isLoading) {
        return <div>Loading tickets...</div>
    }

    return (
        <div className="ticket-list">
            <h3>Highest Priority Open Tickets</h3>
            {priorityTickets.length ? (
                <ul className="q3-ul">
                    {priorityTickets.map(ticket => (
                        <li key={ticket.id} className="q3-li">
                            {ticket.title} - Urgency: {ticket.urgency},  Story Points: {ticket.story_points}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No remaining tickets.</p>
            )}
        </div>
    )
}

export default Q3SprintTicketList