import { useEffect, useState } from "react";
import { Button } from "/src/components/ui/button";
import { Share } from "/src/components/Share";

export function Cards() {
  const [events, setEvents] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const data = {
    events: [
      {
        name: "Sample Event - Test",
        date: "07-28-2024",
        time: "8:00pm",
        attendees: "15",
        imageUrl:
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      },
      {
        name: "Sample Event - Test",
        date: "07-28-2024",
        time: "8:00pm",
        attendees: "15",
        imageUrl:
          "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      },

    ],
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // const response = await fetch('/api/events'); // Replace with your API endpoint
      // const data = await response.json();
      setEvents(data.events); // Assuming `data.events` contains the list of events
      setHasMore(data.hasMore); // Assuming `data.hasMore` indicates if there are more events
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const loadMoreEvents = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/events?offset=${events.length}`); // Adjust query parameters as needed
      const data = await response.json();
      setEvents((prevEvents) => [...prevEvents, ...data.events]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error fetching more events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[78vh]">
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#000235] to-[#8080d7]">
        <div className="container mx-auto px-8 py-4">
          {events.length === 0 ? (
            <div className="text-center text-white mt-8">
              <p>No events available at the moment.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 mt-8">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-[#8D8DDA] to-white rounded-lg shadow-md overflow-hidden flex"
                  >
                    <img
                      src={event.imageUrl || "/placeholder.svg"}
                      alt={event.name}
                      width={200}
                      height={200}
                      className="w-48 h-48 object-cover"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold">{event.name}</h3>
                      <p className="text-sm font-semibold">
                        {event.date} - {event.time}
                      </p>
                      <p className="text-sm font-semibold">
                        <UserIcon className="w-4 h-4 inline-block mr-1" />
                        {event.attendees} Attending
                      </p>
                    </div>
                    <div className="relative h-full">
                      <div className="absolute bottom-8 right-8 flex flex-row gap-2">
                        <Button
                          variant="outline"
                          className="w-28 rounded-full border border-gray-400 bg-gradient-to-t from-[#8D8DDA] to-white text-black hover:from-[#8080d7] hover:to-white shadow-md"
                        >
                          Edit
                        </Button>
                        <Button
                          className="w-28 rounded-full border border-gray-400 bg-gradient-to-t from-[#8D8DDA] to-white text-black hover:from-[#8080d7] hover:to-white shadow-md"
                          onClick={() => setShowShareDialog(true)}
                        >
                          Invite
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button onClick={loadMoreEvents} disabled={loading}>
                    {loading ? "Loading..." : "See More"}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      {showShareDialog && (
        <Share
          open={showShareDialog}
          onClose={() => setShowShareDialog(false)}
        />
      )}
    </div>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
