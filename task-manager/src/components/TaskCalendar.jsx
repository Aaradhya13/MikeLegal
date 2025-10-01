import { Calendar, Badge } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedDate } from '../store/taskSlice'
import dayjs from 'dayjs'

const TaskCalendar = ({ onDateSelect }) => {
  const { tasks, selectedDate } = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const getTasksForDate = (date) => {
    const dateStr = date.format('YYYY-MM-DD')
    return tasks.filter(task => task.date === dateStr)
  }

  const cellRender = (current, info) => {
    if (info.type !== 'date') return info.originNode
    const dayTasks = getTasksForDate(current)
    return (
      <div>
        {dayTasks.map(task => (
          <Badge 
            key={task.id} 
            status={task.category} 
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