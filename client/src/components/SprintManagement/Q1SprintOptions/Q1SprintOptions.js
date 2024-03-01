import React, { useEffect, useState } from "react";
import '../SprintManagement.css'
import Modal from './Modal'
import { useSprint } from '../../SprintContext'

function Q1SprintOptions() {
    const [currentSprint, setCurrentSprint] = useState(null)
    const {currentSprintId, setCurrentSprintId } = useSprint()
    const [qOneIsLoading, setqOneIsLoading] = useState(true)
    const [currentPace, setCurrentPace] = useState(0)
    const [estDaysRemaining, setEstDaysRemaining] = useState(0)
    const [daysOpen, setDaysOpen] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchSprintDetails()
    },[])
    
    function fetchSprintDetails() {
        setqOneIsLoading(true)
        fetch('/sprints')
        .then(response => response.json())
        .then(sprints => {
            const activeSprint = sprints.find(sprint => sprint.end_date === null)
            setCurrentSprint(activeSprint || null)
            if (activeSprint) {
                setCurrentSprintId(activeSprint.id)
                fetchAnalytics(activeSprint.id)
            }
            setqOneIsLoading(false)
        })
    }

    function fetchAnalytics(sprint_id) {
        fetch(`/sprints/${sprint_id}/analytics`)
        .then(response => response.json())
        .then(data => {
            setCurrentPace(data.current_pace)
            setEstDaysRemaining(data.expected_days_remaining)
            setDaysOpen(data.days_open)
        })
    }

    async function closeCurrentSprint() {
        if (!currentSprint) return
        const completedDate = new Date().toISOString()
        await fetch(`/sprints/${currentSprint.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({completed_date: completedDate})
        })
    }

    async function createNewSprint() {
        const response = await fetch('/sprints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ start_date: new Date().toISOString(), end_date: null })
        })
        const newSprint = await response.json()
        setCurrentSprintId(newSprint.id)
        return newSprint.id
    }

    async function migrateUnfinishedTickets(newSprintId) {
        console.log(`New Sprint ID: ${newSprintId};\nOld Sprint ID: ${currentSprint.id}`)
        await fetch(`/sprints/${currentSprint.id}/migrate-tickets/${newSprintId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
        })
    }

    async function handleSprintClosure() {
        try {
            await closeCurrentSprint()
            const newSprintId = await createNewSprint()
            await migrateUnfinishedTickets(newSprintId)
            fetchSprintDetails()
        } catch (error) {
            console.error("Error during sprint closure process: ", error)
        }
    }

    function handleSprintClosureConfirmation() {
        setShowModal(false)
        handleSprintClosure()
    }

    function popModal(e) {
        e.preventDefault()
        setShowModal(true)
    }

    if (qOneIsLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h3 className="q1-title">Sprint Managment Options</h3>
            {showModal && (
                <Modal
                    title = "Confirm Sprint Closure"
                    onCancel={() => setShowModal(false)}
                    onConfirm={handleSprintClosureConfirmation}
                >
                    Are you sure you want to close the current sprint? This will migrate all unfinished tickets to the next sprint.
                </Modal>
            )}
            {currentSprint ? (
                <div>
                    <button onClick={popModal}>Close Current Sprint</button>
                    <div className="q1-analytics">
                        <div>{daysOpen} days open</div>
                        <div>{currentPace} story points per day</div>
                        <div>{estDaysRemaining} estimated days to completion at current pace</div>
                    </div>
                </div>
            ) : (
                <button onClick={createNewSprint}>Create New Sprint</button>
            )}
        </div>
    )
}

export default Q1SprintOptions