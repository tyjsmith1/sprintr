import React, {useEffect, useState} from "react";
import { IoIosCreate } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import Tickets from '../UserMain/Tickets/Tickets'
import './UserMain.css'
import NewTicketModal from "./NewTicketModal/NewTicketModal";

function UserMain() {

    const [tickets, setTickets] = useState([])
    const [todoTickets, setTodoTickets] = useState([])
    const [inProgTickets, setInProgTickets] = useState([])
    const [completeTickets, setCompleteTickets] = useState([])
    const [modal, setModal] = useState(false)

    function toggleTicketModal() {
        setModal(!modal)
        loadTickets()
    }

    function loadTickets(){
        let stagingToDo =[]
        let stagingInProg =[]
        let stagingComplete = []

        fetch('/tickets')
        .then(response => response.json())
        .then(data => {
            data.forEach(ticket => {
                switch (ticket.status) {
                    case 'to_do':
                        stagingToDo.push(ticket)
                        break
                    case 'in_progress':
                        stagingInProg.push(ticket)
                        break
                    case 'complete':
                        stagingComplete.push(ticket)
                        break
                    default:
                        break
                }
            })
            setTodoTickets(stagingToDo)
            setInProgTickets(stagingInProg)
            setCompleteTickets(stagingComplete)
            setTickets(data)
        })
    }

    useEffect(() => {
        loadTickets()
    },[])

    return(
        <div>
            <button className="new-ticket-button" onClick={toggleTicketModal}><p className="p-add-icon"> <MdPlaylistAdd className="add-icon"/> Create New Ticket</p></button>
            <div className="ticket-category-container">
                <div className="ticket-category">
                    <h2>To Do</h2>
                    <Tickets tickets={todoTickets}/>
                </div>
                <div className="ticket-category">
                    <h2>In Progress</h2>
                    <Tickets tickets={inProgTickets}/>
                </div>
                <div className="ticket-category">
                    <h2>Complete</h2>
                    <Tickets  tickets={completeTickets}/>
                </div>
            </div>
            {modal && (
                <NewTicketModal toggleTicketModal={toggleTicketModal}/>
            )}
        </div>
    )
}

export default UserMain