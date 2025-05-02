import React, { useState } from "react";
import LeftBall from "./LeftBall";

declare global {
  interface Window {
    ethereum?: any;
  }
}
import { ethers } from "ethers";
import "../styles/form.css";

const CONTRACT_ADDRESS = "0x9D7f74d0C41E726EC95884E0e97Fa6129e3b5E99";
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "skillsRequired",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "coverPictureHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "volunteeringType",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "locationLongitude",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "locationLatitude",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "startDateTime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "endDateTime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timezone",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "ageRequirement",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfVolunteersNeeded",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reputationPoints",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "certificateAvailable",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "preLearningModule",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "allowSquadParticipation",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "preLearningVideosHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "preLearningMaterialsHash",
						"type": "string"
					}
				],
				"internalType": "struct VolunteerRegistration.Event",
				"name": "_eventData",
				"type": "tuple"
			}
		],
		"name": "createEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "organization",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "eventId",
				"type": "uint256"
			}
		],
		"name": "EventCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_displayName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_skills",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_profileBio",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_profilePictureHash",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "_dates",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "_times",
				"type": "string[]"
			}
		],
		"name": "registerVolunteer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "volunteer",
				"type": "address"
			}
		],
		"name": "VolunteerRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_organization",
				"type": "address"
			}
		],
		"name": "getOrganizationEvents",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "skillsRequired",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "coverPictureHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "category",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "volunteeringType",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "locationLongitude",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "locationLatitude",
						"type": "int256"
					},
					{
						"internalType": "string",
						"name": "startDateTime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "endDateTime",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "timezone",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "ageRequirement",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "numberOfVolunteersNeeded",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "reputationPoints",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "certificateAvailable",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "preLearningModule",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "allowSquadParticipation",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "preLearningVideosHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "preLearningMaterialsHash",
						"type": "string"
					}
				],
				"internalType": "struct VolunteerRegistration.Event[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_volunteer",
				"type": "address"
			}
		],
		"name": "getVolunteer",
		"outputs": [
			{
				"internalType": "string",
				"name": "displayName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "skills",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "profileBio",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "profilePictureHash",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "dates",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "times",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "isRegistered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; 

function Volunteer() {
  const [dateTimes, setDateTimes] = useState([{ date: "", time: "" }]);
  const [displayName, setDisplayName] = useState("");
  const [skills, setSkills] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profilePictureHash, setProfilePictureHash] = useState(""); // optional

  const [volunteerDetails, setVolunteerDetails] = useState<
    [string, string, string, string, string[], string[]] | null
  >(null);

  const addDateTime = () => {
    setDateTimes([...dateTimes, { date: "", time: "" }]);
  };

  const handleDateChange = (index: number, value: string) => {
    const newDateTimes = [...dateTimes];
    newDateTimes[index].date = value;
    setDateTimes(newDateTimes);
  };

  const handleTimeChange = (index: number, value: string) => {
    const newDateTimes = [...dateTimes];
    newDateTimes[index].time = value;
    setDateTimes(newDateTimes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert("Please install MetaMask to connect");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const dates = dateTimes.map((dt) => dt.date);
      const times = dateTimes.map((dt) => dt.time);

      const tx = await contract.registerVolunteer(
        displayName,
        skills,
        profileBio,
        profilePictureHash,
        dates,
        times
      );

      console.log("Transaction sent...", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed!", tx.hash);
      alert("Volunteer registered successfully!");

      setDisplayName("");
      setSkills("");
      setProfileBio("");
      setProfilePictureHash("");
      setDateTimes([{ date: "", time: "" }]);

      fetchVolunteerDetails(signer.address);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error. See console.");
    }
  };

  const fetchVolunteerDetails = async (volunteerAddress: string) => {
    if (!window.ethereum) {
      alert("Please install MetaMask to connect");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const details = await contract.getVolunteer(volunteerAddress);
      setVolunteerDetails(details);
      console.log("Volunteer Details:", details);
    } catch (error) {
      console.error("Error fetching volunteer details:", error);
    }
  };

  return (
    <div className="whole">
      <LeftBall></LeftBall>
      <div className="right">
        <h1>Register as a Volunteer</h1>
        <form id="volunteerForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Skills/Interests (Separate with comma)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

            <div id="datetime-section">
            {dateTimes.map((dt, index) => (
              <div className="form-group" key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="date"
                name="dates[]"
                value={dt.date}
                onChange={(e) => handleDateChange(index, e.target.value)}
              />
              <input
                type="time"
                name="times[]"
                value={dt.time}
                onChange={(e) => handleTimeChange(index, e.target.value)}
              />
              {dateTimes.length > 1 && (
                <button
                type="button"
                className="remove-datetime"
                onClick={() => {
                  setDateTimes(dateTimes.filter((_, i) => i !== index));
                }}
                aria-label="Remove date and time"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#d00",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "1.2em"
                }}
                >
                ×
                </button>
              )}
              </div>
            ))}
            </div>

          <button className="datebutton" type="button" onClick={addDateTime}>
            Add More Date & Time
          </button>

            <textarea
            placeholder="Profile Bio (Optional)"
            value={profileBio}
            onChange={(e) => setProfileBio(e.target.value)}
            ></textarea>

            <div className="form-group">
            <div className="input-group">
              <label>Upload Profile Picture</label>
              <label htmlFor="file-input" className="file-label">
              Choose Photo
              </label>
              {profilePictureHash ? (
              <span className="file-status">Selected: {profilePictureHash}</span>
              ) : (
              <span className="file-status">No file chosen</span>
              )}
              <input
                type="file"
                className="file-input"
                id="file-input"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setProfilePictureHash(file.name);
                  }
                }}
              />
            </div>
          </div>

          <button type="submit" className="submitbutton">
            REGISTER AS VOLUNTEER
          </button>
        </form>

        {volunteerDetails && (
          <div className="volunteer-details">
            <h2>Your Registered Details:</h2>
            <p>
              <strong>Name:</strong> {volunteerDetails[0]}
            </p>
            <p>
              <strong>Skills:</strong> {volunteerDetails[1]}
            </p>
            <p>
              <strong>Bio:</strong> {volunteerDetails[2]}
            </p>
            <p>
              <strong>Profile Picture Hash:</strong> {volunteerDetails[3]}
            </p>
            <p>
              <strong>Dates:</strong> {volunteerDetails[4].join(", ")}
            </p>
            <p>
              <strong>Times:</strong> {volunteerDetails[5].join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Volunteer;
