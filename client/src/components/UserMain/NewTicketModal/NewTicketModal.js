import React, { useEffect, useState } from "react";
import "./NewTicketModal.css"
import UserDropDownFilter from "../UserDropDownFilter";
import { useAuth } from '../../../AuthContext'

function NewTicketModal({toggleNewTicketModal, users}) {

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

        const fieldExclusions = ['assignedTo', 'author', 'storyPoints', 'urgency', 'category', 'status'];
        const isEmpty = Object.entries(formData).some(([key, value]) => {
            return !fieldExclusions.includes(key) && value.trim() === ''
        });

        if (isEmpty) {
            alert('Please fill out all fields.');
            return; 
        }
        
        const ticketData = {
            assignee_user_id: formData.assignedTo,
            // author_user_id: formData.author,
            author_user_id: currentUser.id,
            body: formData.body,
            category: 'feature',
            completed_at: null,
            created_at: new Date().toISOString().split('T')[0],
            sprint_id: 1,
            status: formData.status,
            story_points: formData.storyPoints,
            title: formData.title,
            urgency: formData.urgency
        }

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
                        />
                        {/* <label>Author: </label>
                        <UserDropDownFilter 
                            users={users}
                            onUserSelection={handleUserSelection}
                            allOptionLabel="Please Choose..."
                            selectedValue={formData.author}
                        /> */}
                    <button className="submit-button" type="submit">SUBMIT</button>
                    </form>
                <div className="modal-footer">
                    <button className="close-button" type="button" onClick={startCloseModal}>CLOSE</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default NewTicketModal