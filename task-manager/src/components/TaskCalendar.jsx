import { Calendar, Badge } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedDate } from '../store/taskSlice'
import dayjs from 'dayjs'

const TaskCalendar = ({ onDateSelect }) => {
  const { tasks, selectedDate } = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const getTasksForDate = (date) => {//finds all tasks for a specific date so I can display them as colored badges
    const dateStr = date.format('YYYY-MM-DD')
    return tasks.filter(task => task.date === dateStr)
  }

  const getBadgeStatus = (category) => {
    // Map categories to badge status colors
    const statusMap = {
      success: 'success',  // green
      warning: 'warning',  // yellow
      issue: 'error',      // red
      info: 'processing'   // blue
    }
    return statusMap[category] || 'default'
  }

  const cellRender = (current, info) => {//lets customize each day in the calendar, so I can show task badges on the right dates
    if (info.type !== 'date') return info.originNode
    const dayTasks = getTasksForDate(current)
    return (
      <div>
        {dayTasks.map(task => (
          <Badge 
            key={task.id} 
            status={getBadgeStatus(task.category)} 
            text={task.title.length > 8 ? task.title.substring(0, 8) + '...' : task.title}
            style={{ fontSize: '12px', display: 'block' }}
          />
        ))}
      </div>
    )
  }

  const onSelect = (date) => {
    const dateStr = date.format('YYYY-MM-DD')
    dispatch(setSelectedDate(dateStr))
    onDateSelect(dateStr)
  }

  return (
    <Calendar 
      cellRender={cellRender}
      onSelect={onSelect}
      value={dayjs(selectedDate)}
      fullscreen={false}
    />
  )
}

export default TaskCalendar