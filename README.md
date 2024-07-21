<h1 align="center" id="title">React.js frontend Project for TODO dashboard with task scheduling and drag and drop features</h1>

<p id="description"> This React.js frontend project presents a dynamic TODO dashboard with sophisticated task management features. The dashboard displays tasks scheduled on a daily, weekly, or monthly basis, and allows for the addition of tasks without recurrence. The application automatically manages task scheduling based on user-selected recurrence options and provides a filter feature to easily sort and view tasks according to your preferences.
</p>

## Table of Contents

- [Features](#-features)
- [Technologies Used](#technologies-used)
- [Installation Steps](#%EF%B8%8F-installation-steps)
- [Configuration](#configuration)
  
## <h2>🧐 Features</h2>

Here are some of the project's best features:

- Task Scheduling: Users can efficiently schedule tasks with customizable recurrence options, including daily, weekly, and monthly intervals.
- Drag and Drop: The intuitive drag-and-drop interface allows users to reorder tasks, enhancing task organization and prioritization easily.
- Context API: Utilizes React's Context API for user state management.
- Incorporated search and filter option

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repository:</p>

```
git clone https://github.com/imarunsankarks/todo-fe.git
```

<p>2. Navigate to the project directory:</p>

```
cd todo-fe
```

<p>3. Install the dependencies:</p>

```
npm install
```

<p>4. Start the project:</p>

```
npm start
```

## Technologies Used

- React.js: react (^18.3.1), react-dom (^18.3.1)
- Routing: react-router-dom (^6.25.1)
- Drag and Drop: react-dnd (^16.0.1), react-dnd-html5-backend (^16.0.1)
- UI & Styling: bootstrap (^5.3.3), react-bootstrap (^2.10.4), react-datepicker (^7.3.0)
- Icons: @fortawesome/react-fontawesome (^0.2.2), @fortawesome/free-solid-svg-icons (^6.6.0)
- HTTP Requests: axios (^1.7.2)
- Date Handling: date-fns (^3.6.0)
- Notifications: react-hot-toast (^2.4.1)

## Configuration
This project uses environment variables for configuration. Create a .env file in the root directory and add your configurations:
```
REACT_APP_BE_URL=your backend url
```



