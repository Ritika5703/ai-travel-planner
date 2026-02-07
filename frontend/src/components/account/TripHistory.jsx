import { useEffect, useState } from "react";
import UserSidebar from "../sidebar/UserSidebar";

function TripHistory() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/my-trips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setTrips(data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserSidebar />

      <div className="flex-1 p-8">
        <h2 className="text-3xl font-semibold mb-6">My Trips</h2>

        {loading ? (
          <p>Loading...</p>
        ) : trips.length === 0 ? (
          <p className="text-gray-500">No trips found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white rounded-xl shadow-sm border p-5"
              >
                <h3 className="text-xl font-semibold">{trip.destination}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  {trip.days} days • {trip.travelWith}
                </p>

                <button
                  onClick={() => setSelectedTrip(trip)}
                  className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  View Itinerary
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedTrip && (
        <ItineraryModal
          trip={selectedTrip}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </div>
  );
}
function ItineraryModal({ trip, onClose }) {
  const itinerary = trip.result?.itinerary || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h3 className="text-xl font-semibold">
            {trip.destination} Itinerary
          </h3>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          {itinerary.map((day) => (
            <div key={day.day} className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-1">
                Day {day.day}: {day.title}
              </h4>

              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                {day.plan.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              {day.location && (
                <p className="text-xs text-gray-500 mt-2">📍 {day.location}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripHistory;
