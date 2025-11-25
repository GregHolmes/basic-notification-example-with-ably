import { useState, useEffect } from 'react';
import NotificationContainer from './components/NotificationContainer';
import { initializeAbly, subscribeToFriendRequests, sendFriendRequest } from './services/ably';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('user-1');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize Ably
    const client = initializeAbly();

    client.connection.on('connected', () => {
      setIsConnected(true);
    });

    client.connection.on('disconnected', () => {
      setIsConnected(false);
    });

    // Subscribe to friend requests for current user
    const channel = subscribeToFriendRequests(currentUserId, (data) => {
      const newNotification = {
        id: Date.now(),
        ...data,
      };
      setNotifications((prev) => [...prev, newNotification]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [currentUserId]);

  const handleRemoveNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const simulateFriendRequest = (fromUserName) => {
    sendFriendRequest(currentUserId, {
      name: fromUserName,
      userId: `user-${Math.random().toString(36).substr(2, 9)}`,
    });
  };

  const demoUsers = ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <NotificationContainer
        notifications={notifications}
        onRemoveNotification={handleRemoveNotification}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Friend Request Notification Demo
            </h1>
            <p className="text-gray-600 mb-6">
              Using Ably Pub/Sub for real-time notifications
            </p>

            <div className="mb-8">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${
                      isConnected ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {isConnected ? 'Connected to Ably' : 'Disconnected'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Current User
              </h2>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  {currentUserId.charAt(currentUserId.length - 1)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{currentUserId}</p>
                  <p className="text-sm text-gray-500">
                    Listening on channel: friend-requests:{currentUserId}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Simulate Friend Requests
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Click a button to simulate receiving a friend request from that user
              </p>
              <div className="grid grid-cols-2 gap-3">
                {demoUsers.map((user) => (
                  <button
                    key={user}
                    onClick={() => simulateFriendRequest(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    {user}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> To use this demo, you need to add your Ably API key.
                Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file with{' '}
                <code className="bg-yellow-100 px-1 rounded">VITE_ABLY_API_KEY=your_key_here</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
