import React, { useState } from 'react';
import '../styles/createevent.css';
import { ethers } from 'ethers';
import VolunteerContractABI from '../abis/VolunteerContract.json'; // Adjust the path

const contractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'; // Replace with your deployed contract address

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    skillsRequired: '',
    coverPictureHash: '',
    description: '',
    category: 'Education',
    volunteeringType: 'On-Site',
    locationLongitude: '',
    locationLatitude: '',
    startDateTime: '',
    endDateTime: '',
    timezone: 'GMT +5:30',
    ageRequirement: '',
    numberOfVolunteersNeeded: '',
    reputationPoints: '',
    certificateAvailable: false,
    preLearningModule: false,
    allowSquadParticipation: false,
    preLearningVideosHash: '',
    preLearningMaterialsHash: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      // You would upload this file to IPFS or your backend here
      const fakeHash = 'ipfsHashHere'; // simulate hash for now
      setFormData((prevData) => ({
        ...prevData,
        [field]: fakeHash,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, VolunteerContractABI, signer);

      const eventObject = {
        title: formData.title,
        skillsRequired: formData.skillsRequired,
        coverPictureHash: formData.coverPictureHash,
        description: formData.description,
        category: formData.category,
        volunteeringType: formData.volunteeringType,
        locationLongitude: parseInt(formData.locationLongitude),
        locationLatitude: parseInt(formData.locationLatitude),
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime,
        timezone: formData.timezone,
        ageRequirement: parseInt(formData.ageRequirement),
        numberOfVolunteersNeeded: parseInt(formData.numberOfVolunteersNeeded),
        reputationPoints: parseInt(formData.reputationPoints),
        certificateAvailable: formData.certificateAvailable,
        preLearningModule: formData.preLearningModule,
        allowSquadParticipation: formData.allowSquadParticipation,
        preLearningVideosHash: formData.preLearningVideosHash,
        preLearningMaterialsHash: formData.preLearningMaterialsHash,
      };

      const tx = await contract.createEvent(eventObject);
      await tx.wait();

      alert('Event created successfully!');
      setFormData({
        title: '',
        skillsRequired: '',
        coverPictureHash: '',
        description: '',
        category: 'Education',
        volunteeringType: 'On-Site',
        locationLongitude: '',
        locationLatitude: '',
        startDateTime: '',
        endDateTime: '',
        timezone: 'GMT +5:30',
        ageRequirement: '',
        numberOfVolunteersNeeded: '',
        reputationPoints: '',
        certificateAvailable: false,
        preLearningModule: false,
        allowSquadParticipation: false,
        preLearningVideosHash: '',
        preLearningMaterialsHash: ''
      });
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
  };

  return (
    <div>
      <aside className="sidebar">
        <div className="logo">
          <img src="./serveologo.svg" alt="Logo" />
        </div>
        <nav className="nav-links">
          {[
            { icon: "home", label: "Home" },
            { icon: "dashboard", label: "Dashboard" },
            { icon: "profile", label: "Profile" },
            { icon: "messages", label: "Messages" },
            { icon: "tasks", label: "Tasks" },
            { icon: "settings", label: "Settings" },
            { icon: "notifications", label: "Notifications" },
            { icon: "calendar", label: "Calendar" },
            { icon: "reports", label: "Reports" },
            { icon: "files", label: "Files" },
            { icon: "help", label: "Help" },
            { icon: "team", label: "Team" },
            { icon: "analytics", label: "Analytics" },
            { icon: "logout", label: "Logout" }
          ].map((item, index) => (
            <a key={index} href="#" className={`nav-item ${item.label === "Home" ? 'active' : ''}`}>
              <img src={`icons/${item.icon}.svg`} alt={item.label} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="topbar">
        <h2>Howdy Orion's Reach</h2>
      </div>

      <div className="eventform">
        <h3>Create an Event/ Opening for Volunteer</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
            />
            <input
              type="text"
              name="skillsRequired"
              placeholder="Skills Required (Separate with comma)"
              value={formData.skillsRequired}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <div>
              <label>
                Upload Cover Picture
                <input type="file" onChange={(e) => handleFileUpload(e, 'coverPictureHash')} />
              </label>
            </div>
            <div>
              <input
                type="text"
                name="description"
                placeholder="Event Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <select name="category" value={formData.category} onChange={handleChange}>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Environmental Sustainability</option>
              <option>Disaster Relief</option>
            </select>
            <select name="volunteeringType" value={formData.volunteeringType} onChange={handleChange}>
              <option>On-Site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
            <input
              type="number"
              name="locationLongitude"
              placeholder="Location Longitude"
              value={formData.locationLongitude}
              onChange={handleChange}
            />
            <input
              type="number"
              name="locationLatitude"
              placeholder="Location Latitude"
              value={formData.locationLatitude}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
            />
            <input
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
            />
            <select name="timezone" value={formData.timezone} onChange={handleChange}>
              <option>GMT +5:30</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="number"
              name="ageRequirement"
              placeholder="Age Requirement"
              value={formData.ageRequirement}
              onChange={handleChange}
            />
            <input
              type="number"
              name="numberOfVolunteersNeeded"
              placeholder="No. of Volunteers Needed"
              value={formData.numberOfVolunteersNeeded}
              onChange={handleChange}
            />
            <input
              type="number"
              name="reputationPoints"
              placeholder="Reputation Points"
              value={formData.reputationPoints}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            {[{ label: 'Certificate Available', name: 'certificateAvailable' }, { label: 'Pre Learning Module', name: 'preLearningModule' }, { label: 'Allow Squad Participation', name: 'allowSquadParticipation' }].map((item, index) => (
              <div key={index}>
                <p>{item.label}</p>
                <label className="switch">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={formData[item.name as keyof typeof formData] as boolean}
                    onChange={handleChange}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>
              Pre-learning Videos
              <input type="file" onChange={(e) => handleFileUpload(e, 'preLearningVideosHash')} />
            </label>
            <label>
              Pre-learning Materials
              <input type="file" onChange={(e) => handleFileUpload(e, 'preLearningMaterialsHash')} />
            </label>
          </div>

          <div className="form-group">
            <button type="button">Save as Draft</button>
            <button type="button">Preview Event Page</button>
            <button type="submit" className="submitbutton">PUBLISH NOW</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
