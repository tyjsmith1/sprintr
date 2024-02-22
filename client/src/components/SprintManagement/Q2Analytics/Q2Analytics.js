import React, { useEffect, useState } from "react"
import { Pie } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { useTheme } from '../../ThemeContext'

Chart.defaults.color = "#f7f1cb";

function Q2Analytics({incompleteTickets, completeTickets}) {
    const { theme } = useTheme()
    const textColor = theme === 'light' ? 'rgba(0,6,19)' : 'rgb(255, 232, 201)';

    const colors = theme === 'light' ? {
        complete: 'rgba(0, 100, 255, .85)',
        incomplete: 'rgba(224, 106, 106, .85)',
    } : {
        complete: 'rgba(0, 234, 255, 1)',
        incomplete: 'rgba(255, 83, 83, 1)',
    }

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
                    color: textColor,
                    padding: 5,
                    font: {
                        size: 14
                    }
                }
            },
            title: {
                display: true,
                text: 'Ticket Completion Status',
                color: textColor,
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
                    colors.complete,
                    colors.incomplete
                ],
                borderColor: [
                    colors.complete,
                    colors.incomplete
                ],
                borderWidth: 1,
                hoverOffset: 10,
                color: 'rbga(255,255,255,0)'
            }],
        }

        setChartData(data)
    },[incompleteTickets, completeTickets, chartOption, theme])

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