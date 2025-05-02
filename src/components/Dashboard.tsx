import React from "react";
import "../styles/Dashboard.css";
import usp1 from "../assets/usp1.svg";
import user from "../assets/user.svg";




const Dashboard: React.FC = () => {
  return (
    <div className="body">
      <div className="sidebar"></div>
      <div className="main-content">
        <div className="header">
          <h2>Hey Mohamed Mafaz P R!</h2>
        </div>
        <h4 className="creditlimit">Volunteer Credits Remaining: 64 Credits</h4>
        <div className="usp">
          <div className="usp-item">
            <img src={usp1} alt="USP 1" />
            <div className="usp-text">
              <h6>2323</h6>
              <p>Hours Volunteered</p>
            </div>
          </div>
          <div className="usp-item">
            <img src={usp1} alt="USP 1" />
            <div className="usp-text">
              <h6>2323</h6>
              <p>Hours Volunteered</p>
            </div>
          </div>
          <div className="usp-item">
            <img src={usp1} alt="USP 1" />
            <div className="usp-text">
              <h6>2323</h6>
              <p>Hours Volunteered</p>
            </div>
          </div>
          <div className="usp-item">
            <img src={usp1} alt="USP 1" />
            <div className="usp-text">
              <h6>2323</h6>
              <p>Hours Volunteered</p>
            </div>
          </div>
        </div>
        <div className="volu-and-leader">
          <div className="voluactivity">
            <div className="voluactivity-header">
              <h4>Volunteer Activity</h4>
              <select>
                <option>This Year</option>
                <option>This Month</option>
                <option>This Week</option>
              </select>
            </div>
            <div className="chart-container"></div>
          </div>
          <div className="leaderboard">
            <div className="voluactivity-header">
              <h4>Volunteer Activity</h4>
              <a href="#">See All</a>
            </div>
            <div className="leaderboard-container">
              <div className="leaderboard-list">
                <div className="leaderboard-item">
                  <h6>1</h6>
                  <img src={user} alt="USP 1" />
                  <p>Mohamed Mafaz P R</p>
                  <p>2323</p>
                </div>
                <div className="leaderboard-item">
                  <h6>2</h6>
                  <img src={user} alt="USP 1" />
                  <p>Mohamed Mafaz P R</p>
                  <p>2323</p>
                </div>
                <div className="leaderboard-item">
                  <h6>3</h6>
                  <img src={user} alt="USP 1" />
                  <p>Mohamed Mafaz P R</p>
                  <p>2323</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="upcoming-events">
          <div className="voluactivity-header">
            <h4>Upcoming Events</h4>
            <a href="#">See All</a>
          </div>
            <div className="upcoming-events-container">
                <div className="upcoming-events-item">
                <p>Event Name</p>
                <p>Event Date</p>
                <p>Event Location</p>
                <p>Graphic Design Volunteership</p>
                </div>
                <div className="upcoming-events-item">
                <p>Event Name</p>
                <p>Event Date</p>
                <p>Event Location</p>
                <p>Graphic Design Volunteership</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
