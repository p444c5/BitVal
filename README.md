# Valentine Gift Exchange Application

This project is a Valentine gift exchange application that allows participants to exchange gifts in a fun and organized manner. The application consists of a client-side built with React and a server-side built with Node.js and TypeScript.

## Project Structure

The project is organized into two main folders: `client` and `server`.

```
valentine-gift-exchange
├── client                # Client-side application
│   ├── public            # Public assets
│   │   └── index.html    # Main HTML file
│   ├── src               # Source files
│   │   ├── components    # React components
│   │   │   ├── ***
│   │   ├── context       # Context files
│   │   │   ├── ***
│   │   ├── hooks         # Custom hooks files
│   │   │   ├── ***
│   │   ├── layouts       # App layouts
│   │   │   ├── App.jsx   # Main application component
│   │   │   ├── ***
│   │   ├── Pages         # Pages
│   │   │   ├── ***
│   │   ├── services      # Api service files
│   │   │   ├── ***
│   │   ├── store         # Store files
│   │   │   ├── ***
│   │   ├── styles        # CSS styles
│   │   │   ├── ***
│   │   ├── types         # TS types
│   │   │   ├── ***
│   │   ├── utils         # Utility files
│   │   │   ├── ***
│   ├── package.json      # Client package configuration
│   └── tsconfig.json     # Client TypeScript configuration
├── server                # Server-side application
│   ├── src               # Source files
│   │   ├── config        # Configuration files
│   │   │   └── ***
│   │   ├── controllers   # Controller files
│   │   │   ├── ***
│   │   ├── db            # DB files
│   │   │   ├── ***
│   │   ├── controllers   # Middleware files
│   │   │   ├── ***
│   │   ├── models        # Model files
│   │   │   └── ***
│   │   ├── routes        # Route files
│   │   │   └── ***
│   │   ├── types         # TS types
│   │   │   ├── ***
│   │   ├── uploads       # Client uploads
│   │   │   ├── ***
│   │   └── server.ts     # Entry point for the server
│   ├── package.json      # Server package configuration
│   └── tsconfig.json     # Server TypeScript configuration
└── README.md             # Project documentation
```

## Getting Started

To get started with the Valentine gift exchange application, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd valentine-gift-exchange
   ```

2. Install dependencies for the client:

   ```
   cd client
   npm install
   ```

3. Install dependencies for the server:

   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:

   ```
   cd server
   npm start
   ```

2. In a new terminal, start the client:

   ```
   cd client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

- Participants can view available gifts.
- Participants are paired for gift exchange.
- Payment processing between paired participants.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

