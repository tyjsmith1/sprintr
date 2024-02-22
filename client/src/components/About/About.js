import React from "react";
import './About.css'
import { ReactComponent as Sprint } from './sprint.svg'
import { ReactComponent as Sprint2 } from './sprint2.svg'
import { ReactComponent as Sprint3 } from './sprint3.svg'
import { ReactComponent as Sprint4 } from './sprint4.svg'


function About() {
    return (
        <div className="about-page">
            <h1 className="about-heading">Welcome to Sprintr - Your Next-Generation Task Management Solution</h1>
            <div className="about-p">
                <p>At Sprintr, we believe managing projects and tasks should be straightforward, intuitive, and empowering. Whether you're a solo entrepreneur, a small team, or a large enterprise, our platform is designed to streamline your workflow, enhance collaboration, and boost productivity.</p>
            </div>
            <div className="feature-section">
                <Sprint className="feature-svg"/>
                <div className="feature-text">
                    <h2 className="about-heading">Real-Time Collaboration</h2>
                    <p className="about-p">Dive into the details with pop-up modals for each ticket. Leave comments, update statuses, and collaborate in real-time. Our platform fosters communication, making teamwork seamless and efficient.</p>
                </div>
            </div>

            <div className="feature-section">
                <div className="feature-text">
                    <h2 className="about-heading">Sprint Management Insights</h2>
                    <p className="about-p">Unlock the full potential of your sprints with our advanced sprint management features. Gain macro-level views of your sprint analytics to make data-driven decisions. Monitor the current sprint pace, estimate completion timelines, and get a detailed breakdown of progress by each engineer.</p>
                </div>
                <Sprint4 className="feature-svg" />
            </div>

            <div className="feature-section">
                <Sprint2 className="feature-svg" />
                <div className="feature-text">
                    <h2 className="about-heading">Advanced Filtering and Assignment</h2>
                    <p className="about-p">Effortlessly filter tasks by assignee to focus on what's relevant. Our intuitive interface allows you to assign tickets with a few clicks, ensuring that every task is in capable hands.</p>
                </div>
            </div>

            <div className="feature-section">
                <div className="feature-text">
                    <h2 className="about-heading">Unified Task Management</h2>
                    <p className="about-p">Say goodbye to juggling multiple platforms. Our KanBan page offers a comprehensive view of all tasks, neatly categorized by status: To Do, In Progress, and Completed. Managing your projects has never been easier.</p>
                </div>
                <Sprint3 className="feature-svg" />
            </div>

            {/* <h2 className="about-heading">Why Choose Sprintr?</h2>
            <ul className="about-list">
                <li className="about-list-item"><strong>Unified Task Management</strong>: Say goodbye to juggling multiple platforms. Our KanBan page offers a comprehensive view of all tasks, neatly categorized by status: To Do, In Progress, and Completed. With drag-and-drop simplicity, managing your projects has never been easier.</li>
                <li className="about-list-item"><strong>Advanced Filtering and Assignment</strong>: Effortlessly filter tasks by assignee to focus on what's relevant. Our intuitive interface allows you to assign tickets with a few clicks, ensuring that every task is in capable hands.</li>
                <li className="about-list-item"><strong>Real-Time Collaboration</strong>: Dive into the details with pop-up modals for each ticket. Leave comments, update statuses, and collaborate in real-time. Our platform fosters communication, making teamwork seamless and efficient.</li>
                <li className="about-list-item"><strong>Sprint Management Made Simple</strong>: Our Sprint Management page is a powerhouse of productivity. Monitor your current pace, manage sprints with ease, and visualize progress with dynamic charts and graphs. From sprint planning to execution, we've got you covered.</li>
                <li className="about-list-item"><strong>Data-Driven Insights</strong>: Make informed decisions with our ChartJS integrated visuals. Analyze completed vs. open tickets, track story points, and assess team performance. Our analytics turn data into actionable insights.</li>
                <li className="about-list-item"><strong>Inclusive and Accessible</strong>: Sprintr is for everyone. Our About page is just a glimpse of what we offer. Sign up today or explore further to see how we can transform your project management experience.</li>
            </ul> */}
        </div>
    );
    }

export default About