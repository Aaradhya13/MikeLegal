import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    selectedDate: dayjs().format('YYYY-MM-DD')
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        ...action.payload
      })
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    }
  }
})

export const { addTask, updateTask, deleteTask, setSelectedDate } = taskSlice.actions
export default taskSlice.reducer