// src/components/Events.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Events() {
  const navigate = useNavigate();

  /*  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [visibleUpcomingEvents, setVisibleUpcomingEvents] = useState(3);
  const [visibleOngoingEvents, setVisibleOngoingEvents] = useState(3);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseUpcoming = await fetch('https://api.example.com/upcoming-events');
        const upcomingData = await responseUpcoming.json();
        setUpcomingEvents(upcomingData);

        const responseOngoing = await fetch('https://api.example.com/ongoing-events');
        const ongoingData = await responseOngoing.json();
        setOngoingEvents(ongoingData);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEvents();
  }, []);

*/
  // Example of event data (could be dynamically fetched in real scenarios)
  const upcomingEvents = [
    { id: 1, name: 'Tech Conference 2024', time: '10:00 AM - 4:00 PM', status: 'In-Person', image: 'https://via.placeholder.com/300' },
    { id: 2, name: 'AI Summit', time: '9:00 AM - 5:00 PM', status: 'Online', image: 'https://via.placeholder.com/300' },
    { id: 3, name: 'Startup Expo', time: '11:00 AM - 3:00 PM', status: 'In-Person', image: 'https://via.placeholder.com/300' },
    { id: 4, name: 'Web Development Workshop', time: '1:00 PM - 4:00 PM', status: 'Online', image: 'https://via.placeholder.com/300' },
    { id: 5, name: 'Data Science Bootcamp', time: '10:00 AM - 6:00 PM', status: 'In-Person', image: 'https://via.placeholder.com/300' },
    { id: 6, name: 'Blockchain Revolution', time: '2:00 PM - 5:00 PM', status: 'Online', image: 'https://via.placeholder.com/300' },
    { id: 7, name: 'Cybersecurity Forum', time: '10:00 AM - 4:00 PM', status: 'In-Person', image: 'https://via.placeholder.com/300' },
    { id: 8, name: 'Mobile App Development', time: '12:00 PM - 3:00 PM', status: 'Online', image: 'https://via.placeholder.com/300' },
    { id: 9, name: 'UX/UI Design Workshop', time: '10:00 AM - 4:00 PM', status: 'In-Person', image: 'https://via.placeholder.com/300' },
  ];

  const ongoingEvents = [
    { id: 10, name: 'Digital Marketing Webinar', time: '3:00 PM - 5:00 PM', status: 'Ongoing', image: 'https://via.placeholder.com/300' },
    { id: 11, name: 'Python Programming Workshop', time: '2:00 PM - 4:00 PM', status: 'Ongoing', image: 'https://via.placeholder.com/300' },
    { id: 12, name: 'Design Sprint for Startups', time: '1:00 PM - 3:00 PM', status: 'Ongoing', image: 'https://via.placeholder.com/300' },
    { id: 7, name: 'Cybersecurity Forum', time: '10:00 AM - 4:00 PM', status: 'In-Person', image: 'https://via.placeholder.com/300' },
    { id: 8, name: 'Mobile App Development', time: '12:00 PM - 3:00 PM', status: 'Online', image: 'https://via.placeholder.com/300' },
    { id: 9, name: 'UX/UI Design Workshop', time: '10:00 AM - 4:00 PM', status: 'In-Person', image: 'https://via.placeholder.com/300' },
  
    // Add more ongoing events as needed
  ];

  const [visibleUpcomingEvents, setVisibleUpcomingEvents] = useState(3); // Initially show 3 upcoming events
  const [visibleOngoingEvents, setVisibleOngoingEvents] = useState(3); // Initially show 3 ongoing events

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const handleSeeMoreUpcoming = () => {
    setVisibleUpcomingEvents((prev) => prev + 3); // Show 3 more upcoming events
  };

  const handleSeeLessUpcoming = () => {
    setVisibleUpcomingEvents(3); // Reset to show 3 upcoming events
  };

  const handleSeeMoreOngoing = () => {
    setVisibleOngoingEvents((prev) => prev + 3); // Show 3 more ongoing events
  };

  const handleSeeLessOngoing = () => {
    setVisibleOngoingEvents(3); // Reset to show 3 ongoing events
  };

  return (
    <div className="events-container p-6">
      <h1 className="text-3xl font-bold text-center">Events</h1>

      {/* Upcoming Events Section */}
      <h2 className="text-2xl font-semibold text-center mt-2">Upcoming Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {upcomingEvents.slice(0, visibleUpcomingEvents).map((event) => (
          <div
            key={event.id}
            className="relative p-4 border border-gray-300 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            style={{
              backgroundImage: `url(${event.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '200px',
              color: 'white',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-md">{event.time}</p>
              <p className="text-md">{event.status}</p>
              <button
                className="mt-2 px-4 py-2 border border-blue-500 text-white-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                onClick={() => handleEventClick(event.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See More / See Less button for Upcoming Events */}
      {visibleUpcomingEvents < upcomingEvents.length ? (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2  text-green-500 font-semibold rounded hover:bg-green-500 hover:text-white transition duration-300"
            onClick={handleSeeMoreUpcoming}
          >
            See More
          </button>
        </div>
      ) : (
        visibleUpcomingEvents > 3 && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300"
              onClick={handleSeeLessUpcoming}
            >
              See Less
            </button>
          </div>
        )
      )}

      {/* Ongoing Events Section */}
      <h2 className="text-2xl font-semibold text-center mt-10">Ongoing Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {ongoingEvents.slice(0, visibleOngoingEvents).map((event) => (
          <div
            key={event.id}
            className="relative p-4 border border-gray-300 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            style={{
              backgroundImage: `url(${event.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '200px',
              color: 'white',
            }}
          >
            <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-md">{event.time}</p>
              <p className="text-md">{event.status}</p>
              <button
                className="mt-2 px-4 py-2 border border-blue-500 text-white-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                onClick={() => handleEventClick(event.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* See More / See Less button for Ongoing Events */}
      {visibleOngoingEvents < ongoingEvents.length ? (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2  text-green-500 font-semibold rounded hover:bg-green-500 hover:text-white transition duration-300"
            onClick={handleSeeMoreOngoing}
          >
            See More
          </button>
        </div>
      ) : (
        visibleOngoingEvents > 3 && (
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition duration-300"
              onClick={handleSeeLessOngoing}
            >
              See Less
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Events;
