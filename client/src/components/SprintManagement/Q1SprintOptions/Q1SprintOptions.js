import React, { useEffect, useState } from "react";
import '../SprintManagement.css'

function Q1SprintOptions() {
    const [currentSprint, setCurrentSprint] = useState(null)
    const [qOneIsLoading, setqOneIsLoading] = useState(true)
    const [currentPace, setCurrentPace] = useState(0)
    const [estDaysRemaining, setEstDaysRemaining] = useState(0)
    const [daysOpen, setDaysOpen] = useState(0)

    function fetchSprintDetails() {
        setqOneIsLoading(true)
        fetch('/sprints')
        .then(response => response.json())
        .then(sprints => {
            const activeSprint = sprints.find(sprint => sprint.end_date === null)
            setCurrentSprint(activeSprint || null)
            setqOneIsLoading(false)
            fetchAnalytics(activeSprint.id)
        })
    }

    useEffect(() => {
        fetchSprintDetails()
    },[])

    function fetchAnalytics(sprint_id){
        fetch(`/sprints/${sprint_id}/analytics`)
        .then(response => response.json())
        .then(data => {
            setCurrentPace(data.current_pace)
            setEstDaysRemaining(data.expected_days_remaining)
            setDaysOpen(data.days_open)
        })
    }

    function createSprint() {
        fetch('/sprints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify()
        })
        .then(() => fetchSprintDetails())
    }

    function closeSprint() {
        if (!currentSprint) return

        fetch(`/sprints/${currentSprint.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed_date: new Date().toISOString()})
        })
        .then(() => {
            fetchSprintDetails()
        }
        )
    }

    if (qOneIsLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h3 className="q1-title">Sprint Managment Options</h3>
            {currentSprint ? (
                <div>
                    <button onClick={closeSprint}>Close Current Sprint</button>
                    <div className="q1-analytics">
                        <div>{daysOpen} days open</div>
                        <div>{currentPace} story points per day</div>
                        <div>{estDaysRemaining} estimated days to completion at current pace</div>
                    </div>
                </div>
            ) : (
                <button onClick={createSprint}>Create New Sprint</button>
            )}
        </div>
    )
}

export default Q1SprintOptions