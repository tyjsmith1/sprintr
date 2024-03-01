import React, { useEffect, useState } from "react";
import "./NewTicketModal.css"
import UserDropDownFilter from "../UserDropDownFilter";
import { useAuth } from '../../../AuthContext'
import { useSprint } from '../../SprintContext'

function NewTicketModal({toggleNewTicketModal, users}) {
    const { currentSprintId } = useSprint()
    const { currentUser } = useAuth()
    const [isClosing, setIsClosing] = useState(false);

    const startCloseModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            toggleNewTicketModal();
        }, 500);
    };

    const [formData, setFormData] = useState({
        title: '',
        urgency: 'DEFAULT',
        category: 'DEFAULT',
        status: 'DEFAULT',
        storyPoints: 'DEFAULT',
        body: '',
        assignedTo: 'DEFAULT',
        author: currentUser ? currentUser.id : 'DEFAULT'
    })

    function handleChange(e) {
        const { name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleUserSelection(userId){
        setFormData(prevState => ({
            ...prevState,
            assignedTo: userId
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        const isEmpty = Object.entries(formData).some(([key, value]) => {
            if (typeof value === 'string' && key !== 'assignedTo' && key !== 'author' && key !== 'storyPoints') {
                return value.trim() === '' || value === 'DEFAULT'
            } else {
                return value === 'DEFAULT'
            }
        });

        if (isEmpty) {
            alert('Please fill out all fields.');
            return; 
        }
        
        let commonTicketData = {
            author_user_id: currentUser.id,
            body: formData.body,
            category: formData.category,
            sprint_id: currentSprintId,
            status: formData.status,
            story_points: parseInt(formData.storyPoints,10),
            title: formData.title,
            urgency: formData.urgency
        }

        if (formData.assignedTo === 'auto-assign') {
            console.log("Submitting for auto-assignment:", commonTicketData)
            fetch('/tickets/auto-assign', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: commonTicketData.category,
                    story_points: commonTicketData.story_points,
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Received Auto-Assign", data)
                commonTicketData.assignee_user_id = data.assignee_user_id
                submitTicket(commonTicketData)
                console.log("Successful Ticket Auto-Assign creation", commonTicketData)
            })
            .catch(error => {
                console.error("Error during auto-assignment: ", error)
            });
        } else {
            commonTicketData.assignee_user_id = formData.assignedTo
            submitTicket(commonTicketData)
        }
    
    function submitTicket(ticketData) {
        fetch('/tickets', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(ticketData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("success: ", data)
            toggleNewTicketModal()
        })
        
    }

    }

    return(
        <div className={`modal ${isClosing ? 'fade-out-modal' : ''}`}>
            <div className={`overlay ${isClosing ? 'fade-out-overlay' : ''}`}></div>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>New Ticket</h2>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                        <label>Ticket Title: </label>
                        <input 
                            className="input"
                            type="text"
                            placeholder="Ticket Title" 
                            value={formData.title}
                            name="title"
                            onChange={handleChange}
                        />
                        <label>Urgency: </label>
                        <select 
                            className="input"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled hidden>Please Choose...</option>
                            <option value="high">High</option>
                            <option value="med">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <label>Domain: </label>
                        <select 
                            className="input"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled hidden>Please Choose...</option>
                            <option value="frontend">Front End</option>
                            <option value="backend">Back End</option>
                        </select>
                        <label>Status: </label>
                        <select 
                            className="input"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled hidden>Please Choose...</option>
                            <option value="to_do">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="complete">Complete</option>
                        </select>
                        <label>Story Points: </label>
                        <select 
                            className="input"
                            name="storyPoints"
                            value={formData.storyPoints}
                            onChange={handleChange}
                        >
                            <option value="DEFAULT" disabled hidden>Please Choose...</option>
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="8">8</option>
                            <option value="13">13</option>
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="100">100</option>
                        </select>
                        <textarea
                            className="input"
                            placeholder="Add Ticket Description Here"
                            rows="4"
                            cols="100"
                            value={formData.body}
                            name="body"
                            onChange={handleChange}
                        ></textarea>
                        <label>Assigned to: </label>
                        <UserDropDownFilter 
                            users={users}
                            onUserSelection={handleUserSelection}
                            allOptionLabel="Please Choose..."
                            selectedValue={formData.assignedTo}
                            showAutoAssignOption={true}
                        />
                        <div className="modal-footer">
                            <button className="submit-button" type="submit">SUBMIT</button>
                            <button className="close-button" type="button" onClick={startCloseModal}>CLOSE</button>
                        </div>
                    </form>
            </div>
            </div>
        </div>
    )
}

export default NewTicketModal