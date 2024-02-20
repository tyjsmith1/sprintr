import React, { useEffect, useState } from "react"
import { Pie } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

Chart.defaults.color = "#f7f1cb";

function Q2Analytics({incompleteTickets, completeTickets}) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
        }],
    })
    const [chartOption, setChartOption] = useState('count')

    const options = {
        aspectRatio: 1.5,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    padding: 5,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Ticket Completion Status',
                padding: {
                    top: 10,
                    bottom: 0
                },
                font: {
                    size: 16

                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.label || ''
                        if (label) {
                            label += ': '
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed
                            label += chartOption === 'count' ? ' tickets' : ' story points'
                        }
                        return label
                    }
                }
            }
        }
    }

    useEffect(()=> {
        const data = {
            labels: ['Completed', 'Incomplete'],
            datasets: [{
                label: 'Tickets',
                data: chartOption === 'count' ? [completeTickets.length, incompleteTickets.length] :
                    [
                        completeTickets.reduce((acc,ticket) => acc + ticket.story_points, 0),
                        incompleteTickets.reduce((acc,ticket) => acc + ticket.story_points, 0)
                    ],
                backgroundColor: [
                    'rgba(7, 155, 190, 0.75)',
                    'rgba(255, 57, 42, 0.75)'
                ],
                borderColor: [
                    'rgba(7, 155, 190, 1)',
                    'rgba(255, 57, 42, 1)'
                ],
                borderWidth: 1,
                hoverOffset: 10,
                color: 'rbga(255,255,255,0)'
            }],
        }

        setChartData(data)
    },[incompleteTickets, completeTickets, chartOption])

    return (
        <div>
            <h3>Analytics & Metrics</h3>
            <div>
                <button onClick={() => setChartOption('count')}>Ticket Count</button>
                <button onClick={() => setChartOption('storyPoints')}>Story Points</button>
            </div>
            <Pie data={chartData} options={options}/>
        </div>
    )
}

export default Q2Analytics