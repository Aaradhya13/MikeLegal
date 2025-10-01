import { List, Tag, Button, Space, Typography, Empty, Modal } from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../store/taskSlice'

const { Text } = Typography
const { confirm } = Modal

const categoryColors = {
  success: 'green',
  warning: 'orange', 
  error: 'red',
  default: 'blue'
}

const categoryLabels = {
  success: 'Success',
  warning: 'Warning',
  error: 'Issue',
  default: 'Info'
}

const TaskList = ({ selectedDate, onEditTask }) => {
  const { tasks } = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const dayTasks = tasks.filter(task => task.date === selectedDate)

  const handleDelete = (task) => {
    confirm({
      title: 'Delete Task',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete "${task.title}"?`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        dispatch(deleteTask(task.id))
      }
    })
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
              title="Edit task"
            />,
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(task)}
              title="Delete task"
            />
          ]}
        >
          <List.Item.Meta
            title={
              <Space>
                <Text strong>{task.title}</Text>
                <Tag color={categoryColors[task.category]}>
                  {categoryLabels[task.category]}
                </Tag>
              </Space>
            }
            description={task.description || 'No description'}
          />
        </List.Item>
      )}
    />
  )
}

export default TaskList