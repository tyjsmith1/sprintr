import React from "react";
import Q1SprintOptions from "./Q1SprintOptions/Q1SprintOptions";
import Q2Analytics from "./Q2Analytics/Q2Analytics";
import Q3SprintTicketList from "./Q3SprintTicketList/Q3SprintTicketList";
import Q4Contributions from "./Q4Contributions/Q4Contributions";
import './SprintManagement.css'

function SprintManagement(){

    return (
        <div>
            <div className="sprint-div-container">
                <div className="Q1-container"><Q1SprintOptions/></div>
                <div className="Q2-container"><Q2Analytics/></div>
                <div className="Q3-container"><Q3SprintTicketList/></div>
                <div className="Q4-container"><Q4Contributions/></div>
            </div>
        </div>
    )
}

export default SprintManagement