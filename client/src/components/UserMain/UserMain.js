import React, {useEffect, useState} from "react";
import { IoIosCreate } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import Tickets from '../UserMain/Tickets/Tickets'
import './UserMain.css'
import NewTicketModal from "./NewTicketModal/NewTicketModal";
import UserDropDownFilter from "./UserDropDownFilter";

function UserMain() {

    const [allTickets, setAllTickets] = useState([])
    const [todoTickets, setTodoTickets] = useState([])
    const [inProgTickets, setInProgTickets] = useState([])
    const [completeTickets, setCompleteTickets] = useState([])
    const [newTicketModal, setNewTicketModal] = useState(false)

    function toggleNewTicketModal() {
        setNewTicketModal(!newTicketModal)
        loadTickets()
    }

    function loadTickets(){

        fetch('/tickets')
        .then(response => response.json())
        .then(data => {
            setAllTickets(data)
            categorizeTickets(data)
        })
    }

    useEffect(() => {
        loadTickets()
        // categorizeTickets(allTickets)
    },[])

    function categorizeTickets(tickets) {
        let stagingToDo =[]
        let stagingInProg =[]
        let stagingComplete = []

        stagingToDo = tickets.filter(ticket => ticket.status == 'to_do')
        stagingInProg = tickets.filter(ticket => ticket.status == 'in_progress')
        stagingComplete = tickets.filter(ticket => ticket.status == 'complete')

        setTodoTickets(stagingToDo)
        setInProgTickets(stagingInProg)
        setCompleteTickets(stagingComplete)
    }

    function handleUserSelection(userId) {
        console.log('Selected user ID: ', userId)
        // Filter tickets here
        const filteredByUser = userId ==='all'
            ? allTickets
            : allTickets.filter(ticket => ticket.assignee_user_id.toString() === userId)
        categorizeTickets(filteredByUser)
    }

    // Ticket Counters
    const toDoTicketCount = todoTickets.length
    const inProgTicketCount = inProgTickets.length
    const completedTicketCount = completeTickets.length

    return(
        <div>
            <button
                className="new-ticket-button"
                onClick={toggleNewTicketModal}>
                    <p className="p-add-icon"> <MdPlaylistAdd className="add-icon"/> Create New Ticket</p>
            </button>
            < UserDropDownFilter className="user-drop-down" onUserSelection={handleUserSelection}/>
            <div className="ticket-category-container">
                <div className="ticket-category">
                    <h2>To Do</h2>
                    <p className="ticket-category-status">{toDoTicketCount} tickets remaining</p>
                    <Tickets allTickets={todoTickets}/>
                </div>
                <div className="ticket-category">
                    <h2>In Progress</h2>
                    <p className="ticket-category-status">{inProgTicketCount} tickets in progress</p>
                    <Tickets allTickets={inProgTickets}/>
                </div>
                <div className="ticket-category">
                    <h2>Complete</h2>
                    <p className="ticket-category-status">{completedTicketCount} tickets completed</p>
                    <Tickets  allTickets={completeTickets}/>
                </div>
            </div>
            {newTicketModal && (
                <NewTicketModal toggleNewTicketModal={toggleNewTicketModal}/>
            )}
        </div>
    )
}

export default UserMain