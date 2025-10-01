import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const loadTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem('taskManager_tasks')
    return savedTasks ? JSON.parse(savedTasks) : getSampleTasks()
  } catch (error) {
    return getSampleTasks()
  }
}

const getSampleTasks = () => [
  {
    id: 1,
    title: 'Team Meeting',
    description: 'Weekly sync with development team',
    date: dayjs().format('YYYY-MM-DD'),
    category: 'default'
  },
  {
    id: 2,
    title: 'Code Review',
    description: 'Review pull requests from yesterday',
    date: dayjs().format('YYYY-MM-DD'),
    category: 'success'
  },
  {
    id: 3,
    title: 'Fix Bug #123',
    description: 'Critical bug in user authentication',
    date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    category: 'error'
  },
  {
    id: 4,
    title: 'Update Documentation',
    description: 'Update API documentation for new endpoints',
    date: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    category: 'warning'
  }
]

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadTasksFromStorage(),
    selectedDate: dayjs().format('YYYY-MM-DD')
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload
      }
      state.tasks.push(newTask)
      localStorage.setItem('taskManager_tasks', JSON.stringify(state.tasks))
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
        localStorage.setItem('taskManager_tasks', JSON.stringify(state.tasks))
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      localStorage.setItem('taskManager_tasks', JSON.stringify(state.tasks))
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    }
  }
})

export const { addTask, updateTask, deleteTask, setSelectedDate } = taskSlice.actions
export default taskSlice.reducer