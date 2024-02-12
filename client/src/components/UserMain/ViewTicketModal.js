import React, {useState, useEffect} from "react";
import "./NewTicketModal/NewTicketModal.css"
import CommentsList from "./CommentsList"

function ViewTicketModal({ toggleViewTicketModal, selectedTicket }) {
    const [ticketDetails, setTicketDetails] = useState(null)
    const [comments, setComments] = useState([])
    const [isClosing, setIsClosing] = useState(false);

    const id = selectedTicket.id

    const startCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            toggleViewTicketModal();
        },500);
    };

    useEffect(()=>{
        if (selectedTicket && selectedTicket.id) {
            fetch(`/tickets/${selectedTicket.id}`)
            .then(response => response.json())
            .then(ticketData => {
                setTicketDetails(ticketData)

            fetch(`/ticket-logs/${selectedTicket.id}`)
            .then(response => response.json())
            .then(commentData => {
                console.log(commentData)
                setComments(commentData)
            })
        })}
    },[selectedTicket])

    return (
        <div className={`modal ${isClosing ? 'fade-out-modal' : ''}`}>
            <div className={`overlay ${isClosing ? 'fade-out-overlay' : ''}`}>
                <div className="modal-content">
                    {ticketDetails ? (
                        <>
                            <h1>{ticketDetails.title}</h1>
                            <p className="ticket-body">{ticketDetails.body}</p>
                            <br></br>
                            <CommentsList comments={comments} />
                            <br></br>
                            <textarea className="input" cols="100" placeholder="Comment area"></textarea>
                            <br></br>
                        </>
                    ) : (
                        <p>Loading ticket details...</p>
                    )
                }
                    <button className="close-modal" onClick={startCloseModal}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ViewTicketModal