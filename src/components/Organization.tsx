import React, { useState } from "react";
import LeftBall from "./LeftBall";

declare global {
  interface Window {
	ethereum?: any;
  }
}
import { ethers } from "ethers";
import "../styles/form.css";

const CONTRACT_ADDRESS = "0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47";
const CONTRACT_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "volunteer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "eventId",
				"type": "uint256"
			}
		],
		"name": "acceptVolunteer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "org",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "eventId",
				"type": "uint256"
			}
		],
		"name": "applyForEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "volunteer",
				"type": "address"
			},
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
		"name": "ApplicationAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "volunteer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "credits",
				"type": "uint256"
			}
		],
		"name": "CreditsUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "volunteer",
				"type": "address"
			},
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
		"name": "EventApplied",
		"type": "event"
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
		"inputs": [],
		"name": "getAllEvents",
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
				"name": "volunteer",
				"type": "address"
			}
		],
		"name": "getRemainingCredits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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

function Organization() {
  const [orgName, setOrgName] = useState("");
  const [tagline, setTagline] = useState("");
  const [orgType, setOrgType] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [logoHash, setLogoHash] = useState("");


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

	  const tx = await contract.registerOrganization(
		orgName,
		tagline,
		orgType,
		email,
		latitude,
		longitude,
		description,
		logoHash
	  );

	  await tx.wait();
	  alert("Organization registered successfully!");

      setOrgName("");
      setTagline("");
      setOrgType("");
      setEmail("");
      setLatitude("");
      setLongitude("");
      setDescription("");
      setLogoHash("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error. See console.");
    }
  };

  return (
    <div className="whole">
      <LeftBall />
      <div className="right">
        <h1>Register as Organization</h1>
        <form id="organizationForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Organization Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
            <div className="form-group">
            <select
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
              style={{ flex: 1, marginRight: "8px" }}
              required
            >
              <option value="" disabled>
              Select Organization Type
              </option>
              <option value="Non-profit Organization">Non-profit Organization</option>
              <option value="NGO (Non-Governmental Organization)">NGO (Non-Governmental Organization)</option>
              <option value="Educational Institution">Educational Institution</option>
              <option value="Religious Organization">Religious Organization</option>
              <option value="Healthcare Provider">Healthcare Provider</option>
              <option value="Community Organization">Community Organization</option>
              <option value="Disaster Relief Organization">Disaster Relief Organization</option>
            </select>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 1 }}
              required
            />
            </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Address Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              placeholder="Address Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="form-group">
            <div className="input-group">
              <label>Upload Logo</label>
              <label htmlFor="file-input" className="file-label">
                Choose Photo
              </label>
              {logoHash ? (
                <span className="file-status">Selected: {logoHash}</span>
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
                    setLogoHash(file.name);
                  }
                }}
              />
            </div>
          </div>
          <button type="submit" className="submitbutton">
            REGISTER AS ORGANIZATION
          </button>
        </form>
      </div>
    </div>
  );
}

export default Organization;
