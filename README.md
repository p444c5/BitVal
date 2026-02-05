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

### How the Algorithm Works (Provably Fair)

BitVal replaces the traditional 1:1 Secret Santa model with a **Weighted Random Distribution Pool**. The logic is open-source specifically to ensure transparency. The process flows as follows:

**1. The Circular Pairing (The "Chain")**
The system creates a **Single Directed Hamiltonian Path** (A -> B -> C -> A). 
*   **Mechanism:** Before linking the chain, a **Fisher-Yates Shuffle** (using `crypto.randomInt` RNG) is performed on the participant list. This ensures the order is completely random before the circular assignments are made.
*   **Guarantee:** No participant is paired with themselves, and the chain never breaks. Every participant gives to exactly one person and receives from exactly one person.


**2. The Volatility Curve (The "Lottery")**
The gift pool is **NOT** distributed equally. We use a volatility curve (Default: `VOLATILITY = 3`) to create a distribution spread similar to a lottery.

*The Probability Formula:*
```math
Weight = (RandomSecureFloat) ^ Volatility
```
The Probability Formula:
Weight=(RandomSecureFloat)^Volatility

 
Entropy: Uses crypto.randomInt for  randomness.
The Math: By raising a random float (0-1) to the power of 3, the weights skew heavily.
The Result: Most participants receive a standard allocation, while a small percentage receive a significantly larger "Jackpot" allocation.

**3. Verification & Transparency / Audit Trail**
Every time the allocation runs, a tamper-proof Distribution Plan is saved to the database containing:
Batch ID: A unique UUID for the run.
Execution Timestamp: Exact server time of the RNG event.
Volatility Setting: The parameter used for that specific run.
This allows the community to verify that the code executed matches the distributed result. The log will also be uploaded on active thread :)

## Features

- Participants can view prize pool.
- Participants are paired for gift exchange.
- participants can view other participants details and allocations.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.

## License
Nil