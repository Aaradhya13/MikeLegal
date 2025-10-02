import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const loadTasksFromStorage = () => {
  const tasks = localStorage.getItem('tasks')
  return tasks ? JSON.parse(tasks) : []
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: loadTasksFromStorage(),
    selectedDate: dayjs().format('YYYY-MM-DD')
  },
  reducers: {
    // Add new task
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(), 
        ...action.payload
      }
      state.tasks.push(newTask)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
      localStorage.setItem('tasks', JSON.stringify(state.tasks))
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    }
  }
})

export const { addTask, updateTask, deleteTask, setSelectedDate } = taskSlice.actions
export default taskSlice.reducer