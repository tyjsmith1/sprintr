import React, {useState, useEffect} from "react";
import "./NewTicketModal/NewTicketModal.css"

function ViewTicketModal({ toggleViewTicketModal, selectedTicket, viewTicketModal }) {
    const [ticketDetails, setTicketDetails] = useState(null)
    const [comments, setComments] = useState(null)


    const id = selectedTicket.id

    useEffect(()=>{
        if (selectedTicket && selectedTicket.id) {
            fetch(`/tickets/${selectedTicket.id}`)
            .then(response => response.json())
            .then(data => {
                setTicketDetails(data)
        })}
    },[selectedTicket])

    return (
        <div className={`modal ${viewTicketModal ? 'open' : ''}`}>
            <div className="overlay" onClick={toggleViewTicketModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {ticketDetails ? (
                        <>
                            <h1>{ticketDetails.title}</h1>
                            <p>{ticketDetails.body}</p>
                            <br></br>
                            <p>Existing comments will go here</p>
                            <br></br>
                            <textarea className="input" cols="100" placeholder="Comment area"></textarea>
                            <br></br>
                        </>
                    ) : (
                        <p>Loading ticket details...</p>
                    )
                }
                    <button className="close-modal" onClick={toggleViewTicketModal}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ViewTicketModal