import React, {useState, useEffect} from "react";
import "./NewTicketModal/NewTicketModal.css"
import CommentsList from "./CommentsList"
import UserDropDownFilter from "./UserDropDownFilter";
import { MdOutlineContactless } from "react-icons/md";

function ViewTicketModal({ toggleViewTicketModal, selectedTicket, users }) {
    const [ticketDetails, setTicketDetails] = useState(null)
    const [comments, setComments] = useState([])
    const [isClosing, setIsClosing] = useState(false);
    const [commentForm, setCommentForm] = useState('')

    const id = selectedTicket.id

    const startCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            toggleViewTicketModal();
        },500);
    };

    function fetchComments(){
        fetch(`/ticket-logs/${selectedTicket.id}`)
        .then(response => response.json())
        .then(commentData => {
            setComments(commentData)
        })
    }

    useEffect(()=>{
        if (selectedTicket && selectedTicket.id) {
            fetch(`/tickets/${selectedTicket.id}`)
            .then(response => response.json())
            .then(ticketData => {
                setTicketDetails(ticketData)
            
            fetchComments()
        })}
    },[selectedTicket])

    function handleAssignmentChange(userId){

        const updatedTicketDetails = {
            ...ticketDetails,
            assignee_user_id: userId
        }

        fetch(`/tickets/${ticketDetails.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({assignee_user_id: userId})
        })
        .then(response => response.json())
        .then(data => {
            console.log("Ticket updated successfully: ", data)
            setTicketDetails(updatedTicketDetails)
        })
    }

    function handleChange(e){
        setCommentForm(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        const newComment = {
            ticket_id: id,
            comment_text: commentForm,
            author_user_id: 1,
            status: 'going to get rid of this column'
        }

        fetch('/ticket-logs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment),
        })
        .then(response => response.json())
        .then(data => {
            setCommentForm('')
            fetchComments()
        })
    }

    return (
        <div className={`modal ${isClosing ? 'fade-out-modal' : ''}`}>
            <div className={`overlay ${isClosing ? 'fade-out-overlay' : ''}`}>
                <div className="modal-content">
                    {ticketDetails ? (
                        <>
                            <div className="modal-header">
                                <h1>{ticketDetails.title}</h1>
                            </div>
                            <div className="modal-body">
                                <p className="ticket-body">{ticketDetails.body}</p>
                                <div className="ticket-metadata">
                                    <p>Assigned to: <strong>{ticketDetails.assigned_username}</strong></p>
                                    <UserDropDownFilter 
                                        onUserSelection={handleAssignmentChange}
                                        users={users}
                                        selectedValue={ticketDetails.assignee_user_id.toString()}
                                        allOptionLabel="Select User"
                                    />
                                    <p>Urgency: <span className={`urgency ${ticketDetails.urgency}`}>{ticketDetails.urgency}</span></p>
                                </div>
                                <CommentsList comments={comments} />
                                <form onSubmit={handleSubmit}>
                                    <textarea
                                        // className="comment-input"
                                        className="input"
                                        cols="100"
                                        placeholder="Comment area"
                                        value={commentForm}
                                        name="body"
                                        onChange={handleChange}
                                    ></textarea>
                                    <div className="modal-footer">
                                        <button type="submit" className="submit-button">Submit Comment</button>
                                        <button type="button" className="close-button" onClick={startCloseModal}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <p>Loading ticket details...</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ViewTicketModal