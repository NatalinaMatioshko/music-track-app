# Music Track Manager

A React application for managing music tracks with features for creating, editing, deleting, and playing audio tracks.

## Features

- **Track Management**: Create, edit, and delete music tracks with metadata
- **File Upload**: Upload audio files and play them in the browser
- **Filtering & Sorting**: Search, filter, and sort tracks by various properties
- **Pagination**: Navigate through pages of track results
- **Bulk Operations**: Select and delete multiple tracks at once
- **Responsive Design**: Works on desktop and mobile devices

## Installation

### Prerequisites

- Node.js version v20.13.1 or higher
- Backend server running at http://localhost:8000 (provided separately)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/NatalinaMatioshko/music-track-app
cd music-track-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173.

## Project Structure

```
src/
├── api/           # API client functions
├── assets/        # Static assets like images
├── components/    # Reusable UI components
│   ├── AudioPlayer/
│   ├── ConfirmDialog/
│   ├── LoadingSpinner/
│   ├── Modal/
│   ├── Toast/
│   ├── TrackForm/
│   ├── TrackItem/
│   └── TrackList/
├── pages/         # Page components
│   └── TracksPage.jsx
├── utils/         # Utility functions
│   └── debounce.js
├── App.css        # Global styles
├── App.jsx        # Main application component
└── index.js       # Application entry point
```

## Usage

1. **View Tracks**: Browse through the list of tracks with pagination
2. **Create Track**: Click "Add Track" to create a new track with metadata
3. **Edit Track**: Click "Edit" on any track to modify its details
4. **Delete Track**: Click "Delete" to remove a track
5. **Upload Audio**: Upload an audio file to an existing track
6. **Play Audio**: Play uploaded audio files directly in the browser
7. **Search & Filter**: Use the search bar and filter options to find tracks
8. **Bulk Delete**: Click "Select Tracks" to enter selection mode, then delete multiple tracks at once

## Available Data Attributes for Testing

All key interactive elements have appropriate data-testid attributes as required by the project specifications.

## Extra Features Implemented

1. **Optimistic UI Updates**: Changes are reflected in the UI before server confirmation for a smoother experience
2. **Toast Notifications**: Visual feedback for user actions
3. **Bulk Delete**: Select and delete multiple tracks at once
4. **Extended Validation**: Form validation with visual feedback
5. **Responsive Design**: Works on all screen sizes

## License

This project is for educational purposes only.
