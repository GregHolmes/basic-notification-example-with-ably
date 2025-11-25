# Friend Request Notification Demo

A real-time notification system demo built with React, Tailwind CSS, and Ably Pub/Sub.

## Features

- Real-time friend request notifications using Ably channels
- Beautiful Tailwind CSS styled notifications
- Auto-dismissing notifications after 5 seconds
- Connection status indicator
- Simulate friend requests from demo users

## Setup

1. Install dependencies:
```bash
npm install
```

2. Get an Ably API key:
   - Sign up for a free account at [https://ably.com/](https://ably.com/)
   - Create a new app and copy your API key

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Ably API key to `.env`:
```
VITE_ABLY_API_KEY=your_ably_api_key_here
```

## Run the App

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## How It Works

- The app subscribes to an Ably channel named `friend-requests:user-1`
- When you click a demo user button, it publishes a message to that channel
- The subscriber receives the message and displays a notification in the top-right corner
- Notifications automatically dismiss after 5 seconds or can be manually closed

## Technology Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Ably** - Real-time pub/sub messaging

## Project Structure

```
src/
├── components/
│   ├── Notification.jsx          # Individual notification component
│   └── NotificationContainer.jsx # Container for all notifications
├── services/
│   └── ably.js                    # Ably client initialization and pub/sub functions
├── App.jsx                        # Main application component
└── index.css                      # Tailwind directives
```

## Testing with Multiple Users

To simulate multiple users:
1. Open the app in multiple browser windows
2. In the browser console, you can change the user ID:
```javascript
// This would require modifying the app to expose a way to change users
```

Or modify the code to add a user switcher in the UI.
