import React, {useEffect, useState} from "react";
import { MdPlaylistAdd } from "react-icons/md";
import Tickets from '../UserMain/Tickets/Tickets'
import './UserMain.css'
import NewTicketModal from "./NewTicketModal/NewTicketModal";
import UserDropDownFilter from "./UserDropDownFilter";
import ViewTicketModal from "./ViewTicketModal";


function UserMain() {
    // fetch state
    const [allTickets, setAllTickets] = useState([])

    // separate tickets into states by category
    const [todoTickets, setTodoTickets] = useState([])
    const [inProgTickets, setInProgTickets] = useState([])
    const [completeTickets, setCompleteTickets] = useState([])

    // New Ticket Modal toggle
    const [newTicketModal, setNewTicketModal] = useState(false)

    // View/edit/update Ticket Modal Toggle
    const [viewTicketModal, setViewTicketModal] = useState(false)
    const [selectedTicket, setSelectedTicket] = useState(null)

    // Lifted state For User drop down Filter
    const [users, setUsers] = useState([])
    const [selectedUserFilter, setSelectedUserFilter] = useState('all');

    useEffect(() => {
        fetch('/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data)
        })
    },[])

    function toggleNewTicketModal() {
        setNewTicketModal(!newTicketModal)
        loadTickets()
    }

    function handleTicketSelect(ticket) {
        setSelectedTicket(ticket)
        setViewTicketModal(!viewTicketModal)
    }

    function toggleViewTicketModal() {
        setViewTicketModal(!viewTicketModal)
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

        stagingToDo = tickets.filter(ticket => ticket.status === 'to_do')
        stagingInProg = tickets.filter(ticket => ticket.status === 'in_progress')
        stagingComplete = tickets.filter(ticket => ticket.status === 'complete')

        setTodoTickets(stagingToDo)
        setInProgTickets(stagingInProg)
        setCompleteTickets(stagingComplete)
    }
//this is for filtered tickets in main
    function handleUserSelection(userId) {
        // Filter tickets here
        setSelectedUserFilter(userId)
        const filteredByUser = userId ==='all'
            ? allTickets
            : allTickets.filter(ticket => ticket.assignee_user_id.toString() === userId)
        categorizeTickets(filteredByUser)
    }

    // Ticket Counters
    const toDoTicketCount = todoTickets.length
    const inProgTicketCount = inProgTickets.length
    const completedTicketCount = completeTickets.length

    function handleTicketDelete(ticketId) {
        fetch(`/tickets/${ticketId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                loadTickets()
            } else {
                console.error("delete failed")
            }
        }
        )
    }

    return(
        <div>
            <div className="user-drop-down-container">
                <button
                    className="new-ticket-button"
                    onClick={toggleNewTicketModal}>
                        <p className="p-add-icon"> <MdPlaylistAdd className="add-icon"/> Create New Ticket</p>
                </button>
                < UserDropDownFilter
                    className="user-drop-down"
                    onUserSelection={handleUserSelection} 
                    users={users}
                    allOptionLabel="All User Tickets"
                    selectedValue={selectedUserFilter}
                />
            </div>
            <div className="ticket-category-container">
                <div className="ticket-category">
                    <h2>To Do</h2>
                    <p className="ticket-category-status">{toDoTicketCount} tickets remaining</p>
                    <Tickets
                        allTickets={todoTickets}
                        handleTicketSelect={handleTicketSelect}
                        handleTicketDelete={handleTicketDelete}
                    />
                </div>
                <div className="ticket-category">
                    <h2>In Progress</h2>
                    <p className="ticket-category-status">{inProgTicketCount} tickets in progress</p>
                    <Tickets
                        allTickets={inProgTickets}
                        handleTicketSelect={handleTicketSelect}
                        handleTicketDelete={handleTicketDelete}
                    />
                </div>
                <div className="ticket-category">
                    <h2>Complete</h2>
                    <p className="ticket-category-status">{completedTicketCount} tickets completed</p>
                    <Tickets 
                        allTickets={completeTickets}
                        handleTicketSelect={handleTicketSelect}
                        handleTicketDelete={handleTicketDelete}
                    />
                </div>
            </div>
            <div>
                {newTicketModal && (
                    <NewTicketModal
                        toggleNewTicketModal={toggleNewTicketModal}
                        newTicketModal={newTicketModal}
                        users={users}
                    />
                )}
            </div>
            <div>
                {viewTicketModal && (
                    <ViewTicketModal 
                        toggleViewTicketModal={toggleViewTicketModal}
                        selectedTicket={selectedTicket}
                        viewTicketModal={viewTicketModal}
                        users={users}
                    />
                )}
            </div>
        </div>
    )
}

export default UserMain