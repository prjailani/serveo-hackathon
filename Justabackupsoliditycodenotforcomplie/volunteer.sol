// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VolunteerRegistration {
    struct DateTimeAvailability {
        string date;
        string time;
    }

    struct Volunteer {
        string displayName;
        string skills;
        string profileBio;
        string profilePictureHash;
        DateTimeAvailability[] availabilities;
    }

    struct Event {
        string title;
        string skillsRequired;
        string coverPictureHash;
        string description;
        string category;
        string volunteeringType;
        int256 locationLongitude;
        int256 locationLatitude;
        string startDateTime;
        string endDateTime;
        string timezone;
        uint256 ageRequirement;
        uint256 numberOfVolunteersNeeded;
        uint256 reputationPoints;
        bool certificateAvailable;
        bool preLearningModule;
        bool allowSquadParticipation;
        string preLearningVideosHash;
        string preLearningMaterialsHash;
    }

    mapping(address => Volunteer) private volunteers;
    mapping(address => bool) public isRegistered; 

    mapping(address => Event[]) private organizationEvents;

    event VolunteerRegistered(address indexed volunteer);
    event EventCreated(address indexed organization, uint256 eventId);

    function registerVolunteer(
        string memory _displayName,
        string memory _skills,
        string memory _profileBio,
        string memory _profilePictureHash,
        string[] memory _dates,
        string[] memory _times
    ) public {
        require(_dates.length == _times.length, "Dates and times must match");

        Volunteer storage v = volunteers[msg.sender];
        v.displayName = _displayName;
        v.skills = _skills;
        v.profileBio = _profileBio;
        v.profilePictureHash = _profilePictureHash;

        delete v.availabilities;

        for (uint256 i = 0; i < _dates.length; i++) {
            v.availabilities.push(DateTimeAvailability(_dates[i], _times[i]));
        }

        isRegistered[msg.sender] = true;
        emit VolunteerRegistered(msg.sender);
    }

    function getVolunteer(address _volunteer) public view returns (
        string memory displayName,
        string memory skills,
        string memory profileBio,
        string memory profilePictureHash,
        string[] memory dates,
        string[] memory times
    ) {
        require(isRegistered[_volunteer], "Volunteer not registered");

        Volunteer storage v = volunteers[_volunteer];
        uint256 length = v.availabilities.length;
        dates = new string[](length);
        times = new string[](length);

        for (uint256 i = 0; i < length; i++) {
            dates[i] = v.availabilities[i].date;
            times[i] = v.availabilities[i].time;
        }

        return (v.displayName, v.skills, v.profileBio, v.profilePictureHash, dates, times);
    }

    // ✅ Solution: Pass Event struct as input
    function createEvent(Event memory _eventData) public {
        organizationEvents[msg.sender].push(_eventData);
        emit EventCreated(msg.sender, organizationEvents[msg.sender].length - 1);
    }

    function getOrganizationEvents(address _organization) public view returns (Event[] memory) {
        return organizationEvents[_organization];
    }
}
