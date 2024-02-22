import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import {useTheme} from '../../ThemeContext'

Chart.defaults.color = "#f7f1cb";

function Q4Contributions() {
    const { theme } = useTheme()
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    })

    const colors = theme === 'light' ? {
            complete: 'rgba(0, 100, 255, .85)',
            incomplete: 'rgba(224, 106, 106, .85)',
        } : {
            complete: 'rgba(0, 234, 255, 1)',
            incomplete: 'rgba(255, 83, 83, 1)',
        }

    function fetchGraphData(){
        fetch('/contributor-data')
        .then(response => response.json())
        .then(tickets => {
            filterData(tickets)
        })
    }

    useEffect(() => {
        fetchGraphData()
    },[theme])
    
    const textColor = theme === 'light' ? 'rgba(0,6,19)' : 'rgb(255, 232, 201)';

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
                    backgroundColor: colors.complete
                },
                {
                    label: 'Incomplete',
                    data: incompleteDataArray,
                    backgroundColor: colors.incomplete
                }
            ]
        })
    
    console.log("labels: ",labels)
    console.log("completedDataArray: ",completedDataArray)
    console.log("incompleteDataArray: ",incompleteDataArray)
    }


    return (
        <div>
            <h3>Contributor Story Point Breakdown</h3>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor,
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            stacked: true,
                            ticks: {
                                color: textColor,
                            }
                        },
                        y: {
                            beginAtZero: true,
                            stacked: true,
                            ticks: {
                                color: textColor,
                            }
                        }
                    }
                }}
            />
        </div>
    )
}

export default Q4Contributions