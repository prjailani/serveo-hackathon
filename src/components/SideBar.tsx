import React from "react";
import "../styles/sidebar.css";

import logo from "../assets/logo.svg";
import dashboard from "../assets/dashboard.svg";
import explore_events from "../assets/explore_events.svg";
import my_events from "../assets/my_events.svg";
import books from "../assets/books.svg";
import certificate from "../assets/certificate.svg";
import chat from "../assets/chat.svg";
import handshake from "../assets/handshake.svg";
import human from "../assets/human.svg";
import logout from "../assets/logout.svg";
import scan from "../assets/scan.svg";
import settigns from "../assets/settings.svg";
import squads from "../assets/squads.svg";
import cup from "../assets/cup.svg";

const SideBar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav-links">
        <a className="nav-item">
          <img src={dashboard} alt="Dashboard Icon" />
          <span>Dashboard</span>
        </a>
        <a className="nav-item">
          <img src={explore_events} alt="Explore Icon" />
          <span>Explore Events</span>
        </a>
         <a className="nav-item">
          <img src={my_events} alt="My Events Icon" />
          <span>My Events</span>
        </a>
        <a className="nav-item">
          <img src={certificate} alt="My Certificates Icon" />
          <span>My Certificates</span>
        </a>
        <a className="nav-item">
          <img src={handshake} alt="HandShake Icon" />
          <span>Endorsements</span>
        </a>
        <a className="nav-item">
          <img src={squads} alt="My Squads Icon" />
          <span>Squads</span>
        </a>
        <a className="nav-item">
          <img src={cup} alt="Leaderboard Icon" />
          <span>Leaderboard</span>
        </a>
        <a className="nav-item">
          <img src={human} alt="Human Icon" />
          <span>My Profile</span>
        </a>
        <a className="nav-item">
          <img src={settigns} alt="Settings Icon" />
          <span>Settings</span>
        </a>
        <a className="nav-item">
          <img src={books} alt="Learning Hub Icon" />
          <span>Learning Hub</span>
        </a>
        <a className="nav-item">
          <img src={chat} alt="chat Icon" />
          <span>Messages</span>
        </a>
        <a className="nav-item">
          <img src={scan} alt="Scan Icon" />
          <span>Scan QR</span>
        </a>
        <a className="nav-item">
          <img src={logout} alt="Logout Icon" />
          <span>Logout</span>
        </a>
      </nav>
    </aside>
  );
};

export default SideBar;
