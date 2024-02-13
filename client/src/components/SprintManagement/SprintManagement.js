import React, { useState, useEffect } from "react";
import Q1SprintOptions from "./Q1SprintOptions/Q1SprintOptions";
import Q2Analytics from "./Q2Analytics/Q2Analytics";
import Q3SprintTicketList from "./Q3SprintTicketList/Q3SprintTicketList";
import Q4Contributions from "./Q4Contributions/Q4Contributions";
import './SprintManagement.css'

function SprintManagement(){

    const [incompleteTickets, setIncompleteTickets] = useState([])
    const [completeTickets, setCompleteTickets] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        fetchIncompleteTickets()
    },[])

    function fetchIncompleteTickets() {
        let stagingIncompleteTickets = []
        let stagingCompleteTickets = []
        fetch('/tickets')
        .then(response => response.json())
        .then(tickets => {
            stagingIncompleteTickets = tickets.filter(ticket => ticket.status !== 'complete')
            setIncompleteTickets(stagingIncompleteTickets)

            stagingCompleteTickets = tickets.filter(ticket => ticket.status === 'complete')
            setCompleteTickets(stagingCompleteTickets)

            setIsLoading(false)
        })
    }

    return (
        <div>
            <div className="sprint-div-container">
                <div className="Q1-container"><Q1SprintOptions/></div>
                <div className="Q2-container"><Q2Analytics incompleteTickets={incompleteTickets} completeTickets={completeTickets}/></div>
                <div className="Q3-container"><Q3SprintTicketList incompleteTickets={incompleteTickets} isLoading={isLoading}/></div>
                <div className="Q4-container"><Q4Contributions/></div>
            </div>
        </div>
    )
}

export default SprintManagement