import React, { useEffect, useState } from "react";
import "./NewTicketModal.css"

function NewTicketModal({toggleNewTicketModal}) {

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
        author: 'DEFAULT'
    })

    function handleChange(e) {
        const { name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()

        const isEmpty = Object.values(formData).some(value => value.trim() === '');

        if (isEmpty) {
        alert('Please fill out all fields.');
        return; 
        }
        
        const ticketData = {
            assignee_user_id: formData.assignedTo,
            author_user_id: formData.author,
            body: formData.body,
            category: formData.category,
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
                <h2>New Ticket</h2>
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
                    <br></br>
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
                    <br></br>
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
                    <br></br>
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
                    <br></br>
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
                    {/* Below this comment will be automated at some point */}
                    <label>Assigned to: </label>
                    <select 
                        className="input"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                    >
                        <option value="DEFAULT" disabled hidden>Please Choose...</option>
                        <option value="1">Tyler</option>
                        <option value="2">Roberto</option>
                        <option value="3">Justin</option>
                        <option value="4">Jenny</option>
                        <option value="5">Tim</option>
                        <option value="6">Lisa</option>
                        <option value="7">Amir</option>
                        <option value="8">Corey</option>
                        <option value="9">Art</option>
                        <option value="10">Flynn</option>
                    </select>
                    <label>Author: </label>
                    <select 
                        className="input"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                    >
                        <option value="DEFAULT" disabled hidden >Please Choose...</option>
                        <option value="1">Tyler</option>
                        <option value="2">Roberto</option>
                        <option value="3">Justin</option>
                        <option value="4">Jenny</option>
                        <option value="5">Tim</option>
                        <option value="6">Lisa</option>
                        <option value="7">Amir</option>
                        <option value="8">Corey</option>
                        <option value="9">Art</option>
                        <option value="10">Flynn</option>
                    </select>
                    <br></br>
                    <button className="close-modal" type="button" onClick={startCloseModal}>CLOSE</button>
                    <button className="close-modal" type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default NewTicketModal