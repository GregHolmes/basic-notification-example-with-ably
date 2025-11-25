import Ably from 'ably';

// Initialize Ably client
// For demo purposes, you'll need to replace this with your Ably API key
// Get a free API key from https://ably.com/
const ABLY_API_KEY = import.meta.env.VITE_ABLY_API_KEY || 'YOUR_ABLY_API_KEY';

let ablyClient = null;

export const initializeAbly = () => {
  if (!ablyClient) {
    ablyClient = new Ably.Realtime({ key: ABLY_API_KEY });
  }
  return ablyClient;
};

export const getAblyClient = () => {
  if (!ablyClient) {
    return initializeAbly();
  }
  return ablyClient;
};

// Subscribe to friend request notifications
export const subscribeToFriendRequests = (userId, callback) => {
  const client = getAblyClient();
  const channel = client.channels.get(`friend-requests:${userId}`);

  channel.subscribe('new-request', (message) => {
    callback(message.data);
  });

  return channel;
};

// Publish a friend request notification
export const sendFriendRequest = (toUserId, fromUserData) => {
  const client = getAblyClient();
  const channel = client.channels.get(`friend-requests:${toUserId}`);

  channel.publish('new-request', {
    from: fromUserData,
    timestamp: new Date().toISOString(),
  });
};

// Unsubscribe from a channel
export const unsubscribeFromChannel = (channel) => {
  if (channel) {
    channel.unsubscribe();
  }
};
