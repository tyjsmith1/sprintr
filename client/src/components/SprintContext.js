import React, { createContext, useContext, useState, useEffect } from 'react';

const SprintContext = createContext();

export const useSprint = () => useContext(SprintContext);

export const SprintProvider = ({ children }) => {
    const [currentSprintId, setCurrentSprintId] = useState(null);

    useEffect(() => {
        const fetchCurrentSprintId = async () => {
            try {
                const response = await fetch('/sprints/current')
                const currentSprint = await response.json()
                if (currentSprint && currentSprint.id) {
                    setCurrentSprintId(currentSprint.id)
                }
            } catch (error) {
                console.error("Failed to fetch current sprint ID: ", error)
            }
        }

        fetchCurrentSprintId();
    },[])

    const value = {
        currentSprintId,
        setCurrentSprintId,
    };

    return <SprintContext.Provider value={value}>{children}</SprintContext.Provider>;
};