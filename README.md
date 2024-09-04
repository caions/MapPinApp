# MapPinApp

MapPinApp is a React application that uses Leaflet to display and interact with pins on a map. The app allows users to:

- Add new pins by clicking on the map.
- View pin information in a sidebar.
- Delete pins.

It also includes integration with a mock backend using `json-server` to simulate API calls.

## Requirements

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/caions/MapPinApp.git
   ```

   ```bash
   cd mappinapp
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Application

1. Run the development server:
   ```bash
   npm run dev
   ```
2. Run the mock backend server:
   ```bash
   npm run json-server
   ```

The application will be available at [http://localhost:5173/](http://localhost:5173/).

## Scripts

- `npm run dev`: Starts the development server with Vite.
- `npm run build`: Compiles TypeScript code and builds the project for production.
- `npm run lint`: Runs code analysis with ESLint.
- `npm run preview`: Starts a preview server to view the production build.
- `npm run json-server`: Starts `json-server` to simulate the API (on port 5000).

## Project Structure

- `src/`: Contains the application source code.
- `api.ts`: Functions for interacting with the mock API.
- `components/`: React components, such as `Map` and `Sidebar`.
- `types/`: TypeScript types used in the project.
- `mock/`: Contains the mock database for `json-server`.

## Mock Backend Setup

The project includes a mock database for `json-server`. To start the `json-server`:
npm run json-server

This will start a server on port 5000 that provides endpoints to fetch, add, and delete pins.

## Responsiveness

The application is designed to be responsive, with a primary focus on desktop resolutions. The map and sidebar adjust based on screen size.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Leaflet**: Mapping library for displaying and interacting with the map.
- **Bootstrap 5**: CSS framework for styling and responsive components.
- **Vite**: Fast build tool for development and production.
- **json-server**: API simulation for development.
