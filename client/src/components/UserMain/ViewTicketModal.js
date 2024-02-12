import React, {useState, useEffect} from "react";
import "./NewTicketModal/NewTicketModal.css"
import CommentsList from "./CommentsList"
import UserDropDownFilter from "./UserDropDownFilter";

function ViewTicketModal({ toggleViewTicketModal, selectedTicket, users }) {
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
                setComments(commentData)
            })
        })}
    },[selectedTicket])

    function handleAssignmentChange(){
        console.log("handled change")
    }

    return (
        <div className={`modal ${isClosing ? 'fade-out-modal' : ''}`}>
            <div className={`overlay ${isClosing ? 'fade-out-overlay' : ''}`}>
                <div className="modal-content">
                    {ticketDetails ? (
                        <>
                            <h1>{ticketDetails.title}</h1>
                            <p className="ticket-body">{ticketDetails.body}</p>
                            <div className="ticket-metadata">
                                <p>Assigned to: <strong>{ticketDetails.assigned_username}</strong></p>
                                <UserDropDownFilter 
                                    onUserSelection={handleAssignmentChange}
                                    users={users}
                                    selectedValue={ticketDetails.assignee_user_id.toString()}
                                    allOptionLabel={null}
                                    // className="assign-dropdown"
                                />
                                <p>Urgency: <span className={`urgency ${ticketDetails.urgency}`}>{ticketDetails.urgency}</span></p>
                            </div>
                            <CommentsList comments={comments} />
                            <textarea className="input" cols="100" placeholder="Comment area"></textarea>
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