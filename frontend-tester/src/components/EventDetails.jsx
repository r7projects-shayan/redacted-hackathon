import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'; // Import icons from react-icons

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSpeakers, setShowSpeakers] = useState(false);
  const [showAdminRights, setShowAdminRights] = useState(false);

  useEffect(() => {
    // Hardcoded data for event with id: 1 (Tech Conference)
    if (id === '1') {
      const eventData = {
        coverImage: 'https://via.placeholder.com/800x400', // Placeholder image URL
        title: 'Tech Conference 2024',
        date: 'January 15, 2024',
        time: '10:00 AM - 4:00 PM',
        location: 'New York Convention Center',
        isOnline: false,
        host: { name: 'John Doe' },
        participants: [
          { name: 'Alice Johnson' },
          { name: 'Bob Smith' },
          { name: 'Charlie Davis' },
        ],
        speakers: [
          { name: 'Dr. Emily Watson' },
          { name: 'Prof. Michael Lee' },
        ],
        description:
          'The Tech Conference 2024 brings together the leading minds in technology and innovation to discuss the latest trends in AI, cloud computing, and cybersecurity.',
        images: [
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
        ],
      };
      setEvent(eventData);
    }
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details p-6">
      {/* Event cover picture */}
      <div className="event-cover mt-6">
        <img
          src={event.coverImage}
          alt={`${event.title} Cover`}
          className="w-full h-64 object-cover rounded"
        />
      </div>

      {/* Event Name */}
      <h1 className="text-4xl font-bold mt-4">{event.title}</h1>

      {/* Event Time, Date, Location */}
      <div className="event-info mt-4">
        <p className="text-xl">📅 {event.date}</p>
        <p className="text-xl">🕒 {event.time}</p>
        <p className="text-xl">📍 {event.location} ({event.isOnline ? 'Online' : 'Offline'})</p>
      </div>

      {/* Host */}
      <div className="mt-4">
        <h3 className="text-2xl font-bold">Host: {event.host.name}</h3>
      </div>

      {/* Participants - Toggleable */}
      <div className="mt-4">
        <h3
          className={`flex items-center text-2xl font-bold cursor-pointer transition duration-300 hover:text-blue-600`}
          onClick={() => setShowParticipants(!showParticipants)}
        >
          {showParticipants ? <AiOutlineDown className="mr-2" /> : <AiOutlineRight className="mr-2" />}
          Participants
        </h3>
        {showParticipants && (
          <ul className="pl-4 list-disc transition duration-300">
            {event.participants.map((participant, index) => (
              <li key={index} className="text-lg">
                {participant.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Chief Guests/Speakers - Toggleable */}
      <div className="mt-4">
        <h3
          className={`flex items-center text-2xl font-bold cursor-pointer transition duration-300 hover:text-blue-600`}
          onClick={() => setShowSpeakers(!showSpeakers)}
        >
          {showSpeakers ? <AiOutlineDown className="mr-2" /> : <AiOutlineRight className="mr-2" />}
          Chief Guests/Speakers
        </h3>
        {showSpeakers && (
          <ul className="pl-4 list-disc transition duration-300">
            {event.speakers.map((speaker, index) => (
              <li key={index} className="text-lg">
                {speaker.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Event Description */}
      <div className="mt-6 flex">
        <div className="w-3/4">
          <h3 className="text-2xl font-bold">Event Description</h3>
          <p className="mt-2 text-lg">{event.description}</p>
        </div>

        {/* Event Images on Right */}
        <div className="w-1/4 ml-6">
          <h3 className="text-2xl font-bold">Images</h3>
          <div className="grid grid-cols-1 gap-4 mt-2">
            {event.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Event Image ${index + 1}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Apply/Registration Buttons */}
      <div className="mt-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700">
          Apply
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
          Register
        </button>
      </div>

      {/* Admin Rights - Toggleable */}
      <div className="mt-6">
        <h3
          className={`flex items-center text-2xl font-semibold cursor-pointer transition duration-300 hover:text-blue-600`}
          onClick={() => setShowAdminRights(!showAdminRights)}
        >
          {showAdminRights ? <AiOutlineDown className="mr-2" /> : <AiOutlineRight className="mr-2" />}
          Admin Rights
        </h3>
        {showAdminRights && (
          <div className="bg-dark p-4 mt-2 rounded">
            <h4 className="text-xl font-semibold">Manage Event</h4>
            <p className="mt-2">You have the rights to:</p>
            <ul className="list-disc pl-4">
              <li>Edit Event Date and Time</li>
              <li>Change Participants</li>
              <li>Edit Chief Guests/Speakers</li>
              <li>Update Event Description</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
