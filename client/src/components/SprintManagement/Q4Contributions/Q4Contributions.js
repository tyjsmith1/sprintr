import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

function Q4Contributions() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Complete',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Incomplete',
                data: [],
                backgroundColor: 'rgba(255, 99, 132, 1)',
            }
        ]
    })

    function fetchGraphData(){
        fetch('/contributor-data')
        .then(response => response.json())
        .then(tickets => {
            filterData(tickets)
        })
    }

    useEffect(() => {
        fetchGraphData()
    },[])

    function filterData(data){       

        let aggregatedData = data.reduce((acc, ticket) => {
            if(!acc[ticket.username]) {
                acc[ticket.username] = { complete: 0, incomplete: 0}
            }
            if (ticket.ticket_status === 'complete') {
                acc[ticket.username].complete += ticket.storypoints
            } else {
                acc[ticket.username].incomplete += ticket.storypoints
            }
            return acc
        }, {})

        let labels = Object.keys(aggregatedData)
        let completedDataArray = labels.map(label => aggregatedData[label].complete)
        let incompleteDataArray = labels.map(label => aggregatedData[label].incomplete)
    
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Complete',
                    data: completedDataArray,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)'
                },
                {
                    label: 'Incomplete',
                    data: incompleteDataArray,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                }
            ]
        })
    
    console.log("labels: ",labels)
    console.log("completedDataArray: ",completedDataArray)
    console.log("incompleteDataArray: ",incompleteDataArray)
    }


    return (
        <div>
            <h3>Contributor Details</h3>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true
                        }
                    }
                }}
            />
        </div>
    )
}

export default Q4Contributions