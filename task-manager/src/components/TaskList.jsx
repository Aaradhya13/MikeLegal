import { List, Tag, Button, Space, Typography, Empty } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../store/taskSlice'

const { Text } = Typography

const categoryColors = {
  success: 'green',
  warning: 'orange', 
  error: 'red',
  default: 'blue'
}

const TaskList = ({ selectedDate, onEditTask }) => {
  const { tasks } = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const dayTasks = tasks.filter(task => task.date === selectedDate)

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId))
  }

  if (!selectedDate) {
    return <Empty description="Select a date to view tasks" />
  }

  if (dayTasks.length === 0) {
    return <Empty description="No tasks for this date" />
  }

  return (
    <List
      dataSource={dayTasks}
      renderItem={task => (
        <List.Item
          actions={[
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => onEditTask(task)}
            />,
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(task.id)}
            />
          ]}
        >
          <List.Item.Meta
            title={
              <Space>
                <Text strong>{task.title}</Text>
                <Tag color={categoryColors[task.category]}>
                  {task.category}
                </Tag>
              </Space>
            }
            description={task.description}
          />
        </List.Item>
      )}
    />
  )
}

export default TaskList