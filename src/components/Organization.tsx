import React, { useState } from "react";
import LeftBall from "./LeftBall";

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
	ethereum?: any;
  }
}
import { ethers } from "ethers";
import "../styles/form.css";

// 👉 Paste your Contract Address and ABI here
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "organization",
				"type": "address"
			}
		],
		"name": "OrganizationRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_orgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tagline",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_orgType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_latitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_longitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_logoHash",
				"type": "string"
			}
		],
		"name": "registerOrganization",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
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
		"name": "getOrganization",
		"outputs": [
			{
				"internalType": "string",
				"name": "orgName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tagline",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "orgType",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "latitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "longitude",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "logoHash",
				"type": "string"
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
		"name": "isOrganizationRegistered",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
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
  const [logoHash, setLogoHash] = useState(""); // optional

  // Placeholder for organization details if needed

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

	  // Call your contract's registerOrganization method here
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

      // Reset form if needed
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
          {/* Organization Type and Email Address on same line */}
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
          {/* Address Latitude and Longitude on same line */}
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
                    setLogoHash(file.name); // TEMP: storing filename instead of IPFS hash
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
