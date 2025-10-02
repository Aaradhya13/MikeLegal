# Daily Task Manager

A React application for managing daily tasks with a calendar interface and data visualization.

👉 **Live Demo**: [https://mike-legal-theta.vercel.app/](https://mike-legal-theta.vercel.app/)

---

## Assignment Overview

This project is built as per the requirements to create a task management application using React and Ant Design. The app allows users to add, view, and categorize tasks on a calendar interface and visualize them through charts.

---

## Features Implemented

### 1. Calendar View
- Uses Ant Design's `<Calendar />` component  
- Allows clicking on any date to view or add tasks  
- Shows task indicators on dates with existing tasks  

### 2. Add/Edit Task
- Modal form with Formik + Yup validation  
- Fields: Title (required), Description (optional), Date (auto-filled), Category dropdown  
- Categories: `success`, `warning`, `issue`, `info`  
- Form validation using Yup  
- Tasks stored in Redux Toolkit state  

### 3. Task Listing
- Displays tasks for the selected date  
- Each task has Edit and Delete options  
- Categories displayed using Ant Design Tags with color coding  
- Today's tasks and upcoming tasks sections  

### 4. Chart Visualization
- Bar and Pie charts showing task counts per category  
- Dropdown filters to filter by category  
- Apply and Reset buttons for filtering  
- Charts update based on selected filters  

---

## Tech Stack Used

- **ReactJS** – Frontend framework  
- **Ant Design** – UI component library  
- **Redux Toolkit** – State management  
- **Formik + Yup** – Form handling and validation  
- **Recharts** – Chart visualization  
- **Day.js** – Date formatting  
- **Vite** – Build tool  

---

## Installation and Setup

1. **Clone the repository**:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Adding Tasks**: Click on any date in the calendar to add a new task
2. **Viewing Tasks**: Tasks for the selected date appear in the sidebar
3. **Editing Tasks**: Click the edit icon next to any task to modify it
4. **Deleting Tasks**: Click the delete icon to remove a task
5. **Charts**: View task distribution by category in bar or pie chart format
6. **Filtering**: Use the dropdown filters and Apply/Reset buttons to filter chart data

## State Management

- All data is stored in Redux Toolkit state
- Tasks are persisted in localStorage for data persistence
- No backend required as per assignment requirements

## Categories

- **Success** (Green) - Completed or successful tasks
- **Warning** (Orange) - Tasks requiring attention
- **Issue** (Red) - Problem or urgent tasks
- **Info** (Blue) - Informational or general tasks

## Project Structure

```
src/
├── components/
│   ├── TaskCalendar.jsx
│   ├── TaskForm.jsx
│   ├── TaskList.jsx
│   └── TaskCharts.jsx
├── store/
│   ├── index.js
│   └── taskSlice.js
├── App.jsx
├── App.css
└── main.jsx
```

## Assignment Requirements Met

✅ Calendar View with Ant Design Calendar component  
✅ Add/Edit Task modal with Formik + Yup validation  
✅ Task listing with Edit/Delete options  
✅ Color-coded category tags  
✅ Bar and Pie chart visualization  
✅ Category filtering with Apply/Reset buttons  
✅ Redux Toolkit state management  
✅ All required technologies implemented  
✅ No backend dependency - client-side storage only