# Attendance Management System - Frontend

This is the frontend application for the Attendance Management System built with React.js and Material-UI.

## Technology Stack

- React.js 18
- Material-UI v5
- Axios for API integration
- React Router v6
- Moment.js for date handling

## Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Git

## Project Structure

```
src/
├── apiService/     # Reusable, api service
├── assets/          # Images, icons, and other static files
├── components/      # Reusable UI components
├── config/          # Configuration files
├── hooks/          # Custom React hooks
├── pages/          # Page components
└── utils/          # Utility functions and helpers
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/your-repo/attendance-system.git
cd client
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in the root directory
```env
REACT_APP_BASE_URL="Your_server_url"
```

4. Start the development server
```bash
npm start
```

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run ESLint
npm run lint

# Fix ESLint errors
npm run lint:fix
```

## Key Features

### Authentication
- Login/Logout functionality
- Role-based access control
- Password reset flow
- Session management

### Dashboard
- Employee attendance overview
- Work hours tracking
- Performance metrics

### Attendance Management
- Check-in/Check-out
- Attendance history
- Leave management
- Report generation

## Folder Structure Details


### pages/
- `auth/` - Authentication pages
- `dashboard/` - Dashboard pages
- `attendance/` - Attendance management pages
- `mainPage/` - Main page


## Contributing

1. Fork the repository (`git fetch --all`)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.